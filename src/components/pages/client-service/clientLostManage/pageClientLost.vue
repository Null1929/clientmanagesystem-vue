<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td>客户:</td>
          <td>
            <el-input type="text" v-model="clientLost.clientName"/>
          </td>
          &nbsp;
          <td>客户经理:</td>
          <td>
            <el-input type="text" v-model="clientLost.clientManager"/>
          </td>
          &nbsp;
          <td>状态:</td>
          <td>
            <el-input type="text" v-model="clientLost.status"/>
          </td>
          &nbsp;
          <td>
            <el-button @click="query()" round>查询</el-button>
            <el-button @click="exportExcel()" round>汇出报表</el-button>
          </td>
        </tr>
      </table>
    </template>
    <table style="width: auto;border-spacing: 50px 0">
      <tr>
        <td>编号</td>
        <td>客户</td>
        <td>客户经理</td>
        <td>上次下单时间</td>
        <td>确认流失时间</td>
        <td>状态</td>
        <td>操作</td>
      </tr>
      <tr v-for="(item, index) in pageResult.result" :key="item.clientName" style="line-height: 50px">
        <td>{{ index + 1 }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.clientManager }}</td>
        <td>{{ item.lastOrderDate }}</td>
        <td>{{ item.lostTime }}</td>
        <td>{{ item.status }}</td>
        <td>
          <el-button v-if="item.status === '未处理'" @click="reprieve(item, index)" round>暂缓流失</el-button>
          <el-button v-if="item.status === '暂缓流失'" @click="confirmedLoss(item, index)" round>确认流失</el-button>
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
  name: 'ClientmanagesystemPageClientLost',
  components: {TableStyle},
  data() {
    return {

      clientLost: {
        clientId: null,
        clientName: null,
        clientManager: null,
        lastOrderDate: null,
        lostTime: null,
        status: null,
      },
      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        forward: 1,
        result: []
      },
    };
  },

  mounted() {
    this.query();
  },

  methods: {
    query() {
      httpRequest.get('/clientservice/clientLost/queryClientLost', {
        clientManager: this.clientLost.clientManager,
        clientName: this.clientLost.clientName,
        status: this.clientLost.status,
        pageNum: this.pageResult.pageNum,
        pageSize: this.pageResult.pageSize
      })
          .then((response) => {
            this.pageResult = response.data.data
          });
    },
    reprieve(item, index) {
      httpRequest.post('/clientservice/clientLost/catcheData', {
        index: index,
        clientId: item.clientId,
        clientName: item.clientName,
        clientManager: item.clientManager,
        lastOrderDate: item.lastOrderDate,
        lostTime: item.lostTime,
        reprieve: item.reprieve,
        status: item.status,
      })
          .then((response) => {
            this.$router.push('/client/ClientLost/deferredLoss')
          });
    },
    confirmedLoss(item, index) {
      httpRequest.post('/clientservice/clientLost/catcheData', {
        index: index,
        clientId: item.clientId,
        clientName: item.clientName,
        clientManager: item.clientManager,
        lastOrderDate: item.lastOrderDate,
        lostTime: item.lostTime,
        reprieve: item.reprieve,
        status: item.status,
      })
          .then((response) => {
            this.$router.push('/client/ClientLost/confirmedLoss')
          });
    },

    exportExcel() {
      const a = document.createElement("a");
      a.href = `${this.$baseurl}/clientservice/clientLost/exportExcel?`
      if (this.clientLost.clientManager != null) {
        +"clientManager=" + this.clientLost.clientManager
      }
      if (this.clientLost.clientName != null) {
        +"&clientName=" + this.clientLost.clientName
      }
      if (this.clientLost.status != null) {
        +"&status=" + this.clientLost.status
      }
      if (this.pageResult.pageNum != null) {
        +"&pageNum=" + this.pageResult.pageNum
      }
      if (this.pageResult.pageSize != null) {
        +"&pageSize=" + this.pageResult.pageSize;
      }

      a.download = "fileName.xlsx";
      document.body.append(a);
      a.click();
    },

    /*******************************************/
    /**
     * 分页方法
     */
    firstPage() {
      this.pageResult.pageNum = 1;
      this.query();
    },
    lastPage() {
      if (this.pageResult.pageNum !== 1) {
        --this.pageResult.pageNum
        this.query();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum !== Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        ++this.pageResult.pageNum
        this.query();
      }
    },
    endPage() {
      this.pageResult.pageNum = Math.ceil(this.pageResult.total / this.pageResult.pageSize);
      this.query();
    },
    forward() {
      if (this.pageResult.forward >= 1 && this.pageResult.forward <= Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        this.pageResult.pageNum = this.pageResult.forward;
        this.query();
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