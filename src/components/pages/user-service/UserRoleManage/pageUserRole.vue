<template>
  <table-style>
    <table>
      <tr>
        <td>ID:</td>
        <td>
          <el-input v-model="user.id"/>
        </td>
        <td style="padding-left: 50px">账号:</td>
        <td>
          <el-input v-model="user.username"/>
        </td>
        <td style="padding-left: 30px">
          <el-button @click="query()" round>搜索</el-button>
        </td>
      </tr>
    </table>
    <br>
    <table style="border-spacing: 20px 0">
      <tr>
        <td>ID</td>
        <td>姓名</td>
        <td>账号</td>
        <td>状态</td>
        <td>是否过期</td>
        <td>是否锁定</td>
        <td>凭证是否过期</td>
        <td>账户等级</td>
        <td>账户身份</td>
        <td>操作</td>
      </tr>
      <br/>
      <tr v-for="item in pageResult.result" :key="item.id" style="line-height: 50px">
        <td style='font-family:  "微软雅黑",system-ui'>{{ item.id }}</td>
        <td style='font-family:  "微软雅黑",system-ui'>{{ item.name }}</td>
        <td style='font-family:  "微软雅黑",system-ui'>{{ item.username }}</td>
        <td>
          <el-button v-if="item.enabled" type="success" icon="el-icon-check" circle disabled></el-button>
          <el-button v-if="!item.enabled" type="danger" icon="el-icon-close" circle disabled></el-button>
        </td>
        <td>
          <el-button v-if="item.accountNonExpired" type="success" icon="el-icon-check" circle disabled></el-button>
          <el-button v-if="!item.accountNonExpired" type="danger" icon="el-icon-close" circle disabled></el-button>
        </td>
        <td>
          <el-button v-if="item.accountNonLocked" type="success" icon="el-icon-check" circle disabled></el-button>
          <el-button v-if="!item.accountNonLocked" type="danger" icon="el-icon-close" circle disabled></el-button>
        </td>
        <td>
          <el-button v-if="item.credentialsNonExpired" type="success" icon="el-icon-check" circle disabled></el-button>
          <el-button v-if="!item.credentialsNonExpired" type="danger" icon="el-icon-close" circle disabled></el-button>
        </td>
        <td>{{ item.accountLevel }}</td>
        <td>{{ item.userRole }}</td>
        <td>
          <el-button icon="el-icon-delete" @click="deleteById(item.id)" round>删除</el-button>
          <el-button icon="el-icon-edit" @click="update(item)" round>编辑</el-button>
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
  name: 'ClientmanagesystemPageUserRole',
  components: {TableStyle},
  data() {
    return {
      user: {
        id: null,
        name: null,
        username: null,
        enabled: null,
        accountNonExpired: null,
        accountNonLocked: null,
        credentialsNonExpired: null,
        accountLevel: null,
        userRole: null
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
      if (this.user.username === '') {
        this.user.username = null;
      }
      httpRequest.get('/userservice/userRole/queryUserRole', {
        params: {
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize,
          id: this.user.id,
          username: this.user.username,
        }
      }).then((reponse) => {
        if (reponse.data.resCode === '000000') {
          this.pageResult = reponse.data.data
        }
      });
    },
    deleteById(id) {
      httpRequest.delete('/userservice/userRole/delUserRole', {
        params: {
          id
        }
      }).then((reponse) => {
        if (reponse.data.resCode === "000000") {
          alert(reponse.data.data);
        } else {
          alert(reponse.data.resDesc);
        }
        this.query();
      });
    },
    update(item) {
      this.$router.push({
        path: "/userAdmin/userRole/updateUserRole",
        query: {
          id: item.id,
          name: item.name,
          username: item.username,
          enabled: item.enabled,
          accountNonExpired: item.accountNonExpired,
          accountNonLocked: item.accountNonLocked,
          credentialsNonExpired: item.credentialsNonExpired,
          accountLevel: item.accountLevel,
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
  },
};
</script>

<style lang="scss" scoped></style>