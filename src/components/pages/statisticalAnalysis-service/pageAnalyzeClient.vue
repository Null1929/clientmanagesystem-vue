<template>
    <div>
        <table>
            <tr>
                <td>报表方式</td>
                <td>
                    <select name="" id="" v-model="reportMode">
                        <option value="1">按等级</option>
                        <option value="2">按信用度</option>
                        <option value="3">按满意度</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td><el-button @click="query()">查询</el-button></td>
            </tr>

            <tr>
                <td>编号</td>
                <td>等级</td>
                <td>客户数量</td>
            </tr>

            <tr v-for="(item, index) in clientDataList" :key="item[1]">
                <td>{{ index + 1 }}</td>
                <td>
                    <label v-if="item[3] == 1">普通客户</label>
                    <label v-else-if="item[3] == 2">重点开发客户</label>
                    <label v-else-if="item[3] == 3">大客户</label>
                    <label v-else-if="item[3] == 4">合作伙伴</label>
                    <label v-else-if="item[3] == 5">战略合作伙伴</label>
                </td>
                <td>{{ item[0] }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageAnalyzeClient',

    data() {
        return {
            reportMode: 1,

            clientDataList: [],
        };
    },

    mounted() {
        httpRequest.get('/statisticalanalysisservice/statisticalAnalysis/queryAnalyzeClient', {
            params: {
                reportMode: this.reportMode
            }
        }).then((response) => {
            this.clientDataList = response.data.data
        }).catch((err) => {

        });
    },

    methods: {
        query() {
            httpRequest.get('/statisticalanalysisservice/statisticalAnalysis/queryAnalyzeClient', {
                params: {
                    reportMode: this.reportMode
                }
            }).then((response) => {
                this.clientDataList = response.data.data
            }).catch((err) => {

            });
        }
    },
};
</script>

<style lang="scss" scoped></style>