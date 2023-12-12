<template>
  <div>
    <table>
      <tr>
        <td>序号</td>
        <td>客户编号</td>
        <td>名称</td>
        <td>地区</td>
        <td>客户经理</td>
        <td>客户等级</td>
        <td>操作</td>
      </tr>

      <tr v-for="(item,index) in pageResult.result" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{ item.clientId }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.clientDistrict }}</td>
        <td>{{ item.clientManager }}</td>
        <td>{{ item.clientDegree }}</td>
        <td>
          <el-button @click="details(item)">详情</el-button>
        </td>
      </tr>
    </table>

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
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemPageClient',

  data() {
    return {
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
    this.pageClient();

  },

  methods: {
    details(item) {
      this.$router.push({
        path: "/clientPlan/detailClientPlan",
        query: item
      })
    },

    pageClient() {
      httpRequest.get("/clientservice/client/pageClient", {
        params: {
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize

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
  }
};
</script>

<style lang="scss" scoped></style>