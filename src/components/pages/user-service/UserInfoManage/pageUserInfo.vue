<template>
  <table-style>
    <template #header>
      <el-button @click="create()">新增</el-button>
    </template>
    <table>
      <tr>
        <td>编号</td>
        <td>名称</td>
        <td>手机号</td>
        <td>工号</td>
        <td>身份</td>
        <td>账户等级</td>
        <td>操作</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.workId }}</td>
        <td>{{ item.identity }}</td>
        <td>{{ item.accountLevel }}</td>
        <td>
          <el-button @click="deleteById(item.id)">删除</el-button>
          <el-button @click="update(item)">编辑</el-button>
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
  name: 'ClientmanagesystemPageUserInfo',
  components: {TableStyle},
  data() {
    return {
      user: {
        id:null,
        phone: '',
        password: '',
        name: '',
        workId: null,
        identity: null,
        accountLevel: null
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
      httpRequest.get('/userservice/userInfo/queryUserInfo', {
        params: {
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize,
        }
      }).then((reponse) => {
        if (reponse.data.resCode === '000000') {
          this.pageResult = reponse.data.data
        }
      });
    },
    create() {
      this.$router.push("/userAdmin/userInfo/createUserInfo")
    },
    deleteById(id) {
      httpRequest.get('/userservice/userInfo/delUserInfo', {
        params: {
          id
        }
      }).then((reponse) => {
        if (reponse.data.resCode === "000000") {
          alert(reponse.data.data);
          this.query();
        } else {
          alert(reponse.data.resDesc);
          this.query();
        }
      });
    },
    update(item) {
      this.$router.push({
        path: "/userAdmin/userInfo/updateUserInfo",
        query: item
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
  },
};
</script>

<style lang="scss" scoped></style>