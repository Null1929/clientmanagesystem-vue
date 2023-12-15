<template>
  <table-style>
    <template #header>
      <el-button @click="add()">新建客户</el-button>
      <el-button @click="warn()">流失预警</el-button>
    </template>
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

      <tr v-for="(item, index) in pageResult.result" :key="item.clientId">
        <td>{{ index + 1 }}</td>
        <td>{{ item.clientId }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.clientDistrict }}</td>
        <td>{{ item.clientManager }}</td>
        <td>{{ item.clientDegree }}</td>
        <td>
          <el-button @click="update(item)">修改</el-button>
          <el-button @click="delClient(item.clientId)">删除</el-button>
          <el-button @click="liaison(item)">联系人</el-button>
          <el-button @click="details(item)">详情</el-button>
          <el-button @click="record(item)">交往记录</el-button>
          <el-button @click="order(item)">历史订单</el-button>
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
  name: 'ClientmanagesystemPageClients',
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
    };
  },

  mounted() {
    this.pageClient();
  },

  methods: {
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
    }

    ,
    add() {
      this.$router.push('/client/createClient')
    },
    update(item) {
      this.$router.push({
        path: '/client/updateClient',
        query: item
      })
    },
    delClient(clientId) {
      httpRequest.get('/clientservice/client/delClient', {
        params: {
          clientId: clientId,
        }
      })
          .then((response) => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.pageClient();
            } else {
              alert(response.data.resDesc);
            }
          });

    },
    liaison(item) {
      this.$router.push({
        path: '/client/liaison/pageLiaison',
        query: item
      })
    },
    details(item) {
      this.$router.push({path: '/client/detailClient', query: item})
    },
    record(item) {
        this.$router.push({
          path:'/client/ContactRecord/pageContactRecord',
          query:item
        })
    },
    order(item) {
        this.$router.push({
          path:'/client/HistoricalOrder/pageHistoricalOrder',
          query:item
        })
    },
    warn() {
      httpRequest.get('/clientservice/client/warn', {}).then(response => {
        alert(response.data.msg);
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

<style lang="less" scoped>


</style>