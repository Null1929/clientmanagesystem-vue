<template>
    <div>
        <table>
            <tr>
                <td>
                    <el-button @click="add()">新建客户</el-button>
                </td>
                <td>
                    <el-button @click="warn()">流失预警</el-button>
                </td>
            </tr>
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
                    <el-button @click="update(item)">修改</el-button>
                    <el-button @click="delOne(item.clientId)">删除</el-button>
                    <el-button @click="liaison(item)">联系人</el-button>
                    <el-button @click="details(item)">详情</el-button>
                    <el-button @click="record(item)">交往记录</el-button>
                    <el-button @click="order(item)">历史订单</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageClients',

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
        add() {
            this.$router.push('/client/pageClients/createClient')
        },
        update(item) {
            httpRequest.post('/clientservice/client/update', item).then(response => {
                this.$router.push('/client/pageClients/updateClient')
            });
        },
        delOne(clientId) {
            httpRequest.get('/clientservice/client/delClient', {
                params: {
                    clientId: clientId,
                }
            })
                .then((response) => {
                    if (response.data.code == 1) {
                        alert(response.data.msg);
                        window.location.reload();
                    } else {
                        alert(response.data.msg);
                    }
                });

        },
        liaison(item) {
            httpRequest.post('/clientservice/clientLiaison/catcheData', {
                clientId: item.clientId,
                clientName: item.clientName,

            }).then(response => {
                this.$router.push('/client/liaison/pageLiaison')
            });
        },
        details(item) {
            this.$router.push({ path: '/client/detailClient', query: item })
        },
        record(item) {
            httpRequest.post('/clientservice/contactRecord/catcheData', item).then(response => {
                this.$router.push('/client/ContactRecord/pageContactRecord')
            });
        },
        order(item) {
            httpRequest.post('/clientservice/clientOrder/catcheData', item).then(response => {
                this.$router.push('/client/HistoricalOrder/pageHistoricalOrder')
            });
        },
        warn() {
            httpRequest.get('/clientservice/client/warn', {

            }).then(response => {
                alert(response.data.msg);
            });
        }
    },
};
</script>

<style lang="scss" scoped></style>