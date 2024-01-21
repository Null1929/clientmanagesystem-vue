<template>
  <table-style>
    <template #header>
    <el-button>新增订单明细</el-button>
    </template>
    <table>
      <tr>
        <td>订单编号</td>
        <td>{{ order.orderId }}</td>
      </tr>
      <tr>
        <td>日期</td>
        <td>{{ order.orderDate }}</td>
      </tr>
      <tr>
        <td>送货地址</td>
        <td>{{ order.address }}</td>
      </tr>
      <tr>
        <td>状态</td>
        <td>{{ order.status }}</td>
      </tr>
      <tr>
        <td>总金额（元）</td>
        <td>{{ totalAmount }}</td>
      </tr>

      <tr>
        <td>商品</td>
        <td>数量</td>
        <td>单位</td>
        <td>单价（元）</td>
        <td>金额（元）</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.id">
        <td>{{ item.productName }}</td>
        <td>{{ item.productNumber }}</td>
        <td>{{ item.unit }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.productNumber * item.price }}</td>
        <td>
          <el-button>修改</el-button>
          <el-button>删除</el-button>
        </td>
      </tr>
    </table>
    <template #footer>
      <table>
        <tr>
          <td>共有{{ pageResult.total }}条记录</td>
          <td>第{{pageResult.pageNum}}/共{{ Math.ceil(pageResult.total / pageResult.pageSize) }}页</td>
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
  name: 'ClientmanagesystemDetailHistoricalOrder',
  components: {TableStyle},
  data() {
    return {
      order: {
        id: null,
        orderId: null,
        clientId: null,
        orderDate: null,
        address: null,
        status: null,
      },
      totalAmount: 0,
      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 100,
        forward: 1,
        result: []
      },
    };
  },

  mounted() {
    this.pageResult.pageNum=1
    this.order = this.$route.query
    this.pageOrderHistoryDetail()

    this.getTotalAmount()
    console.log(this.pageResult)
  },
  methods: {
    pageOrderHistoryDetail() {
      httpRequest.get("/clientservice/clientOrder/getOrderDetail", {
        params: {
          orderId: this.order.orderId,
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize
        }
      }).then(response => {
        if (response.data.resCode === "000000") {
          console.log(response.data.data)
          this.pageResult = response.data.data
        }
      })
    },

    getTotalAmount() {
      httpRequest.get("/clientservice/clientOrder/getTotalAmount", {
        params: {
          orderId: this.order.orderId
        }
      }).then(response => {
        this.totalAmount = response.data.data
      })
    },

    /*******************************************/
    /**
     * 分页方法
     */
    firstPage() {
      this.pageResult.pageNum = 1;
      this.pageOrderHistoryDetail();

    },
    lastPage() {

      if (this.pageResult.pageNum !== 1) {
        --this.pageResult.pageNum
        this.pageOrderHistoryDetail();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum !== Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        ++this.pageResult.pageNum
        this.pageOrderHistoryDetail();
      }
    },
    endPage() {
      this.pageResult.pageNum = Math.ceil(this.pageResult.total / this.pageResult.pageSize);
      this.pageOrderHistoryDetail();
    },
    forward() {
      if (this.pageResult.forward >= 1 && this.pageResult.forward <= Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        this.pageResult.pageNum = this.pageResult.forward;
        this.pageOrderHistoryDetail();
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