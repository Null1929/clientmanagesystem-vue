<template>
  <div>
    <table>
      <tr>
        <td>
          <el-button @click="back()">返回</el-button>
        </td>
        <td>
          <el-button @click="saveDataDictionary()">保存</el-button>
        </td>
      </tr>
    </table>

    <table>
      <tr>
        <td>编号</td>
        <td>
          <input type="text" disabled v-model="dataDictionary.id">
        </td>
      </tr>
      <tr>
        <td>类别</td>
        <td>
          <select name="" id="" v-model="dataDictionary.category">
            <option disabled value="">请选择</option>
            <option value="企业客户等级">企业客户等级</option>
            <option value="服务类型">服务类型</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>条目</td>
        <td>
          <input type="text" v-model="dataDictionary.item">
        </td>
      </tr>
      <tr>
        <td>值</td>
        <td>
          <input type="text" v-model="dataDictionary.itemValue">
        </td>
      </tr>
      <tr>
        <td>是否可编辑</td>
        <td>
          <input type="checkbox" v-model="dataDictionary.edite">
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemCreateDataDictionary',

  data() {
    return {
      dataDictionary: {
        id: null,
        category: '',
        item: null,
        itemValue: null,
        edite: null,
      },
    };
  },

  mounted() {

  },

  methods: {
    back() {
      this.$router.push('/dataBase/DataDictionary/pageDataDictionary')
    },
    saveDataDictionary() {
      httpRequest.post('/databaseservice/dataBase/createDataDictionary', this.dataDictionary).then((response) => {

        if (response.data.resCode === "000000") {
          alert(response.data.data);
          this.$router.push('/dataBase/DataDictionary/pageDataDictionary');
        } else {
          alert(response.data.resDesc)
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>