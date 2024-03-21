<template>
  <div>
    <table>
      <tr>
        <td>客户编号</td>
        <td>{{ client.clientId }}</td>
      </tr>
      <tr>
        <td>名称</td>
        <td>{{ client.clientName }}</td>
      </tr>
      <tr>
        <td>时间</td>
        <td>地点</td>
        <td>概要</td>
        <td>详细信息</td>
        <td>备注</td>
        <td>操作</td>
      </tr>
      <tr>
        <td><input type="date" v-model="contactRecord.contactDate"></td>
        <td><input type="text" v-model="contactRecord.address"></td>
        <td><input type="text" v-model="contactRecord.summary"></td>
        <td><input type="text" v-model="contactRecord.detail"></td>
        <td><input type="text" v-model="contactRecord.note"></td>
        <td>
          <button @click="update()">修改</button>
        </td>
      </tr>
    </table>
  </div>
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

    };
  },

  mounted() {
    this.client = JSON.parse(this.$route.query.client);
        this.contactRecord = JSON.parse(this.$route.query.item);
  },

  methods: {
    update() {
      httpRequest.put("/clientservice/contactRecord/updateContactRecord", {
        clientId: Number(this.contactRecord.clientId),
        id: Number(this.contactRecord.id),
        contactDate: this.contactRecord.contactDate,
        address: this.contactRecord.address,
        summary: this.contactRecord.summary,
        detail: this.contactRecord.detail,
        note: this.contactRecord.note,
      }).then(response => {
        if (response.data.resCode === "000000") {
          alert(response.data.data);
          this.$router.push({
            path: "/client/ContactRecord/pageContactRecord",
            query: this.client
          })
        } else {
          alert(response.data.resDesc);
          window.location.reload();
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped></style>