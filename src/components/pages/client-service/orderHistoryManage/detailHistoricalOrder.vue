<template>
    <div>
        <table>
            <tr>
                <td>订单编号</td>
                <td>{{ order.orderId }}</td>
            </tr>
            <tr>
                <td>日期</td>
                <td>{{ order.orderDate.replace(/-/, '年').replace(/-/, '月').concat("日") }}</td>
            </tr>
            <tr>
                <td>送货地址</td>
                <td>{{ order.address }}</td>
            </tr>
            <tr>
                <td>状态</td>
                <td>{{ order.status }}</td>
            </tr>
            <tr>
                <td>总金额（元）</td>
                <td>{{ order.totalAmount }}</td>
            </tr>

            <tr>
                <td>商品</td>
                <td>数量</td>
                <td>单位</td>
                <td>单价（元）</td>
                <td>金额（元）</td>
            </tr>

            <tr v-for="item in productList" :key="item.productName">
                <td>{{ item.productName }}</td>
                <td>{{ item.productNumber }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.price }}</td>
                <td>{{ item.productNumber * item.price }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemDetailHistoricalOrder',

    data() {
        return {
            order: {
                orderId: null,
                clientId: null,
                orderDate: null,
                address: null,
                status: null,
                totalAmount: null
            },

            productList: [],
        };
    },

    mounted() {
        httpRequest.get('/clientservice/clientOrder/getOrderDetail', {

        }).then(response => {
            this.productList = response.data.orderDetailList,
                this.order = response.data.clientOrder
        });
    },

    beforeUpdate() {
        let tag = 0;
        for (let i = 0; i < this.productList.length; i++) {
            tag += this.productList[i].productNumber * this.productList[i].price;
        }
        console.log(tag)
        this.order.totalAmount = tag;
    },

    methods: {

    },
};
</script>

<style lang="scss" scoped></style>