<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td>
            <el-button>帮助</el-button>
          </td>
          <td>
            <el-button @click="query()">查询</el-button>
          </td>
        </tr>
      </table>
    </template>
    <table>
      <tr>
        <td>名称</td>
        <td><input type="text" v-model="productInfo.productName"></td>
      </tr>
      <tr>
        <td>型号</td>
        <td><input type="text" v-model="productInfo.productType"></td>
      </tr>
      <tr>
        <td>批次</td>
        <td><input type="text" v-model="productInfo.productDegree"></td>
      </tr>
    </table>

    <table>
      <tr>
        <td>编号</td>
        <td>名称</td>
        <td>型号</td>
        <td>等级/批次</td>
        <td>单位</td>
        <td>单价(元)</td>
        <td>备注</td>
      </tr>

      <tr v-for="(item, index) in pageResult.data" :key="item.productName">
        <td>{{ index + 1 }}</td>
        <td>{{ item.productName }}</td>
        <td>{{ item.productType }}</td>
        <td>{{ item.productDegree }}</td>
        <td>{{ item.unit }}</td>
        <td>{{ item.productPrice }}</td>
        <td>{{ item.notes }}</td>
      </tr>
    </table>
    <template #footer>
      <table>
        <tr>
          <td>共有{{ pageResult.allData }}条记录</td>
          <td>第{{ pageResult.nowPage }}/共{{ pageResult.allPages }}页</td>
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
          <td>转到<input type="text" v-model="forw">页
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
    query() {
      httpRequest.get('/databaseservice/dataBase/pageProductInfo', {
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

    /*******************************************/
    /**
     * 分页方法
     */
    firstPage() {
      this.pageResult.pageNum = 1;
      this.pageClient();

    },
    lastPage() {
      if (this.pageResult.pageNum != 1) {
        --this.pageResult.pageNum
        this.pageClient();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum != Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        ++this.pageResult.pageNum
        this.pageClient();
      }
    },
    endPage() {
      this.pageResult.pageNum = Math.ceil(this.pageResult.total / this.pageResult.pageSize);
      this.pageClient();
    },
    forward() {
      if (this.pageResult.forward >= 1 && this.pageResult.forward <= Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        this.pageResult.pageNum = this.pageResult.forward;
        this.pageClient();
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