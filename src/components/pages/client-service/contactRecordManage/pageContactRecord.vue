<template>
  <table-style>
    <table>
      <tr>
        <td>客户编号</td>
        <td>{{ client.clientId }}</td>
      </tr>
      <tr>
        <td>名称</td>
        <td>{{ client.clientName }}</td>
      </tr>
    </table>
    <table style="width: auto;border-spacing: 10px 0">
      <tr>
        <td>时间</td>
        <td>地点</td>
        <td>概要</td>
        <td>详细信息</td>
        <td>备注</td>
        <td>操作</td>
      </tr>
      <tr>
        <td><el-input type="date" v-model="contactRecord.contactDate"/></td>
        <td><el-input type="text" v-model="contactRecord.address"/></td>
        <td><el-input type="text" v-model="contactRecord.summary"/></td>
        <td><el-input type="text" v-model="contactRecord.detail"/></td>
        <td><el-input type="text" v-model="contactRecord.note"/></td>
        <td>
          <el-button @click="createContactRecord()" round>保存</el-button>
        </td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.id" style="line-height: 50px">
        <td>{{ item.contactDate.replace(/-/, '年').replace(/-/, '月').concat("日") }}</td>
        <td>{{ item.address }}</td>
        <td>{{ item.summary }}</td>
        <td>{{ item.detail }}</td>
        <td>{{ item.note }}</td>
        <td>
          <el-button @click="updateCatche(item)" round>修改</el-button>
          <el-button @click="delContactRecord(item.id)" round>删除</el-button>
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
  name: 'ClientmanagesystemPageContactRecord',
  components: {TableStyle},
  data() {
    return {
      client: {
        clientId: null,
        clientName: null,
      },

      contactRecord: {
        clientId: null,
        id: null,
        contactDate: null,
        address: null,
        summary: null,
        detail: null,
        note: null,
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
    this.client = this.$route.query;
    this.pageContactRecord();
  },

  methods: {
    pageContactRecord() {
      httpRequest.get('/clientservice/contactRecord/pageContactRecord', {
        params: {
          clientId: this.client.clientId,
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize
        }
      })
          .then((response) => {
            this.pageResult = response.data.data
          });
    }
    ,
    createContactRecord() {
      httpRequest.post('/clientservice/contactRecord/createContactRecord', {
        id: null,
        clientId: this.client.clientId,
        contactDate: this.contactRecord.contactDate,
        address: this.contactRecord.address,
        summary: this.contactRecord.summary,
        detail: this.contactRecord.detail,
        note: this.contactRecord.note,

      })
          .then((response) => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.pageContactRecord();
            } else {
              alert(response.data.resDesc);
              this.pageContactRecord();
            }
          });
    },
    updateCatche(item) {
      this.$router.push({
        path: '/client/contactRecord/updateContactRecord',
        query: {
          client: JSON.stringify(this.client),
          item: JSON.stringify(item)
        }
      })
    },
    delContactRecord(id) {
      httpRequest.get('/clientservice/contactRecord/delCustomerPlan', {
        params: {
          id: id
        }
      })
          .then((response) => {
            if (response.data.resCode === "000000") {
              alert(response.data.data)
              this.pageContactRecord();
            } else {
              alert(response.data.resDesc);
              this.pageContactRecord();
            }
          });
    },

    /*******************************************/
    /**
     * 分页方法
     */
    firstPage() {
      this.pageResult.pageNum = 1;
      this.pageContactRecord();

    },
    lastPage() {
      if (this.pageResult.pageNum !== 1) {
        --this.pageResult.pageNum
        this.pageContactRecord();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum !== Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        ++this.pageResult.pageNum
        this.pageContactRecord();
      }
    },
    endPage() {
      this.pageResult.pageNum = Math.ceil(this.pageResult.total / this.pageResult.pageSize);
      this.pageContactRecord();
    },
    forward() {
      if (this.pageResult.forward >= 1 && this.pageResult.forward <= Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        this.pageResult.pageNum = this.pageResult.forward;
        this.pageContactRecord();
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