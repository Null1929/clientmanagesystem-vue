<template>
    <div>
        <table>
            <tr>
                <td>编号</td>
                <td><input type="text" disabled></td>
            </tr>
            <tr>
                <td>服务类型</td>
                <td>
                    <select name="" id="" v-model="clientServer.serviceType">
                        <option disabled value="">请选择</option>
                        <option :value="item" v-for="item in serviceTypeList" :key="item">{{ item }}</option>
                    </select>
                </td>
            </tr>
            <tr>
                <td>概要</td>
                <td><input type="text" v-model="clientServer.outline"></td>
            </tr>
            <tr>
                <td>客户</td>
                <td><input type="text" v-model="clientServer.clientName"></td>
            </tr>
            <tr>
                <td>状态</td>
                <td><input type="text" v-model="clientServer.status" disabled></td>
            </tr>
            <tr>
                <td>服务请求</td>
                <td><input type="text" v-model="clientServer.serviceRequest"></td>
            </tr>
            <tr>
                <td>创建人</td>
                <td><input disabled type="text" v-model="clientServer.creator"></td>
            </tr>
            <tr>
                <td>创建时间</td>
                <td><input type="text" v-model="clientServer.createTime" disabled></td>
            </tr>
            <tr>
                <td>
                    <el-button @click="save()">保存</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemCreateClientServer',

    data() {
        return {
            clientServer: {
                serverId: null,
                serviceType: '',
                outline: null,
                clientName: null,
                status: '新创建',
                serviceRequest: null,
                creator: sessionStorage.getItem('username'),
                createTime: null,
            },

            serviceTypeList: []
        };
    },

    mounted() {
        httpRequest.get('/databaseservice/dataBase/getServiceTypeByService').then(response => {
            this.serviceTypeList = response.data.data
        })
    },

    methods: {
        save() {
            httpRequest.post('/clientservice/clientServer/createClientServer', this.clientServer).then(response => {
                alert(response.data.msg);
                this.$router.push('/clientServer/pageClientServer')
            });
        }
    },
};
</script>

<style lang="scss" scoped></style>