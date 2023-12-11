<template>
    <div>
        <table>
            <tr>
                <td>编号</td>
                <td>
                    <input type="text" disabled>
                </td>
            </tr>
            <tr>
                <td>客户名称</td>
                <td>
                    <input type="text" v-model="salesOpportunitie.clientName">
                </td>
            </tr>
            <tr>
                <td>机会来源</td>
                <td>
                    <input type="text" v-model="salesOpportunitie.sourcesOfOpportunities">
                </td>
            </tr>
            <tr>
                <td>成功几率（%）</td>
                <td>
                    <input type="text" v-model="salesOpportunitie.successfulProbability">
                </td>
            </tr>
            <tr>
                <td>概要</td>
                <td>
                    <input type="text" v-model="salesOpportunitie.summary">
                </td>
            </tr>
            <tr>
                <td>联系人</td>
                <td>
                    <input type="text" v-model="salesOpportunitie.liaison">
                </td>
            </tr>
            <tr>
                <td>联系人电话</td>
                <td>
                    <input type="text" v-model="salesOpportunitie.liaisonPhone">
                </td>
            </tr>
            <tr>
                <td>机会描述</td>
                <td>
                    <input type="text" v-model="salesOpportunitie.opportunityDescription">
                </td>
            </tr>
            <tr>
                <td>创建人</td>
                <td>
                    <input disabled type="text" v-model="salesOpportunitie.founder">
                </td>
            </tr>
            <tr>
                <td>创建时间</td>
                <td>
                    <input type="text" disabled>
                </td>
            </tr>
            <tr>
                <td>指派给</td>
                <td>
                    <select name="" id="" disabled>
                        <option value="" disabled>白大奶发骚了</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>指派时间</td>
                <td>
                    <input type="text" disabled>
                </td>
            </tr>
            <tr>
                <td colspan="2">
                    <button @click="create()">新建</button>
                </td>
            </tr>

        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemCreateSales',

    data() {
        return {
            salesOpportunitie: {
                clientId: null,
                clientName: null,
                sourcesOfOpportunities: null,
                successfulProbability: null,
                summary: null,
                liaison: null,
                liaisonPhone: null,
                opportunityDescription: null,
                founder: sessionStorage.getItem('username'),
                creationTime: null,
                principal: null,
                delegationTime: null
            },

            userNames: []
        };
    },

    mounted() {
        httpRequest.get('/userservice/user/queryAll', {
            params: {

            }
        })
            .then((response) => {
                this.userNames = response.data.data;
            });
    },

    methods: {
        create() {
            httpRequest.post('/saleservice/sale/createSales', this.salesOpportunitie)
                .then((response) => {

                    if (response.data.resCode ==="000000") {
                        alert(response.data.data);
                        this.$router.push('/salesOpportunities/pageSales')
                    } else {
                        alert(response.data.resDesc);
                    }

                });
        }
    },
};
</script>

<style lang="scss" scoped></style>