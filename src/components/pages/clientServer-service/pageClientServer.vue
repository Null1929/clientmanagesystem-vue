<template>
  <table-style>
    <table>
      <tr>
        <td>客户</td>
        <td><input type="text" v-model="clientServer.clientName"></td>
      </tr>
      <tr>
        <td>概要</td>
        <td><input type="text" v-model="clientServer.outline"></td>
      </tr>
      <tr>
        <td>服务类型</td>
        <td><input type="text" v-model="clientServer.serviceType"></td>
      </tr>
      <tr>
        <td>创建日期</td>
        <td><input type="date" v-model="clientServer.createTimeBegan">
          -
          <input type="date" v-model="clientServer.createTimeEnd">
        </td>
      </tr>
      <tr>
        <td>状态</td>
        <td>
          <input type="text" disabled v-model="clientServer.status" placeholder="已归档">
        </td>
      </tr>
      <tr>
        <td colspan="2">
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
          <el-button @click="distribution(item)" round>分配</el-button>
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


      clientServerList: [],

      userList: []
    };
  },

  mounted() {
    this.queryClientServer();

    httpRequest.get('/userservice/user/queryAll', {
      params: {}
    }).then(response => {
      this.userList = response.data.data
    });

  },

  methods: {
    queryClientServer() {
      httpRequest.post('/clientservice/clientServer/queryClientServer', {
        serviceType: this.clientServer.serviceType,
        outline: this.clientServer.outline,
        clientName: this.clientServer.clientName,
        status: this.clientServer.status,
        startTime: this.clientServer.createTimeBegan,
        endTime: this.clientServer.createTimeEnd,
        pageNum: this.pageResult.pageNum,
        pageSize: this.pageResult.pageSize

      }).then(response => {
        if (response.data.resCode === "000000") {
          this.pageResult = response.data.data;
        }
      });
    },
    distribution(item) {
      httpRequest.post('/clientservice/clientServer/distribution', item)
          .then(response => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.queryClientServer();
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
  },
};
</script>

<style lang="scss" scoped></style>