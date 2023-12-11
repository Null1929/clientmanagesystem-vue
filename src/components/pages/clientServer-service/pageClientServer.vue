<template>
    <div>
        <table>
            <tr>
                <td>客户</td>
                <td><input type="text" v-model="clientServer.clientName"></td>

                <td>概要</td>
                <td><input type="text" v-model="clientServer.outline"></td>

                <td>服务类型</td>
                <td><input type="text" v-model="clientServer.serviceType"></td>

                <td>创建日期</td>
                <td><input type="date" v-model="clientServer.createTimeBegan">
                    -
                    <input type="date" v-model="clientServer.createTimeEnd">
                </td>

                <td>状态</td>
                <td><input type="text" disabled v-model="clientServer.status" placeholder="新创建"></td>

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
                <td>分配给</td>
                <td>操作</td>
            </tr>

            <tr v-for="item in clientServerList" :key="item.serverId">
                <td>{{ item.serverId }}</td>
                <td>{{ item.clientName }}</td>
                <td>{{ item.outline }}</td>
                <td>{{ item.serviceType }}</td>
                <td>{{ item.creator }}</td>
                <td>{{ item.createTime }}</td>
                <td><select name="" id="" v-model="item.assignee">
                        <option v-for="user in userList " :key="user.id">{{ user.name }}</option>
                    </select>
                    <el-button @click="distribution(item)">分配</el-button>
                </td>
                <td><el-button @click="del(item.serverId)">删除</el-button></td>
            </tr>

        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageClientServer',

    data() {
        return {
            clientServer: {
                serverId: null,
                serviceType: null,
                outline: null,
                clientName: null,
                status: '新创建',
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
        httpRequest.get('/clientservice/clientServer/pageClientServerNo', {
            params: {

            }
        }).then(response => {
            this.clientServerList = response.data.data
        });

        httpRequest.get('/clientservice/clientServer/getUsers', {
            params: {

            }
        }).then(response => {
            this.userList = response.data.data
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
        distribution(item) {
            httpRequest.post('/clientservice/clientServer/distribution', {
                serverId: item.serverId,
                serviceType: item.serviceType,
                outline: item.outline,
                clientName: item.clientName,
                status: item.status,
                serviceRequest: item.serviceRequest,
                creator: item.creator,
                createTime: item.createTime,
                assignee: item.assignee,
                assignTime: item.assignTime,
                serviceProcessing: item.serviceProcessing,
                handler: item.handler,
                processingTime: item.processingTime,

            }).then(response => {
                alert(response.data.msg);
                window.location.reload();
            });
        },
        del(serverId) {
            httpRequest.get('/clientservice/clientServer/delClientServer', {
                params: {
                    serverId: serverId,
                }
            }).then(response => {
                alert(response.data.msg);
                window.location.reload();
            });
        }
    },
};
</script>

<style lang="scss" scoped></style>