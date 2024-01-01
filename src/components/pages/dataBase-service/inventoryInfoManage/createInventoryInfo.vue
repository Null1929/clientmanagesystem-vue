<template>
  <table-style>
    <table>
      <tr>
        <td>编号</td>
        <td><input type="text" disabled v-model="inventoryInfo.id"/></td>
      </tr>
      <tr>
        <td>产品</td>
        <td><input type="text" v-model="inventoryInfo.productName"/></td>
      </tr>
      <tr>
        <td>仓库</td>
        <td><input type="text" v-model="inventoryInfo.stash"/></td>
      </tr>
      <tr>
        <td>货位</td>
        <td><input type="text" v-model="inventoryInfo.freightSpace"/></td>
      </tr>
      <tr>
        <td>数量</td>
        <td><input type="number" v-model="inventoryInfo.productNum"/></td>
      </tr>
      <tr>
        <td>备注</td>
        <td><input type="text" v-model="inventoryInfo.notes"/></td>
      </tr>
      <tr>
        <td>
          <el-button @click="save()">保存</el-button>
        </td>
      </tr>
    </table>
  </table-style>
</template>

<script>
import httpRequest from '@/request';
import TableStyle from "@/components/slot/tableStyle";

export default {
  name: "createInventoryInfo",
  components: {TableStyle},

  data() {
    return {
      inventoryInfo: {
        id: null,
        productName: null,
        stash: null,
        freightSpace: null,
        productNum: null,
        notes: null
      },
    }
  },
  methods: {
    save() {
      httpRequest.post("/databaseservice/inventoryInfo/createInventoryInfo", this.inventoryInfo).then(response => {
        if (response.data.resCode === "000000") {
          alert(response.data.data)
          this.$router.push("/dataBase/inventoryInfo/pageInventoryInfo");
        } else {
          alert(response.data.resDesc);
        }
      })
    }
  }
}
</script>

<style scoped>

</style>