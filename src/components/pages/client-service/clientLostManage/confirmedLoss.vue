<template>
    <div>
        <table>
            <tr>
                <td>编号</td>
                <td>{{ catcheClientLost.index + 1 }}</td>
            </tr>
            <tr>
                <td>客户</td>
                <td>{{ catcheClientLost.clientName }}</td>
            </tr>
            <tr>
                <td>客户经理</td>
                <td>{{ catcheClientLost.clientManager }}</td>
            </tr>
            <tr>
                <td>上次下单时间</td>
                <td>{{ catcheClientLost.lastOrderDate }}</td>
            </tr>
            <tr>
                <td>暂缓措施</td>
                <td>{{ catcheClientLost.reprieve }}</td>
            </tr>
            <tr>
                <td>流失原因</td>
                <td><input type="text" v-model="catcheClientLost.lostReason"></td>
            </tr>
            <tr>
                <td><button @click="save()">保存</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemConfirmedLoss',

    data() {
        return {
            catcheClientLost: {
                index: null,
                clientId: null,
                clientName: null,
                clientManager: null,
                lastOrderDate: null,
                lostTime: null,
                status: null,
                reprieve: null,
                lostReason: null,
            }
        };
    },

    mounted() {
        httpRequest.get('/clientservice/clientLost/getCatcheData', {
            params: {

            }
        })
            .then((response) => {
                this.catcheClientLost = response.data
            });
    },

    methods: {
        save() {
            if (this.catcheClientLost.tmpReprieve == null) {
                this.catcheClientLost.tmpReprieve = ''
            }
            httpRequest.post('/clientservice/clientLost/confirmedLoss', {
                clientId: this.catcheClientLost.clientId,
                clientName: this.catcheClientLost.clientName,
                clientManager: this.catcheClientLost.clientManager,
                lastOrderDate: this.catcheClientLost.lastOrderDate,
                lostTime: this.catcheClientLost.lostTime,
                status: "确认流失",
                reprieve: this.catcheClientLost.reprieve,
                lostReason: this.catcheClientLost.lostReason
            })
                .then((response) => {
                    alert(response.data.msg);
                    this.$router.push('/client/ClientLost/pageClientLost')
                });
        }
    },
};
</script>

<style lang="scss" scoped></style>