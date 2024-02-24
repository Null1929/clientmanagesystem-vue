<template>
  <table-style>
    <template #header>

    </template>
    <table>
      <tr>
        <td>编号</td>
        <td>
          <el-input disabled type="text" v-model="productInfo.id"/>
        </td>
      </tr>
      <tr>
        <td>产品名称</td>
        <td>
          <el-input type="text" v-model="productInfo.productName"/>
          </td>
      </tr>
      <tr>
        <td>产品类型</td>
        <td>
          <el-input type="text" v-model="productInfo.productType"/>
        </td>
      </tr>
      <tr>
        <td>批次/等级</td>
        <td>
          <el-input type="text" v-model="productInfo.productDegree"/>
        </td>
      </tr>
      <tr>
        <td>单位</td>
        <td>
          <el-input type="text" v-model="productInfo.unit"/>
        </td>
      </tr>
      <tr>
        <td>单价(元)</td>
        <td>
          <el-input type="number" v-model="productInfo.productPrice"/>
        </td>
      </tr>
      <tr>
        <td>备注</td>
        <td>
          <el-input type="text" v-model="productInfo.notes"/>
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
import httpRequest from "@/request";
import TableStyle from "@/components/slot/tableStyle";

export default {
  name: 'ClientmanagesystemCreateProductInfo',
  components: {TableStyle},

  data() {
    return {
      productInfo: {
        id: null,
        productName: null,
        productType: null,
        productDegree: null,
        unit: null,
        productPrice: null,
        notes: null
      }
    }
  },

  methods: {
    save() {
      httpRequest.post("/databaseservice/productInfo/createProductInfo", this.productInfo)
          .then(response => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.$router.push("/dataBase/productInfo/pageProductInfo");
            } else {
              alert(response.data.resDesc);
            }
          })
    }
  }
}
</script>


<style lang="scss" scoped></style>