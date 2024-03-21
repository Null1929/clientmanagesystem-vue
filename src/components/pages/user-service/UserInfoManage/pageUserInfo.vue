<template>
  <table-style>
    <template #header>
      <table>
        <tr>
          <td colspan="2" style="text-align: left">
            <el-button @click="create()" round>新增</el-button>
          </td>
        </tr>
        <tr>
          <td>编号:</td>
          <td>
            <el-input v-model="user.id"/>
          </td>
          <td>手机号:</td>
          <td>
            <el-input v-model="user.phone"/>
          </td>
          <td>工号:</td>
          <td>
            <el-input v-model="user.workId"/>
          </td>
          <td>等级:</td>
          <td>
            <el-input v-model="user.accountLevel"/>
          </td>
          <td>
            <el-button @click="query" round>查询</el-button>
            <el-button @click="exportExcel()" round>汇出报表</el-button>
          </td>
        </tr>
      </table>
    </template>
    <table style="border-spacing: 50px 0">
      <tr>
        <td>编号</td>
        <td>姓名</td>
        <td>手机号</td>
        <td>工号</td>
        <td>身份</td>
        <td>账户等级</td>
        <td>操作</td>
      </tr>

      <tr v-for="item in pageResult.result" :key="item.id" style="line-height: 50px;">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.workId }}</td>
        <td>{{ item.identity }}</td>
        <td>{{ item.accountLevel }}</td>
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
  name: 'ClientmanagesystemPageUserInfo',
  components: {TableStyle},
  data() {
    return {
      user: {
        id: null,
        phone: null,
        password: null,
        name: null,
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
      if (this.user.phone === '') {
        this.user.phone = null
      }
      httpRequest.get('/userservice/userInfo/queryUserInfo', {
        params: {
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize,
          id: this.user.id,
          phone: this.user.phone,
          workId: this.user.workId,
          accountLevel: this.user.accountLevel
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
      httpRequest.delete('/userservice/userInfo/delUserInfo', {
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

    exportExcel() {
      const a = document.createElement("a");
      a.href = `${this.$baseurl}/userservice/userInfo/exportExcel`
      if (this.pageResult.pageNum !== null) {
        +"?pageNum=" + this.pageResult.pageNum
      }
      if (this.pageResult.pageSize !== null) {
        +"&pageSize=" + this.pageResult.pageSize;
      }
      if (this.user.id !== null) {
        +"id=" + this.user.id
      }
      if (this.user.phone !== null) {
        +"&phone=" + this.user.phone
      }
      if (this.user.workId !== null) {
        +"&workId=" + this.user.workId
      }
      if (this.user.accountLevel !== null) {
        +"&accountLevel=" + this.user.accountLevel
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