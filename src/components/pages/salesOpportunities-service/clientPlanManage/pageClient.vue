<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td>编号:</td>
          <td><el-input type="number" v-model="client.clientId"/></td>
          &nbsp;
          <td>客户名称:</td>
          <td><el-input type="text" v-model="client.clientName"/></td>
          &nbsp;
          <td>地区:</td>
          <td><el-input type="text" v-model="client.clientDistrict"/></td>
          &nbsp;
          <td>客户等级:</td>
          <td><el-input type="number" v-model="client.clientDegree"/></td>
          &nbsp;
          <td>
            <el-button @click="query()" icon="el-icon-search" round>查询</el-button>
          </td>
        </tr>
      </table>
    </template>

    <table>
      <tr>
        <td>编号</td>
        <td>客户名称</td>
        <td>地区</td>
        <td>客户经理</td>
        <td>客户等级</td>
        <td>操作</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.id">
        <td>{{ item.clientId }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.clientDistrict }}</td>
        <td>{{ item.clientManager }}</td>
        <td>{{ item.clientDegree }}</td>
        <td>
          <el-button @click="details(item)" round>详情</el-button>
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
  name: 'ClientmanagesystemPageClient',
  components: {TableStyle},
  data() {
    return {
      client: {
        clientId: null,
        clientName: null,
        clientDistrict: null,
        clientDegree: null,
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
    details(item) {
      this.$router.push({
        path: "/clientPlan/detailClientPlan",
        query: item
      })
    },

    query() {
      httpRequest.get("/clientservice/client/queryClientByPage", {
        params: {
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize,
          clientId:this.client.clientId,
          clientName:this.client.clientName,
          clientDegree:this.client.clientDegree,
          clientDistrict:this.client.clientDistrict
        }
      }).then(response => {
        if (response.data.resCode === "000000") {
          this.pageResult = response.data.data
        }
      })
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
  }
};
</script>

<style lang="scss" scoped></style>