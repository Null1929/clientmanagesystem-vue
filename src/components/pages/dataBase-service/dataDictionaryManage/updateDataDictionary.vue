<template>
    <div>
        <table>
            <tr>
                <td><el-button @click="back()">返回</el-button></td>
                <td><el-button @click="updateDataDictionary()">保存</el-button></td>
            </tr>
        </table>

        <table>
            <tr>
                <td>编号</td>
                <td>
                    <input type="text" disabled v-model="dataDictionary.id">
                </td>
            </tr>
            <tr>
                <td>类别</td>
                <td>
                    <input type="text" v-model="dataDictionary.category">
                </td>
            </tr>
            <tr>
                <td>条目</td>
                <td>
                    <input type="text" v-model="dataDictionary.item">
                </td>
            </tr>
            <tr>
                <td>值</td>
                <td>
                    <input type="text" v-model="dataDictionary.itemValue">
                </td>
            </tr>
            <tr>
                <td>是否可编辑</td>
                <td>
                    <input type="checkbox" v-model="dataDictionary.edite">
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemUpdateDataDictionary',

    data() {
        return {
            dataDictionary: {
                id: null,
                category: null,
                item: null,
                itemValue: null,
                edite: null,
            },
        };
    },

    mounted() {
        this.dataDictionary = this.$route.query
    },

    methods: {
        back() {
            this.$router.push('/dataBase/DataDictionary/pageDataDictionary')
        },
        updateDataDictionary() {
            httpRequest.post('/databaseservice/dataBase/updateDataDictionary', {
                id: this.dataDictionary.id,
                category: this.dataDictionary.category,
                item: this.dataDictionary.item,
                itemValue: this.dataDictionary.itemValue,
                edite: this.dataDictionary.edite,

            }).then((response) => {
                alert(response.data.msg);
                if (response.data.code == 1) {
                    this.$router.push('/dataBase/DataDictionary/pageDataDictionary')
                } else {
                    window.location.reload();
                }
            }).catch((err) => {

            });;
        }
    },
};
</script>

<style lang="scss" scoped></style>