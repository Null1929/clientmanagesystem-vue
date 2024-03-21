<template>
  <table-style>
    <template #header>
      <el-button @click="createPage()" round>新增订单</el-button>
    </template>
    <table>
      <tr>
        <td>客户编号</td>
        <td>{{ client.clientId }}</td>
      </tr>
      <tr>
        <td>客户名称</td>
        <td>{{ client.clientName }}</td>
      </tr>
    </table>
    <br>
    <table style="width: auto;border-spacing: 50px 0">
      <tr>
        <td>订单编号</td>
        <td>日期</td>
        <td>送货地址</td>
        <td>状态</td>
        <td>操作</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.orderId" style="line-height: 50px">
        <td>{{ item.orderId }}</td>
        <td>{{ item.orderDate.replace(/-/, '年').replace(/-/, '月').concat("日") }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.status }}</td>
        <td>
          <el-button @click="detail(item)" round>详情</el-button>
          <el-button @click="updatePage(item)" round>修改</el-button>
          <el-button @click="delOne(item.orderId)" round>删除</el-button>
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
  name: 'ClientmanagesystemPageHistoricalOrder',
  components: {TableStyle},
  data() {
    return {
      client: {
        clientId: null,
        clientName: null
      },

      order: {
        orderId: null,
        clientId: null,
        orderDate: null,
        address: null,
        status: null,
      },

      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 50,
        forward: 1,
        result: []
      },
    };
  },

  mounted() {
    this.client = this.$route.query;
    this.pageOrderHistory()
  },

  methods: {
    pageOrderHistory() {
      httpRequest.get('/clientservice/clientOrder/pageHystoricalOrder', {
        params: {
          clientId: this.client.clientId,
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize
        }
      }).then(response => {
        if (response.data.resCode === "000000") {
          this.pageResult = response.data.data
        }
      })
    },

    detail(item) {
      this.$router.push({
        path: '/client/HistoricalOrder/detailHistoricalOrder',
        query: item
      })

    },

    createPage() {
      this.$router.push({
        path: "/client/HistoricalOrder/createOrder",
        query: this.client
      })
    },
    updatePage(item) {
      this.$router.push({
        path: "/client/HistoricalOrder/updateOrder",
        query: {
          clientId: item.clientId,
          clientName: this.client.clientName,
          orderId: item.orderId,
          orderDate: item.orderDate,
          address: item.address,
          status: item.status
        }
      })
    },
    delOne(id) {
      httpRequest.delete('/clientservice/clientOrder/deleteOrder', {
        params: {
          id
        }
      }).then(response => {
        if (response.data.resCode === "000000") {
          alert(response.data.data);
          this.client = this.$route.query;
          this.pageOrderHistory()
        } else {
          alert(response.data.resDesc);
          this.client = this.$route.query;
          this.pageOrderHistory()
        }
      })
    },
    /*******************************************/
    /**
     * 分页方法
     */
    firstPage() {
      this.pageResult.pageNum = 1;
      this.pageOrderHistory();

    },
    lastPage() {
      if (this.pageResult.pageNum !== 1) {
        --this.pageResult.pageNum
        this.pageOrderHistory();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum !== Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        ++this.pageResult.pageNum
        this.pageOrderHistory();
      }
    },
    endPage() {
      this.pageResult.pageNum = Math.ceil(this.pageResult.total / this.pageResult.pageSize);
      this.pageOrderHistory();
    },
    forward() {
      if (this.pageResult.forward >= 1 && this.pageResult.forward <= Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        this.pageResult.pageNum = this.pageResult.forward;
        this.pageOrderHistory();
      } else {
        alert("页数不正确！")
        this.pageResult.forward = null;
      }
    },
    /*******************************************/
  }
}
</script>

<style lang="scss" scoped></style>