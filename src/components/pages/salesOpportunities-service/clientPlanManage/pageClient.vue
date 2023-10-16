<template>
    <div>
        <table>
            <tr>
                <td>序号</td>
                <td>客户编号</td>
                <td>名称</td>
                <td>地区</td>
                <td>客户经理</td>
                <td>客户等级</td>
                <td>操作</td>
            </tr>

            <tr v-for="(item, index) in clientList" :key="item.clientId">
                <td>{{ index + 1 }}</td>
                <td>{{ item.clientId }}</td>
                <td>{{ item.clientName }}</td>
                <td>{{ item.clientDistrict }}</td>
                <td>{{ item.clientManager }}</td>
                <td>{{ item.clientDegree }}</td>
                <td>
                    <el-button @click="details(item)">详情</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageClient',

    data() {
        return {
            clientList: [],
        };
    },

    mounted() {
        httpRequest.get('/clientservice/client/pageClient', {
            params: {
                pageNum: 1,
                pageSize: 20
            }
        })
            .then((response) => {
                this.clientList = response.data.data
            });
    },

    methods: {
        details(item) {
            httpRequest.post('/saleservice/customerPlan/catcheData', item).then(response => {
                this.$router.push('/customerPlan/detailCustomerPlan')
            });
        }
    },
};
</script>

<style lang="scss" scoped></style>