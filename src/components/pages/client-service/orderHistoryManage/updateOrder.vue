<template>
  <table-style>
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
    <table>
      <tr>
        <td>订单编号:</td>
        <td>
          <el-input type="number" v-model="order.orderId" disabled/>
        </td>
      </tr>
      <tr>
        <td>客户编号:</td>
        <td>
          <el-input type="number" v-model="order.clientId" disabled/>
        </td>
      </tr>
      <tr>
        <td>日期:</td>
        <td>
          <el-input type="date" v-model="order.orderDate"/>
        </td>
      </tr>
      <tr>
        <td>送货地址:</td>
        <td>
          <el-input type="text" v-model="order.address"/>
        </td>
      </tr>
      <tr>
        <td>状态:</td>
        <td>
          <el-input type="text" v-model="order.status"/>
        </td>
      </tr>
      <tr>
        <td>
          <el-button @click="save()" round>保存</el-button>
        </td>
      </tr>
    </table>
  </table-style>
</template>

<script>
import httpRequest from '@/request';
import TableStyle from "@/components/slot/tableStyle";

export default {
  name: "updateOrder",
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
    };
  },
  mounted() {
    this.client.clientId = this.$route.query.clientId;
    this.client.clientName = this.$route.query.clientName;
    this.order.orderId = this.$route.query.orderId;
    this.order.clientId = this.$route.query.clientId;
    this.order.orderDate = this.$route.query.orderDate;
    this.order.address = this.$route.query.address;
    this.order.status = this.$route.query.status;
  },
  methods: {
    save() {
      httpRequest.put("/clientservice/clientOrder/updateOrder", this.order).then(response => {
        if (response.data.resCode === '000000') {
          alert(response.data.data);
          this.$router.push({
            path: "/client/HistoricalOrder/pageHistoricalOrder",
            query: this.client
          });
        }
      });
    },
  }
}
</script>

<style scoped>

</style>