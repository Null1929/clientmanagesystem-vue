<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td>
            <el-button @click="create()" round>新建</el-button>
          </td>
        </tr>
      </table>
    </template>
    <table>
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
        &nbsp;
        <td>条目</td>
        <td>
          <el-input type="number" v-model="dataDictionary.item"/>
        </td>
        &nbsp;
        <td>值</td>
        <td>
          <el-input type="text" v-model="dataDictionary.itemValue"/>
        </td>
        &nbsp;&nbsp;
        <td>
          <el-button @click="query()" round>查询</el-button>
          <el-button @click="exportExcel()" round>汇出报表</el-button>
        </td>
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

      <tr v-for="(item, index) in pageResult.result" :key="index" style="line-height: 50px">
        <td>{{ index + 1 }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.item }}</td>
        <td>{{ item.itemValue }}</td>
        <td>
          <el-button v-if="item.edite" type="success" icon="el-icon-check" circle disabled></el-button>
          <el-button v-if="!item.edite" type="danger" icon="el-icon-close" circle disabled></el-button>
        </td>
        <td>
          <el-button @click="deleted(item.id)" round>删除</el-button>
          <el-button v-if="item.edite" @click="edite(item)" round>编辑</el-button>
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
        pageSize: 10,
        forward: 1,
        result: []
      },

      options: ["服务类型", "客户等级"]
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
      httpRequest.get('/databaseservice/dataDictionary/deleteDataDictionary', {
        params: {
          id: id
        }
      }).then((response) => {
        if (response.data.resCode === "000000") {
          alert(response.data.data);
          this.query();
        } else {
          alert(response.data.resDesc);
          this.query();
        }
      });
    },
    edite(item) {
      this.$router.push({path: '/dataBase/DataDictionary/updateDataDictionary', query: item})
    },
    query() {
      httpRequest.get('/databaseservice/dataDictionary/queryDataByCondition', {
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
    },

    exportExcel() {
      const a = document.createElement("a");
      a.href = "http://192.168.124.13:9090/databaseservice/dataDictionary/exportExcelForDataDictionary"
      if (this.pageResult.pageNum != null) {
        +"?pageNum=" + this.pageResult.pageNum
      }
      if (this.pageResult.pageSize != null) {
        +"&pageSize=" + this.pageResult.pageSize;
      }
      if (this.dataDictionary.category != null) {
        +"&category=" + this.dataDictionary.category
      }
      if (this.dataDictionary.item != null) {
        +"&item=" + this.dataDictionary.item
      }
      if (this.dataDictionary.itemValue != null) {
        +"&itemValue=" + this.dataDictionary.itemValue
      }


      a.download = "fileName.xlsx";
      document.body.append(a);
      a.click();
    },
    /*******************************************/
    /**
     * 分页方法
     */
    firstPage() {
      this.pageResult.pageNum = 1;
      this.query();

    },
    lastPage() {
      if (this.pageResult.pageNum !== 1) {
        --this.pageResult.pageNum
        this.query();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum !== Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        ++this.pageResult.pageNum
        this.query();
      }
    },
    endPage() {
      this.pageResult.pageNum = Math.ceil(this.pageResult.total / this.pageResult.pageSize);
      this.query();
    },
    forward() {
      if (this.pageResult.forward >= 1 && this.pageResult.forward <= Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        this.pageResult.pageNum = this.pageResult.forward;
        this.query();
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