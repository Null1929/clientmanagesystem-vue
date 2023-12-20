<template>
    <div>
        <table>
            <tr>
                <td>年份</td>
                <td>
                    <select name="" id="" v-model="year">
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td><el-button @click="query()">查询</el-button></td>
            </tr>

            <tr>
                <td>编号</td>
                <td>条目</td>
                <td>服务数量</td>
            </tr>

            <tr v-for="(item, index) in serviceTypeList" :key="item">
                <td>{{ index + 1 }}</td>
                <td>{{item.serverType}}</td>
                <td>{{ item.serverNumber }}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageClientServiceAnalysis',

    data() {
        return {
            year: null,
            serviceTypeList: [],
        };
    },

    mounted() {
        httpRequest.get('/statisticalanalysisservice/statisticalAnalysis/queryClientService', {
            params: {
                year: null,
            }
        }).then((response) => {
            this.serviceTypeList = response.data.data;
        }).catch((err) => {

        });
    },

    methods: {
        query() {
            httpRequest.get('/statisticalanalysisservice/statisticalAnalysis/queryClientService', {
                params: {
                    year: this.year,
                }
            }).then((response) => {
                this.serviceTypeList = response.data.data;
            });
        }
    },
};
</script>

<style lang="scss" scoped></style>