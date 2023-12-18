<template>
    <div>
        <table>
            <tr>
                <td>客户名称</td>
                <td><input type="text" v-model="clientName"></td>
            </tr>
            <tr>
                <td>年份</td>
                <td>
                    <select name="" id="" v-model="year">
                        <option disabled value="">请选择</option>
                        <option value="2015">2015</option>
                        <option value="2016">2016</option>
                        <option value="2017">2017</option>
                        <option value="2018">2018</option>
                        <option value="2019">2019</option>
                        <option value="2020">2020</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td colspan="2"><el-button @click="query()">查询</el-button></td>
            </tr>
            <tr>
                <td>编号</td>
                <td>客户名称</td>
                <td>订单总金额(元)</td>
            </tr>
            <template v-for="(item, index) in ClientList">
                <!-- <tr v-if="item.allOrders != 0" :key="item.clientName"> -->
                <tr :key="item.clientName">
                    <td>{{ index + 1 }}</td>
                    <td>{{ item.clientName }}</td>
                    <td>{{ item.allOrders }}</td>
                </tr>
            </template>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageStatisticalAnalysis',

    data() {
        return {
            ClientList: [],

            clientName: null,
            year: '',
        };
    },

    mounted() {
        httpRequest.get('/statisticalanalysisservice/statisticalAnalysis/pageStatisticalAnalysis').then((response) => {
            this.ClientList = response.data.data;
        }).catch((err) => {

        });
    },

    methods: {
        query() {
            httpRequest.get('/statisticalanalysisservice/statisticalAnalysis/yearStatisticalAnalysis', {
                params: {
                    clientName: this.clientName,
                    year: this.year,
                }
            }).then((response) => {

                this.ClientList = response.data.data;
                if (this.ClientList.length == 0) {
                    alert("无订单记录");
                }
            }).catch((err) => {

            });
        }
    },
};
</script>

<style lang="scss" scoped></style>