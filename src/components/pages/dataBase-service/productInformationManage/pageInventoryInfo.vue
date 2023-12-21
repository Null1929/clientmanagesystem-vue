<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td>产品</td>
          <td>
            <input type="text" v-model="inventoryInfo.productName">

            &nbsp;&nbsp;&nbsp;&nbsp;
          </td>
          <td>仓库</td>
          <td><input type="text" v-model="inventoryInfo.stash"></td>
          <td>
            <el-button @click="query()">查询</el-button>
          </td>
        </tr>
      </table>
    </template>
    <table>
      <tr>
        <td>序号</td>
        <td>产品</td>
        <td>仓库</td>
        <td>货位</td>
        <td>件数</td>
        <td>备注</td>
      </tr>

      <tr v-for="(item, index) in pageResult.data" :key="item.productName">
        <td>{{ index + 1 }}</td>
        <td>{{ item.productName }}</td>
        <td>{{ item.stash }}</td>
        <td>{{ item.freightSpace }}</td>
        <td>{{ item.productNum }}</td>
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
  name: 'ClientmanagesystemPageInventoryInfo',
  components: {TableStyle},
  data() {
    return {
      inventoryInfo: {
        productName: null,
        stash: null,
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
    httpRequest.get('/databaseservice/dataBase/pageInventoryInfo', {
      params: {
        pageNum: 1,
        pageSize: 2,
        productName: null,
        stash: null,
      }
    }).then((response) => {
      this.pageResult = response.data.data
    }).catch((err) => {

    });
  },

  methods: {
    query() {
      httpRequest.get('/databaseservice/dataBase/pageInventoryInfo', {
        params: {
          pageNum: 1,
          pageSize: 5,
          productName: this.inventoryInfo.productName,
          stash: this.inventoryInfo.stash,
        }
      }).then((reponse) => {
        this.pageResult = reponse.data.data
      });
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
      if (this.pageResult.pageNum != 1) {
        --this.pageResult.pageNum
        this.query();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum != Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
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