<template>
  <div>
    <table>
      <tr>
        <td>
          <el-label>编号</el-label>
        </td>
        <td>
          <el-input type="text" disabled/>
        </td>
      </tr>
      <tr>
        <td>
          <el-label>服务类型</el-label>
        </td>
        <td>
          <el-select name="" id="" v-model="clientServer.serviceType">
            <el-option disabled value="">请选择</el-option>
            <el-option :value="item" v-for="item in serviceTypeList" :key="item">{{ item }}</el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>
          <el-label>概要</el-label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.outline"/>
        </td>
      </tr>
      <tr>
        <td>
          <el-label>客户</el-label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.clientName"/>
        </td>
      </tr>
      <tr>
        <td>
          <el-label>状态</el-label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.status" disabled/>
        </td>
      </tr>
      <tr>
        <td>
          <el-label>服务请求</el-label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.serviceRequest"/>
        </td>
      </tr>
      <tr>
        <td>
          <el-label>创建人</el-label>
        </td>
        <td>
          <el-input disabled type="text" v-model="clientServer.creator"/>
        </td>
      </tr>
      <tr>
        <td>
          <el-label>创建时间</el-label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.createTime" disabled/>
        </td>
      </tr>
      <tr>
        <td>
          <el-button @click="save()">保存</el-button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemCreateClientServer',

  data() {
    return {
      clientServer: {
        serverId: null,
        serviceType: '',
        outline: null,
        clientName: null,
        status: '新创建',
        serviceRequest: null,
        creator: sessionStorage.getItem('username'),
        createTime: null,
      },

      serviceTypeList: []
    };
  },

  mounted() {
    httpRequest.get('/databaseservice/dataBase/getServiceTypeByService').then(response => {
      this.serviceTypeList = response.data.data
    })
  },

  methods: {
    save() {
      httpRequest.post('/clientservice/clientServer/createClientServer', this.clientServer).then(response => {
        if (response.data.resCode === "000000") {
          alert(response.data.data);
          this.$router.push('/clientServer/pageClientServer')
        } else {
          window.location.reload();
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>