<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td>
            <el-button @click="create()">新建</el-button>
          </td>
          <td>
            <el-button @click="query()">查询</el-button>
          </td>
        </tr>
      </table>
    </template>
    <table>
      <tr>
        <td>类别</td>
        <td>
          <select name="" id="" v-model="dataDictionary.category">
            <option disabled value="">请选择</option>
            <option value="企业客户等级">企业客户等级</option>
            <option value="服务类型">服务类型</option>
          </select>
        </td>

        <td>条目</td>
        <td><input type="text" v-model="dataDictionary.item"></td>

        <td>值</td>
        <td><input type="text" v-model="dataDictionary.itemValue"></td>
      </tr>
    </table>
    <table>
      <tr>
        <td>编号</td>
        <td>类别</td>
        <td>条目</td>
        <td>值</td>
        <td>是否可编辑</td>
        <td>操作</td>
      </tr>

      <tr v-for="(item, index) in pageResult.result" :key="item.category">
        <td>{{ index + 1 }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.item }}</td>
        <td>{{ item.itemValue }}</td>
        <td>
          <label v-if="item.edite == true">是</label>
          <label v-else-if="item.edite == false">否</label>
        </td>
        <td>
          <el-button @click="deleted(item.id)">删除</el-button>
          &nbsp;&nbsp;
          <el-button v-if="item.edite" @click="edite(item)">编辑</el-button>
        </td>
      </tr>
    </table>
    <template #footer>
      <table>
        <tr>
          <td>共有{{ pageResult.total }}条记录</td>
          <td>第{{ pageResult.pageNum }}/共{{ Math.ceil(pageResult.total / pageResult.pageSize) }}页</td>
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
  name: 'ClientmanagesystemPageDataDictionary',
  components: {TableStyle},
  data() {
    return {
      dataDictionary: {
        id: null,
        category: '',
        item: null,
        itemValue: null,
        edite: null,
      },

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
    this.query();
  },

  methods: {
    create() {
      this.$router.push('/dataBase/DataDictionary/createDataDictionary')
    },
    deleted(id) {
      httpRequest.get('/databaseservice/dataBase/deleteDataDictionary', {
        params: {
          id: id
        }
      }).then((response) => {
        if(response.data.resCode==="000000"){
          alert(response.data.data);
          this.query();
        }else {
          alert(alert(response.data.resDesc));
          this.query();
        }
      });
    },
    edite(item) {
      this.$router.push({path: '/dataBase/DataDictionary/updateDataDictionary', query: item})
    },
    query() {
      httpRequest.get('/databaseservice/dataBase/queryDataByCondition', {
        params: {
          category: this.dataDictionary.category,
          item: this.dataDictionary.item,
          itemValue: this.dataDictionary.itemValue,
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize
        }

      }).then((response) => {
        if (response.data.resCode === "000000") {
          this.pageResult = response.data.data
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>