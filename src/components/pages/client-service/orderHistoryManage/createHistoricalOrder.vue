<template>
  <table-style>
    <table>
      <tr>
        <td>订单编号:</td>
        <td>
          {{ order.orderId }}
        </td>
      </tr>
      <tr>
        <td>日期:</td>
        <td>
          {{ order.orderDate }}
        </td>
      </tr>
      <tr>
        <td>送货地址:</td>
        <td>
          {{ order.address }}
        </td>
      </tr>
      <tr>
        <td>状态:</td>
        <td>
          {{ order.status }}
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td>编号</td>
        <td>
          <el-input type="number" v-model="orderDetail.id" disabled/>
        </td>
      </tr>
      <tr>
        <td>商品</td>
        <td>
          <el-input type="text" v-model="orderDetail.productName"/>
        </td>
      </tr>
      <tr>
        <td>数量</td>
        <td>
          <el-input type="number" v-model="orderDetail.productNumber"/>
        </td>
      </tr>
      <tr>
        <td>单位</td>
        <td>
          <el-input type="text" v-model="orderDetail.unit"/>
        </td>
      </tr>
      <tr>
        <td>单价(元)</td>
        <td>
          <el-input type="number" v-model="orderDetail.price"/>
        </td>
      </tr>
      <tr>
        <td>
          <el-button  @click="save()" round>保存</el-button>
        </td>
      </tr>
    </table>
  </table-style>
</template>

<script>
import TableStyle from "@/components/slot/tableStyle";
import httpRequest from "@/request";

export default {
  name: "createHistorialOrder",
  components: {TableStyle},

  data() {
    return {
      order: {
        orderId: null,
        orderDate: null,
        address: null,
        status: null,
      },
      orderDetail: {
        id: null,
        orderId: null,
        productName: null,
        productNumber: null,
        unit: null,
        price: null,
      }
    }
  },
  mounted() {
    this.order = this.$route.query;
  }
  ,
  methods: {
    save() {
      httpRequest.post("/clientservice/clientOrder/addNeoOrderDetail",{
        ...this.orderDetail,
        orderId:this.order.orderId
      }).then(response => {
        if (response.data.resCode === "000000") {
          alert(response.data.data);
          this.$router.push({
            path:"/client/HistoricalOrder/detailHistoricalOrder",
            query:this.order
          })
        } else {
          alert(response.data.resDesc);
        }
      })
    },
  }
}
</script>

<style scoped>

</style>