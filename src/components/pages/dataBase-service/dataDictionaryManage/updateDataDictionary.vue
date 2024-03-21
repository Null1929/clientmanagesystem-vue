<template>
  <div>
    <table>
      <tr>
        <td>
          <el-button @click="back()" round>返回</el-button>
        </td>
        <td>
          <el-button @click="updateDataDictionary()" round>保存</el-button>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <td>编号</td>
        <td>
          <el-input type="text" disabled v-model="dataDictionary.id"/>
        </td>
      </tr>
      <tr>
        <td>类别</td>
        <td>
          <el-input type="text" disabled v-model="dataDictionary.category"/>
        </td>
      </tr>
      <tr>
        <td>条目</td>
        <td>
          <el-input type="number" v-model="dataDictionary.item"/>
        </td>
      </tr>
      <tr>
        <td>值</td>
        <td>
          <el-input type="text" v-model="dataDictionary.itemValue"/>
        </td>
      </tr>
      <tr>
        <td>是否可编辑</td>
        <td>
          <el-switch
              v-model="dataDictionary.edite"
              active-color="#13ce66"
              inactive-color="#ff4949">
          </el-switch>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemUpdateDataDictionary',

  data() {
    return {
      dataDictionary: {
        id: null,
        category: null,
        item: null,
        itemValue: null,
        edite: null,
      },
    };
  },

  mounted() {
    this.dataDictionary = this.$route.query;
    this.dataDictionary.edite = eval(this.$route.query.edite)
  },

  methods: {
    back() {
      this.$router.push('/dataBase/DataDictionary/pageDataDictionary')
    },
    updateDataDictionary() {
      httpRequest.put('/databaseservice/dataDictionary/updateDataDictionary', {
        id: this.dataDictionary.id,
        category: this.dataDictionary.category,
        item: this.dataDictionary.item,
        itemValue: this.dataDictionary.itemValue,
        edite: this.dataDictionary.edite,

      }).then((response) => {

        if (response.data.resCode === "000000") {
          alert(response.data.data);
          this.$router.push('/dataBase/DataDictionary/pageDataDictionary')
        } else {
          alert(response.data.resDesc);
          window.location.reload();
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>