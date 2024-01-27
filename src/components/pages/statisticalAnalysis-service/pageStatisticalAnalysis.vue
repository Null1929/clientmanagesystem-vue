<template>
  <table-style>
    <table style="border-spacing: 10px 0">
      <tr>
        <td>客户名称:</td>
        <td>
          <el-input type="text" v-model="clientName"/>
        </td>
        <td>年份:</td>
        <td>
          <el-select style="width: 150px" v-model="year" placeholder="请选择">
            <el-option
                v-for="item in yearList"
                :key="item"
                :label="item"
                :value="item">
            </el-option>
          </el-select>
        </td>
        <td style="padding-left: 20px">
          <el-button @click="query()" icon="el-icon-search" round>查询</el-button>
        </td>
      </tr>
    </table>
    <br>
    <table style="border-spacing: 50px 0">
      <tr>
        <td>编号</td>
        <td>客户名称</td>
        <td>订单总金额(元)</td>
      </tr>
      <tr style="line-height: 50px" v-if="pageResult.total!==0" :key="item.clientId"
          v-for="(item, index) in pageResult.result">
        <td>{{ item.clientId }}</td>
        <td>{{ item.clientName }}</td>
        <td v-if="item.amount===null">
          0
        </td>
        <td>
          {{ item.amount }}
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
  name: 'ClientmanagesystemPageStatisticalAnalysis',
  components: {TableStyle},
  data() {
    return {
      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 100,
        forward: 1,
        result: []
      },

      clientName: null,
      year: null,
      yearList: null,
    };
  },

  mounted() {
    this.query();
    this.getOrderDate();
  },

  methods: {
    getOrderDate() {
      httpRequest.get('/clientservice/clientOrder/getOrderDate', {}).then((response) => {
        if (response.data.resCode === "000000") {
          this.yearList = response.data.data;
        }
      });
    }
    ,
    query() {
      httpRequest.get('/clientservice/clientOrder/yearStatisticalAnalysis', {
        params: {
          clientName: this.clientName,
          year: this.year,
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize
        }
      }).then((response) => {
        if (response.data.resCode === "000000") {
          if (response.data.data.result !== null) {
            this.pageResult = response.data.data;
          }
        }
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


<style lang="less" scoped>

</style>