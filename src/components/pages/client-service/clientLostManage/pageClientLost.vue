<template>
    <div>
        <table>
            <tr>
                <td>客户:</td>
                <td>
                    <input type="text" v-model="clientLost.clientName">
                </td>
                &nbsp;
                <td>客户经理:</td>
                <td>
                    <input type="text" v-model="clientLost.clientManager">
                </td>
                &nbsp;
                <td>状态:</td>
                <td>
                    <input type="text" v-model="clientLost.status">
                </td>
                &nbsp;
                <td>
                    <el-button @click="query()">查询</el-button>
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <td>编号</td>
                <td>客户</td>
                <td>客户经理</td>
                <td>上次下单时间</td>
                <td>确认流失时间</td>
                <td>状态</td>
                <td>操作</td>
            </tr>

            <tr v-for="(item, index) in clientLostList" :key="item.clientName">
                <td>{{ index + 1 }}</td>
                <td>{{ item.clientName }}</td>
                <td>{{ item.clientManager }}</td>
                <td>{{ item.lastOrderDate }}</td>
                <td>{{ item.lostTime }}</td>
                <td>{{ item.status }}</td>
                <td>
                    <el-button v-if="item.status == '未处理'" @click="reprieve(item, index)">暂缓流失</el-button>
                    <el-button v-if="item.status == '暂缓流失'" @click="confirmedLoss(item, index)">确认流失</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageClientLost',

    data() {
        return {
            clientLostList: [],

            clientLost: {
                clientId: null,
                clientName: null,
                clientManager: null,
                lastOrderDate: null,
                lostTime: null,
                status: null,
            }
        };
    },

    mounted() {
        httpRequest.get('/clientservice/clientLost/pageClientLost', {

        })
            .then((response) => {
                this.clientLostList = response.data.data
            });
    },

    methods: {
        query() {
            httpRequest.post('/clientservice/clientLost/queryClientLost', this.clientLost)
                .then((response) => {
                    this.clientLostList = response.data.data
                });
        },
        reprieve(item, index) {
            httpRequest.post('/clientservice/clientLost/catcheData', {
                index: index,
                clientId: item.clientId,
                clientName: item.clientName,
                clientManager: item.clientManager,
                lastOrderDate: item.lastOrderDate,
                lostTime: item.lostTime,
                reprieve: item.reprieve,
                status: item.status,
            })
                .then((response) => {
                    this.$router.push('/client/ClientLost/deferredLoss')
                });
        },
        confirmedLoss(item, index) {
            httpRequest.post('/clientservice/clientLost/catcheData', {
                index: index,
                clientId: item.clientId,
                clientName: item.clientName,
                clientManager: item.clientManager,
                lastOrderDate: item.lastOrderDate,
                lostTime: item.lostTime,
                reprieve: item.reprieve,
                status: item.status,
            })
                .then((response) => {
                    this.$router.push('/client/ClientLost/confirmedLoss')
                });
        }
    },
};
</script>

<style lang="scss" scoped></style>