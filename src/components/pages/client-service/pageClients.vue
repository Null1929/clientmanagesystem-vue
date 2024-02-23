<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td colspan="9" align="left">
            <el-button @click="add()" round>新建客户</el-button>
            <el-button @click="warn()" round>流失预警</el-button>
          </td>
        </tr>
        <tr>
          <td>编号:</td>
          <td>
            <el-input type="number" v-model="client.clientId"/>
          </td>
          &nbsp;
          <td>客户名称:</td>
          <td>
            <el-input type="text" v-model="client.clientName"/>
          </td>
          &nbsp;
          <td>地区:</td>
          <td>
            <el-input type="text" v-model="client.clientDistrict"/>
          </td>
          &nbsp;
          <td>客户等级:</td>
          <td>
            <el-input style="width: 100px" type="number" v-model="client.clientDegree"/>
          </td>
          &nbsp;
          <td>
            <el-button @click="query()" round>查询</el-button>
            <el-button @click="exportExcel()" round>汇出报表</el-button>
          </td>
        </tr>
      </table>
    </template>
    <br>
    <table style="width: 1400px;">
      <tr>
        <td style="width: 180px">客户编号</td>
        <td style="width: 120px">名称</td>
        <td style="width: 200px">地区</td>
        <td style="width: 130px">客户经理</td>
        <td style="width: 120px">客户等级</td>
        <td style="width: auto">操作</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.clientId" style="line-height: 50px">
        <td>{{ item.clientId }}</td>
        <td>{{ item.clientName }}</td>
        <td>{{ item.clientDistrict }}</td>
        <td>{{ item.clientManager }}</td>
        <td>{{ item.clientDegree }}</td>
        <td>
          <el-button @click="update(item)" round>修改</el-button>
          <el-button @click="delClient(item.clientId)" round>删除</el-button>
          <el-button @click="liaison(item)" round>联系人</el-button>
          <el-button @click="details(item)" round>详情</el-button>
          <el-button @click="record(item)" round>交易记录</el-button>
          <el-button @click="order(item)" round>订单管理</el-button>
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
  name: 'ClientmanagesystemPageClients',
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
        pageSize: 20,
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
      httpRequest.get("/clientservice/client/queryClientByPage", {
        params: {
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize,
          clientId: this.client.clientId,
          clientName: this.client.clientName,
          clientDegree: this.client.clientDegree,
          clientDistrict: this.client.clientDistrict
        }
      }).then(response => {
        if (response.data.resCode === "000000") {
          this.pageResult = response.data.data
        }
      })
    },

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
              this.query();
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
        path: '/client/ContactRecord/pageContactRecord',
        query: item
      })
    },
    order(item) {
      this.$router.push({
        path: '/client/HistoricalOrder/pageHistoricalOrder',
        query: item
      })
    },
    warn() {
      httpRequest.get('/clientservice/client/warn', {}).then(response => {
        if (response.data.resCode === "000000") {
          alert(response.data.data);
        }
      });
    },

    exportExcel() {
      const a = document.createElement("a");
      a.href = `${this.$baseurl}/clientservice/client/exportExcel`
      if (this.client.clientId !== null) {
        +"?clientId=" + this.client.clientId
      }
      if (this.client.clientName !== null) {
        +"&clientName=" + this.client.clientName
      }
      if (this.client.clientDegree !== null) {
        +"&clientDegree=" + this.client.clientDegree
      }
      if (this.client.clientDistrict !== null) {
        +"&clientDistrict=" + this.client.clientDistrict
      }
      if (this.pageResult.pageNum !== null) {
        +"&pageNum=" + this.pageResult.pageNum
      }
      if (this.pageResult.pageSize !== null) {
        +"&pageSize=" + this.pageResult.pageSize;
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

<style lang="less" scoped>


</style>