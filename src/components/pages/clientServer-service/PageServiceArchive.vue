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
          <el-button @click="queryClientServer()">查询</el-button>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td>编号</td>
        <td>客户</td>
        <td>概要</td>
        <td>服务类型</td>
        <td>创建人</td>
        <td>创建日期</td>
        <td>状态</td>
        <td>操作</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item">
        <td>{{ item.serverId }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.outline }}</td>
        <td>{{ item.serviceType }}</td>
        <td>{{ item.creator }}</td>
        <td>{{ item.createTime }}</td>
        <td>{{ item.status }}</td>
        <td>
          <el-button @click="detail(item)">详情</el-button>
          <el-button @click="del(item.serverId)">删除</el-button>
        </td>
      </tr>
    </table>
    <template #footer>
      <table>
        <tr>
          <td>共有{{ pageResult.total }}条记录</td>
          <td>第{{ pageResult.pageNum }}/共{{ Math.ceil(pageResult.total / pageResult.pageSize) }}页</td>
          <td>
            <el-button @click="firstPage()" id="firstPage">第一页</el-button>
          </td>
          <td>
            <el-button @click="lastPage()" id="lastPage">上一页</el-button>
          </td>
          <td>
            <el-button @click="nextPage()" id="nextPage">下一页</el-button>
          </td>
          <td>
            <el-button @click="endPage()" id="endPage">最后一页</el-button>
          </td>
          <td>转到<input type="text" v-model="pageResult.forward">页
            <el-button @click="forward()">Go</el-button>
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
  name: 'ClientmanagesystemPageServiceArchive',
  components: {TableStyle},
  data() {
    return {
      clientServer: {
        serverId: null,
        serviceType: null,
        outline: null,
        clientName: null,
        status: "已归档",
        serviceRequest: null,
        creator: null,
        createTime: null,
      },

      time: {
        startTime: null,
        endTime: null
      },

      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        forward: 1,
        result: []
      },


      userList: []
    };
  },

  mounted() {
    this.queryClientServer();
  },

  methods: {
    queryClientServer() {
      httpRequest.post('/clientservice/clientServer/queryClientServer', {
        clientName: this.clientServer.clientName,
        outline: this.clientServer.outline,
        serviceType: this.clientServer.serviceType,
        status: this.clientServer.status,
        startTime: this.time.startTime,
        endTime: this.time.endTime,
        pageNum: this.pageResult.pageNum,
        pageSize: this.pageResult.pageSize
      }).then(response => {
        if (response.data.resCode === "000000") {
          this.pageResult = response.data.data;
        }
      });
    },
    detail(item) {
      this.$router.push({path: '/clientServer/ProcessingServiceArchive', query: item})
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