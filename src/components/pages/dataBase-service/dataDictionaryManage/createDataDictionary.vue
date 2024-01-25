<template>
  <div>
    <table>
      <tr>
        <td>
          <el-button @click="back()" round>返回</el-button>
        </td>
        <td>
          <el-button @click="saveDataDictionary()" round>保存</el-button>
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
          <el-select v-model="dataDictionary.category" placeholder="请选择">
            <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
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
  name: 'ClientmanagesystemCreateDataDictionary',

  data() {
    return {
      dataDictionary: {
        id: null,
        category: '',
        item: null,
        itemValue: null,
        edite: false,
      },

      options:["服务类型","客户等级"],
    };
  },

  mounted() {

  },

  methods: {
    back() {
      this.$router.push('/dataBase/DataDictionary/pageDataDictionary')
    },
    saveDataDictionary() {
      httpRequest.post('/databaseservice/dataDictionary/createDataDictionary', this.dataDictionary).then((response) => {

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