<template>
  <div>
    <table>
      <tr>
        <td>
          <label>编号:</label>
        </td>
        <td>
          <el-input type="text" disabled/>
        </td>
      </tr>
      <tr>
        <td>
          <label>客户名称:</label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.clientName"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>服务类型:</label>
        </td>
        <td>
          <el-select v-model="clientServer.serviceType" placeholder="请选择">
            <el-option
                v-for="target in serviceTypeList"
                :key="target.item"
                :label="target.itemValue"
                :value="target.itemValue">
            </el-option>
          </el-select>
        </td>
      </tr>
      <tr>
        <td>
          <label>概要:</label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.outline"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>服务请求:</label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.serviceRequest"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>状态:</label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.status" disabled/>
        </td>
      </tr>
      <tr>
        <td>
          <label>创建人:</label>
        </td>
        <td>
          <el-input disabled type="text" v-model="clientServer.creator"/>
        </td>
      </tr>
      <tr>
        <td>
          <label>创建时间:</label>
        </td>
        <td>
          <el-input type="text" v-model="clientServer.createTime" disabled/>
        </td>
      </tr>
      <tr>
        <td>
          <el-button @click="save()" round>保存</el-button>
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
    httpRequest.get('/databaseservice/dataDictionary/getServiceTypeByService').then(response => {
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
          alert(response.data.resDesc);
        }
      });
    }
  },
};
</script>

<style lang="scss" scoped></style>