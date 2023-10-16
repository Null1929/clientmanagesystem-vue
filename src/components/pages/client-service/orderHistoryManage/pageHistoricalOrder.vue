<template>
    <div>
        <table>
            <tr>
                <td>客户编号</td>
                <td>{{ client.clientId }}</td>
            </tr>
            <tr>
                <td>客户名称</td>
                <td>{{ client.clientName }}</td>
            </tr>

            <tr>
                <td>订单编号</td>
                <td>日期</td>
                <td>送货地址</td>
                <td>状态</td>
                <td>操作</td>
            </tr>

            <tr v-for="item in clientOrderList" :key="item.orderId">
                <td>{{ item.orderId }}</td>
                <td>{{ item.orderDate.replace(/-/, '年').replace(/-/, '月').concat("日") }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.status }}</td>
                <td><button @click="detail(item)">详情</button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageHistoricalOrder',

    data() {
        return {
            client: {
                clientId: null,
                clientName: null
            },

            clientOrderList: [],

            order: {
                orderId: null,
                clientId: null,
                orderDate: null,
                address: null,
                status: null,
            }
        };
    },

    mounted() {
        httpRequest.get('/clientservice/clientOrder/pageHystoricalOrder', {
            params: {

            }
        }).then(response => {
            this.client = response.data.client,
                this.clientOrderList = response.data.clientOrderList
        });
    },

    methods: {
        detail(item) {
            httpRequest.post('/clientservice/clientOrder/catcheClientOrder', item
            ).then(response => {
                this.$router.push('/client/HistoricalOrder/detailHistoricalOrder')
            });
        }
    },
};
</script>

<style lang="scss" scoped></style>