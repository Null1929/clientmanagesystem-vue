<template>
    <div>
        <table>
            <tr>
                <td>客户</td>
                <td><input type="text" v-model="clientServer.clientName"></td>
            </tr>
            <tr>
                <td>概要</td>
                <td><input type="text" v-model="clientServer.outline"></td>
            </tr>
            <tr>
                <td>服务类型</td>
                <td><input type="text" v-model="clientServer.serviceType"></td>
            </tr>
            <tr>
                <td>创建日期</td>
                <td><input type="date" v-model="clientServer.createTimeBegan">
                    -
                    <input type="date" v-model="clientServer.createTimeEnd">
                </td>
            </tr>
            <tr>
                <td>状态</td>
                <td>
                    <input type="text" disabled v-model="clientServer.status" placeholder="已分配">
                </td>
            </tr>
            <tr>
                <td colspan="2"><el-button @click="queryClientServer()">查询</el-button></td>
            </tr>
        </table>
        <table>
            <tr>
                <td>编号</td>
                <td>客户</td>
                <td>概要</td>
                <td>服务类型</td>
                <td>创建人</td>
                <td>创建日期</td>
                <td>操作</td>
            </tr>

            <tr v-for="item in clientServerList" :key="item">
                <td>{{ item.serverId }}</td>
                <td>{{ item.clientName }}</td>
                <td>{{ item.outline }}</td>
                <td>{{ item.serviceType }}</td>
                <td>{{ item.creator }}</td>
                <td>{{ item.createTime }}</td>
                <td></td>
                <td>
                    <el-button @click="processing(item)">处理</el-button>
                </td>
            </tr>

        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageProcessClientServer',

    data() {
        return {
            clientServer: {
                serverId: null,
                serviceType: null,
                outline: null,
                clientName: null,
                status: "已分配",
                serviceRequest: null,
                creator: null,
                createTime: null,
                createTimeBegan: null,
                createTimeEnd: null,
            },


            clientServerList: [],

            userList: []
        };
    },

    mounted() {
        httpRequest.get('/clientservice/clientServer/pageClientServerFinish', {
            params: {

            }
        }).then(response => {
            this.clientServerList = response.data.data
        });
    },

    methods: {
        queryClientServer() {
            httpRequest.post('/clientservice/clientServer/queryClientServer', {
                serviceType: this.clientServer.serviceType,
                outline: this.clientServer.outline,
                clientName: this.clientServer.clientName,
                status: this.clientServer.status,
                createTimeBegan: this.clientServer.createTimeBegan,
                createTimeEnd: this.clientServer.createTimeEnd

            }).then(response => {
                this.clientServerList = response.data.data
            });
        },
        processing(item) {
            this.$router.push({ path: '/clientServer/ProcessingClientServer', query: item })

        }
    },
};
</script>

<style lang="scss" scoped></style>