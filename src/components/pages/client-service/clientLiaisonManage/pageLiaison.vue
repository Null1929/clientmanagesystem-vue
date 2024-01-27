<template>
  <div>
    <table>
      <tr>
        <td>
          <el-button @click="addLiaison()" round>新建</el-button>
        </td>
      </tr>
      <tr>
        <td>客户编号</td>
        <td>{{ client.clientId }}</td>
      </tr>
      <tr>
        <td>客户名称</td>
        <td>{{ client.clientName }}</td>
      </tr>
    </table>
    <table style="width: auto;border-spacing: 50px 0">
      <tr>
        <td>姓名</td>
        <td>性别</td>
        <td>职位</td>
        <td>办公电话</td>
        <td>手机</td>
        <td>备注</td>
        <td>操作</td>
      </tr>
      <tr v-for="item in liaisonList" :key="item.name" style="line-height: 50px">
        <td>{{ item.name }}</td>
        <td>{{ item.sex }}</td>
        <td>{{ item.position }}</td>
        <td>{{ item.officePhone }}</td>
        <td>{{ item.phone }}</td>
        <td>{{ item.notes }}</td>
        <td>
          <el-button @click="updateLiaison(item)" round>修改</el-button>
          <el-button @click="delLiaison(item.id)" round>删除</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemPageLiaison',

  data() {
    return {
      client: {
        clientId: null,
        clientName: null,
      },

      liaisonList: [],

      liaison: {
        id: null,
        clientId: null,
        clientName: null,
        name: null,
        sex: null,
        position: null,
        officePhone: null,
        phone: null,
        notes: null,
      }
    };
  },

  mounted() {
    this.client = this.$route.query;
    httpRequest.get('/clientservice/clientLiaison/liaison', {
      params: {
        clientId: this.client.clientId
      }
    })
        .then((response) => {
          this.liaisonList = response.data.data
        });
  },

  methods: {
    addLiaison() {
      this.$router.push({
        path: '/client/liaison/createLiaison',
        query: this.client
      })
    },
    updateLiaison(liaison) {
      this.$router.push({
        path: '/client/liaison/updateLiaison',
        query: {
          client: JSON.stringify(this.client),
          liaison: JSON.stringify(liaison)
        }
      })
    },
    delLiaison(id) {
      httpRequest.get('/clientservice/clientLiaison/delLiaison', {
        params: {
          id: id
        }

      }).then(response => {
        alert(response.data.data);
        window.location.reload();
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>