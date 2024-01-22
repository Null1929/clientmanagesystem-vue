<template>
  <div>
    <table>
      <tr>
        <td>编号</td>
        <td>{{ clientServer.serverId }}</td>
      </tr>
      <tr>
        <td>服务类型</td>
        <td>{{ clientServer.serviceType }}</td>
      </tr>
      <tr>
        <td>概要</td>
        <td>{{ clientServer.outline }}</td>
      </tr>
      <tr>
        <td>客户</td>
        <td>{{ clientServer.clientName }}</td>
      </tr>
      <tr>
        <td>状态</td>
        <td>{{ clientServer.status }}</td>
      </tr>
      <tr>
        <td>服务请求</td>
        <td>{{ clientServer.serviceRequest }}</td>
      </tr>
      <tr>
        <td>创建人</td>
        <td>{{ clientServer.creator }}</td>
      </tr>
      <tr>
        <td>创建时间</td>
        <td>{{ clientServer.createTime }}</td>
      </tr>
      <tr>
        <td>分配给</td>
        <td>{{ clientServer.assignee }}</td>
      </tr>
      <tr>
        <td>分配时间</td>
        <td>{{ clientServer.assignTime }}</td>
      </tr>
      <tr>
        <td>服务处理</td>
        <td>
          <el-input type="text" v-model="clientServer.serviceProcessing" />
        </td>
      </tr>
      <tr>
        <td>处理人</td>
        <td>
          <el-input type="text" disabled v-model="clientServer.handler"/>
        </td>
      </tr>
      <tr>
        <td>处理时间</td>
        <td>
          <el-input type="text" v-model="clientServer.processingTime" disabled />
        </td>
      </tr>
      <tr>
        <td>
          <el-button @click="saveClientServer()" round>保存</el-button>
        </td>
      </tr>
    </table>

  </div>
</template>

<script>
import httpRequest from '@/request';

export default {
  name: 'ClientmanagesystemProcessingClientServer',

  data() {
    return {
      clientServer: {
        serverId: null,
        serviceType: null,
        outline: null,
        clientName: null,
        status: null,
        serviceRequest: null,
        creator: null,
        createTime: null,
        assignee: null,
        assignTime: null,
        serviceProcessing: null,
        handler: null,
        processingTime: null,
        createTimeBegan: null,
        createTimeEnd: null,
      },
    };
  },

  mounted() {
    this.clientServer = this.$route.query;
    this.clientServer.handler = sessionStorage.getItem('username');
  },

  methods: {
    saveClientServer() {
      httpRequest.post('/clientservice/clientServer/saveClientServer', this.clientServer)
          .then(response => {
            if (response.data.resCode === "000000") {
              alert(response.data.data);
              this.$router.push('/clientServer/PageProcessClientServer')
            } else {
              alert(response.data.resDesc)
            }
          });
    }
  },
};
</script>

<style lang="scss" scoped></style>