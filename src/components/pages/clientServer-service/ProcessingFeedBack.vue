<template>
    <div>
        <table>
            <tr>
                <td>编号</td>
                <td>{{ clientServer.serverId }}</td>
            </tr>
            <tr>
                <td>服务类型</td>
                <td>{{ clientServer.serviceType }}</td>
            </tr>
            <tr>
                <td>概要</td>
                <td>{{ clientServer.outline }}</td>
            </tr>
            <tr>
                <td>客户</td>
                <td>{{ clientServer.clientName }}</td>
            </tr>
            <tr>
                <td>状态</td>
                <td>{{ clientServer.status }}</td>
            </tr>
            <tr>
                <td>服务请求</td>
                <td>{{ clientServer.serviceRequest }}</td>
            </tr>
            <tr>
                <td>创建人</td>
                <td>{{ clientServer.creator }}</td>
            </tr>
            <tr>
                <td>创建时间</td>
                <td>{{ clientServer.createTime }}</td>
            </tr>
            <tr>
                <td>分配给</td>
                <td>{{ clientServer.assignee }}</td>
            </tr>
            <tr>
                <td>分配时间</td>
                <td>{{ clientServer.assignTime }}</td>
            </tr>
            <tr>
                <td>服务处理</td>
                <td>{{ clientServer.serviceProcessing }}</td>
            </tr>
            <tr>
                <td>处理人</td>
                <td>{{ clientServer.handler }}</td>
            </tr>
            <tr>
                <td>处理时间</td>
                <td>{{ clientServer.processingTime }}</td>
            </tr>

            <tr>
                <td>处理结果</td>
                <td><input type="text" v-model="clientServer.processingResult"></td>
            </tr>

            <tr>
                <td>客户满意度</td>
                <td>
                    <select name="" id="" v-model="clientServer.customerSatisfaction">
                        <option value="null" disabled>请选择</option>
                        <option value="1">☆</option>
                        <option value="2">☆☆</option>
                        <option value="3">☆☆☆</option>
                        <option value="4">☆☆☆☆</option>
                        <option value="5">☆☆☆☆☆</option>
                    </select>
                </td>
            </tr>

            <tr>
                <td><el-button @click="saveClientServer()">保存</el-button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemProcessingFeedBack',

    data() {
        return {
            clientServer: {
                serverId: null,
                serviceType: null,
                outline: null,
                clientName: null,
                status: null,
                serviceRequest: null,
                creator: null,
                createTime: null,
                assignee: null,
                assignTime: null,
                serviceProcessing: null,
                handler: null,
                processingTime: null,
                processingResult: null,
                customerSatisfaction: null,

                createTimeBegan: null,
                createTimeEnd: null,
            },
        };
    },

    mounted() {
        this.clientServer = this.$route.query
    },

    methods: {
        saveClientServer() {
            if (this.clientServer.customerSatisfaction == null) {
                this.clientServer.customerSatisfaction = 0
            }
            httpRequest.post('/clientservice/clientServer/saveFeedBack', this.clientServer)
                .then(response => {
                    alert(response.data.msg);
                    this.$router.push('/clientServer/PageFeedBack')
                });
        }
    },
};
</script>

<style lang="scss" scoped></style>