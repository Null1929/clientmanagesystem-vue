<template>
    <div>
        <table>
            <tr>
                <td>客户编号</td>
                <td>{{ client.clientId }}</td>
            </tr>
            <tr>
                <td>名称</td>
                <td>{{ client.clientName }}</td>
            </tr>
            <tr>
                <td>时间</td>
                <td>地点</td>
                <td>概要</td>
                <td>详细信息</td>
                <td>备注</td>
                <td>操作</td>
            </tr>
            <tr>
                <td><input type="date" v-model="contactRecord.contactDate"></td>
                <td><input type="text" v-model="contactRecord.address"></td>
                <td><input type="text" v-model="contactRecord.summary"></td>
                <td><input type="text" v-model="contactRecord.detail"></td>
                <td><input type="text" v-model="contactRecord.note"></td>
                <td><button @click="createContactRecord()">保存</button></td>
            </tr>
            <tr v-for="item in contactRecordList" :key="item.contactDate">
                <td>{{ item.contactDate.replace(/-/, '年').replace(/-/, '月').concat("日") }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.summary }}</td>
                <td>{{ item.detail }}</td>
                <td>{{ item.note }}</td>
                <td>
                    <button @click="updateCatche(item)">修改</button>
                    &nbsp;
                    &nbsp;
                    <button @click="delContactRecord(item.id)">删除</button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageContactRecord',

    data() {
        return {
            client: {
                clientId: null,
                clientName: null,
            },
            contactRecordList: [],
            contactRecord: {
                clientId: null,
                id: null,
                contactDate: null,
                address: null,
                summary: null,
                detail: null,
                note: null,
            }
        };
    },

    mounted() {
        httpRequest.get('/clientservice/contactRecord/pageContactRecord', {

        })
            .then((response) => {
                this.client = response.data.client,
                    this.contactRecordList = response.data.data
            });
    },

    methods: {
        createContactRecord() {
            httpRequest.post('/clientservice/contactRecord/createContactRecord', {
                clientId: this.client.clientId,
                id: null,
                contactDate: this.contactRecord.contactDate,
                address: this.contactRecord.address,
                summary: this.contactRecord.summary,
                detail: this.contactRecord.detail,
                note: this.contactRecord.note,

            })
                .then((response) => {
                    alert(response.data.msg);
                    window.location.reload();
                });
        },
        updateCatche(item) {
            httpRequest.post('/clientservice/contactRecord/updateCatche', {
                clientId: this.client.clientId,
                id: item.id,
                contactDate: item.contactDate,
                address: item.address,
                summary: item.summary,
                detail: item.detail,
                note: item.note,
            })
                .then((response) => {
                    this.$router.push('/contactRecord/updateContactRecord')
                });
        },
        delContactRecord(id) {
            httpRequest.get('/clientservice/contactRecord/delCustomerPlan', {
                params: {
                    id: id
                }
            })
                .then((response) => {
                    alert(response.data.msg)
                    window.location.reload();
                });
        }

    },
};
</script>

<style lang="scss" scoped></style>