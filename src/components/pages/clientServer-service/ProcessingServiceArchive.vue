<template>
  <table-style>
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
        <td>{{ clientServer.serviceProcessing }}</td>
      </tr>
      <tr>
        <td>处理人</td>
        <td>{{ clientServer.handler }}</td>
      </tr>
      <tr>
        <td>处理时间</td>
        <td>{{ clientServer.processingTime }}</td>
      </tr>

      <tr>
        <td>处理结果</td>
        <td>{{ clientServer.processingResult }}</td>
      </tr>

      <tr>
        <td>客户满意度</td>
        <td>
          <el-rate
              v-model="clientServer.customerSatisfaction"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
          </el-rate>
        </td>
      </tr>
    </table>
  </table-style>
</template>

<script>
import TableStyle from "@/components/slot/tableStyle";
export default {
  name: 'ClientmanagesystemProcessingServiceArchive',
  components: {TableStyle},
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
        processingResult: null,
        customerSatisfaction: null,

        createTimeBegan: null,
        createTimeEnd: null,
      },
    };
  },

  mounted() {
    this.clientServer = this.$route.query;
    this.clientServer.customerSatisfaction = Number(this.$route.query.customerSatisfaction)
  },

  methods: {
    /**
     * 加一个返回功能
     */
  },
};
</script>

<style lang="scss" scoped></style>