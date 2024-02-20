<template>
  <table-style>
    <template #header>
      <el-button @click="create()" round>新增</el-button>
    </template>
    <table>
      <tr>
        <td>名称</td>
        <td>
          <el-input type="text" v-model="productInfo.productName"/>
        </td>
        &nbsp;&nbsp;
        <td>类型</td>
        <td>
          <el-input type="text" v-model="productInfo.productType"/>
        </td>
        &nbsp;
        <td>批次</td>
        <td>
          <el-input type="text" v-model="productInfo.productDegree"/>
        </td>
        &nbsp;&nbsp;
        <td>
          <el-button @click="query()" round>查询</el-button>
          <el-button @click="exportExcel()" round>汇出报表</el-button>
        </td>
      </tr>
    </table>
    <table style="width: auto;border-spacing: 50px 0">
      <tr>
        <td>编号</td>
        <td>名称</td>
        <td>类型</td>
        <td>批次/等级</td>
        <td>单位</td>
        <td>单价(元)</td>
        <td>备注</td>
        <td>操作</td>
      </tr>

      <tr v-for="(item, index) in pageResult.result" :key="item.productName" style="line-height: 50px">
        <td>{{ item.id }}</td>
        <td>{{ item.productName }}</td>
        <td>{{ item.productType }}</td>
        <td>{{ item.productDegree }}</td>
        <td>{{ item.unit }}</td>
        <td>{{ item.productPrice }}</td>
        <td>{{ item.notes }}</td>
        <td>
          <el-button @click="deleteById(item.id)" round>删除</el-button>
          <el-button @click="update(item)" round>编辑</el-button>
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
  name: 'ClientmanagesystemPageProductInfo',
  components: {TableStyle},
  data() {
    return {
      productInfo: {
        productName: null,
        productType: null,
        productDegree: null,
      },

      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        forward: 1,
        result: []
      },
    };
  },

  mounted() {
    this.query();
  },

  methods: {
    query() {
      httpRequest.get('/databaseservice/productInfo/pageProductInfo', {
        params: {
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize,
          productName: this.productInfo.productName,
          productType: this.productInfo.productType,
          productDegree: this.productInfo.productDegree,
        }
      }).then((reponse) => {
        if (reponse.data.resCode === "000000") {
          this.pageResult = reponse.data.data;
        }
      });
    },

    create() {
      this.$router.push("/dataBase/productInfo/createProduct")
    },

    update(item) {
      this.$router.push({
        path: "/dataBase/productInfo/updateProduct",
        query: item
      })
    },
    deleteById(id) {
      httpRequest.get('/databaseservice/productInfo/delProductInfo', {
        params: {
          id
        }
      }).then((reponse) => {
        if (reponse.data.resCode === "000000") {
          alert(reponse.data.data);
        } else {
          alert(reponse.data.resDesc);
        }
        this.query();
      });
    },

    exportExcel() {
      const a = document.createElement("a");
      a.href = "http://192.168.124.13:9090/databaseservice/productInfo/exportExcelForProductInfo"
      if (this.pageResult.pageNum != null) {
        +"?pageNum=" + this.pageResult.pageNum
      }
      if (this.pageResult.pageSize != null) {
        +"&pageSize=" + this.pageResult.pageSize;
      }
      if (this.productInfo.productName != null) {
        +"&productName=" + this.productInfo.productName
      }
      if (this.productInfo.productType != null) {
        +"&productType=" + this.productInfo.productType
      }
      if (this.productInfo.productDegree != null) {
        +"&productDegree=" + this.productInfo.productDegree
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