<template>
  <table-style>
    <template #header>
      <el-button round @click="createPage()">新增订单项</el-button>
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
    </table>
    <table style="line-height: 20px;padding-left: 10px;border-spacing: 50px 0">
      <tr>
        <td>编号</td>
        <td>商品</td>
        <td>数量</td>
        <td>单位</td>
        <td>单价（元）</td>
        <td>金额（元）</td>
        <td>操作</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.productName }}</td>
        <td>{{ item.productNumber }}</td>
        <td>{{ item.unit }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.productNumber * item.price }}</td>
        <td>
          <el-button @click="updatePage(item)" round>修改</el-button>
          <el-button @click="delOne(item.id)" round>删除</el-button>
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
  name: 'ClientmanagesystemDetailHistoricalOrder',
  components: {TableStyle},
  data() {
    return {
      order: {
        orderId: null,
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
    this.pageResult.pageNum = 1
    this.order = this.$route.query
    this.pageOrderHistoryDetail()
    this.getTotalAmount()
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

    createPage() {
      this.$router.push({
        path: "/client/HistoricalOrder/createHistoricalOrder",
        query: this.order
      })
    },

    updatePage(item) {
      this.$router.push({
        path: "/client/HistoricalOrder/updateHistoricalOrder",
        query: {
          id: item.id,
          orderId: item.orderId,
          orderDate: this.order.orderDate,
          address: this.order.address,
          status: this.order.status,
          productName: item.productName,
          productNumber: item.productNumber,
          unit: item.unit,
          price: item.price
        }
      })
    },
    delOne(id) {
      httpRequest.get("/clientservice/clientOrder/delOrderDetail", {
        params: {
          id
        }
      }).then(response => {
        if (response.data.resCode === '000000') {
          alert(response.data.data);
          this.pageOrderHistoryDetail();
          this.getTotalAmount();
        } else {
          alert(response.data.resDesc);
          this.pageOrderHistoryDetail();
          this.getTotalAmount();
        }
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