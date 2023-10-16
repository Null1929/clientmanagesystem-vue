<template>
    <div>
        <table>
            <tr>
                <td>客户编号</td>
                <td>{{ liaison.clientId }}</td>
            </tr>
            <tr>
                <td>客户名称</td>
                <td>{{ liaison.clientName }}</td>
            </tr>

            <tr>
                <td>姓名</td>
                <td><input type="text" v-model="liaison.name"></td>
            </tr>
            <tr>
                <td>性别</td>
                <td><input type="text" v-model="liaison.sex"></td>
            </tr>
            <tr>
                <td>职位</td>
                <td><input type="text" v-model="liaison.position"></td>
            </tr>
            <tr>
                <td>办公电话</td>
                <td><input type="text" v-model="liaison.officePhone"></td>
            </tr>
            <tr>
                <td>手机</td>
                <td><input type="text" v-model="liaison.phone"></td>
            </tr>
            <tr>
                <td>备注</td>
                <td><input type="text" v-model="liaison.notes"></td>
            </tr>
            <tr>
                <td><el-button @click="updateLiaison()">修改</el-button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemUpdateLiaison',

    data() {
        return {
            liaison: {
                clientId: null,
                clientName: null,
                name: null,
                sex: null,
                position: null,
                officePhone: null,
                phone: null,
                notes: null,
            }
        };
    },

    mounted() {
        this.liaison = this.$route.query
    },

    methods: {
        updateLiaison() {
            httpRequest.post('/clientservice/clientLiaison/updateLiaison', this.liaison)
                .then((response) => {
                    alert(response.data.msg);
                    httpRequest.post('/clientLiaison/catcheData', {
                        clientId: this.liaison.clientId,
                        clientName: this.liaison.clientName,

                    }).then(response => {
                        this.$router.push('/client/liaison/pageLiaison')
                    });
                });
        }
    },
};
</script>

<style lang="scss" scoped></style>