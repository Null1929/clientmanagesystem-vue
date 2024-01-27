<template>
  <table-style>
    <table>
      <tr>
        <td>客户:</td>
        <td>
          <el-input type="text" v-model="clientServer.clientName"/>
        </td>
        <td>概要:</td>
        <td>
          <el-input type="text" v-model="clientServer.outline"/>
        </td>
        <td>服务类型:</td>
        <td>
          <el-select style="width: 100px" v-model="clientServer.serviceType" placeholder="请选择">
            <el-option
                v-for="target in serviceTypeList"
                :key="target.item"
                :label="target.itemValue"
                :value="target.itemValue">
            </el-option>
          </el-select>
        </td>
        <td>创建日期:</td>
        <td>
          <el-date-picker
              style="width: 250px"
              v-model="dateCollection"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              unlink-panels
          >
          </el-date-picker>
        </td>
        <td>状态:</td>
        <td>
          <el-input style="width: 80px;" type="text" v-model="clientServer.status" placeholder="已归档" disabled/>
        </td>
        <td colspan="2" style="padding-left: 20px">
          <el-button @click="queryClientServer()" round>查询</el-button>
        </td>
      </tr>
    </table>
    <table style="width: auto;border-spacing: 50px 0">
      <tr>
        <td>编号</td>
        <td>客户</td>
        <td>概要</td>
        <td>服务类型</td>
        <td>创建人</td>
        <td>创建日期</td>
        <td>分配给</td>
        <td>操作</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.serverId">
        <td>{{ item.serverId }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.outline }}</td>
        <td>{{ item.serviceType }}</td>
        <td>{{ item.creator }}</td>
        <td>{{ item.createTime }}</td>
        <td>
          <el-select name="" id="" v-model="item.assignee" placeholder="请选择">
            <el-option v-for="user in userList " :key="user.id" :value="user.name">{{ user.name }}</el-option>
          </el-select>
        </td>
        <td>
          <el-button @click="distributionBtn(item)" round>分配</el-button>
          <el-button @click="del(item.serverId)" round>删除</el-button>
        </td>
      </tr>
    </table>
    <template #footer>
      <table>
        <tr>
          <td>共有{{ pageResult.total }}条记录</td>
          <td>第{{ pageResult.pageNum }}/共{{ Math.ceil(pageResult.total / pageResult.pageSize) }}页</td>
          <td>
            <el-button @click="firstPage()" id="firstPage" round>第一页</el-button>
          </td>
          <td>
            <el-button @click="lastPage()" id="lastPage" round>上一页</el-button>
          </td>
          <td>
            <el-button @click="nextPage()" id="nextPage" round>下一页</el-button>
          </td>
          <td>
            <el-button @click="endPage()" id="endPage" round>最后一页</el-button>
          </td>
          <td>转到<input type="text" style="width: 50px" v-model="pageResult.forward">页
            <el-button @click="forward()" round>Go</el-button>
          </td>
        </tr>
      </table>
    </template>
  </table-style>
</template>

<script>
import httpRequest from '@/request';
import TableStyle from "@/components/slot/tableStyle";

export default {
  name: 'ClientmanagesystemPageClientServer',
  components: {TableStyle},
  data() {
    return {
      clientServer: {
        serverId: null,
        serviceType: null,
        outline: null,
        clientName: null,
        status: '新创建',
        serviceRequest: null,
        creator: null,
        createTime: null,
        createTimeBegan: null,
        createTimeEnd: null,
      },

      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        forward: 1,
        result: []
      },

      userList: [],

      dateCollection: '',

      serviceTypeList: [],
    };
  },

  mounted() {
    this.queryClientServer();
    this.getUserNameList();
    this.getServiceType();
  },

  methods: {
    getUserNameList() {
      httpRequest.get('/userservice/user/queryAll', {
        params: {}
      }).then(response => {
        this.userList = response.data.data
      });
    },
    getServiceType() {
      httpRequest.get('/databaseservice/dataDictionary/getServiceTypeByService').then(response => {
        this.serviceTypeList = response.data.data
      })
    },
    queryClientServer() {
      if(this.dateCollection!==null) {
        if (this.dateCollection !== '' && this.dateCollection.length === 2) {
          this.time.startTime = this.dateCollection[0];
          this.time.endTime = this.dateCollection[1];
        }
      }
      httpRequest.get('/clientservice/clientServer/queryClientServer', {
        params: {
          serviceType: this.clientServer.serviceType,
          outline: this.clientServer.outline,
          clientName: this.clientServer.clientName,
          status: this.clientServer.status,
          startTime: this.clientServer.createTimeBegan,
          endTime: this.clientServer.createTimeEnd,
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize
        }
      }).then(response => {
        if (response.data.resCode === "000000") {
          this.pageResult = response.data.data;
        } else {
          alert(response.data.resDesc);
        }
      });
    },
    distributionBtn(item) {
      httpRequest.post('/clientservice/clientServer/distributionBtn', item)
          .then(response => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.queryClientServer();
            }else {
              alert(response.data.resDesc)
            }
          });
    },
    del(serverId) {
      httpRequest.get('/clientservice/clientServer/delClientServer', {
        params: {
          serverId: serverId,
        }
      }).then(response => {
        if (response.data.resCode === "000000") {
          alert(response.data.data);
          this.queryClientServer();
        } else {
          alert(response.data.resDesc);
          this.queryClientServer();
        }
      });
    },

    /*******************************************/
    /**
     * 分页方法
     */
    firstPage() {
      this.pageResult.pageNum = 1;
      this.queryClientServer();

    },
    lastPage() {
      if (this.pageResult.pageNum !== 1) {
        --this.pageResult.pageNum
        this.queryClientServer();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum !== Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        ++this.pageResult.pageNum
        this.queryClientServer();
      }
    },
    endPage() {
      this.pageResult.pageNum = Math.ceil(this.pageResult.total / this.pageResult.pageSize);
      this.queryClientServer();
    },
    forward() {
      if (this.pageResult.forward >= 1 && this.pageResult.forward <= Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        this.pageResult.pageNum = this.pageResult.forward;
        this.queryClientServer();
      } else {
        alert("页数不正确！")
        this.pageResult.forward = null;
      }
    },
    /*******************************************/
  }
};
</script>

<style lang="scss" scoped></style>