<template>
    <div>
        <table>
            <tr>
                <td><el-button @click="addLiaison()">新建联系人</el-button></td>
            </tr>
            <tr>
                <td>客户编号</td>
                <td>{{ clRsult.clientId }}</td>
            </tr>
            <tr>
                <td>客户名称</td>
                <td>{{ clRsult.clientName }}</td>
            </tr>

            <tr>
                <td>姓名</td>
                <td>性别</td>
                <td>职位</td>
                <td>办公电话</td>
                <td>手机</td>
                <td>备注</td>
                <td>操作</td>
            </tr>
            <tr v-for="item in clRsult.liaisonList" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.sex }}</td>
                <td>{{ item.position }}</td>
                <td>{{ item.officePhone }}</td>
                <td>{{ item.phone }}</td>
                <td>{{ item.notes }}</td>
                <td>
                    <el-button @click="updateLiaison(item)">修改</el-button>
                    <el-button @click="delLiaison(item.phone)">删除</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageLiaison',

    data() {
        return {
            clRsult: {
                clientId: null,
                clientName: null,
                liaisonList: []
            },
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
        httpRequest.get('/clientservice/clientLiaison/liaison', {
            params: {

            }
        })
            .then((response) => {
                this.clRsult.clientId = response.data.clientId,
                    this.clRsult.clientName = response.data.clientName,
                    this.clRsult.liaisonList = response.data.data
            });
    },

    methods: {
        addLiaison() {
            httpRequest.post('/clientservice/clientLiaison/catcheData', {
                clientId: this.clRsult.clientId,
                clientName: this.clRsult.clientName,

            }).then(response => {

                this.$router.push('/client/liaison/createLiaison')
            });
        },
        updateLiaison(liaison) {
            this.$router.push({
                path: '/client/liaison/updateLiaison', query: {
                    clientId: this.clRsult.clientId,
                    clientName: this.clRsult.clientName,
                    name: liaison.name,
                    sex: liaison.sex,
                    position: liaison.position,
                    officePhone: liaison.officePhone,
                    phone: liaison.phone,
                    notes: liaison.notes,
                }
            })
        },
        delLiaison(phone) {
            httpRequest.get('/clientservice/clientLiaison/delLiaison', {
                params: {
                    phone: phone,
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