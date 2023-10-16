<template>
    <div>
        <table>
            <tr>
                <td><el-button>帮助</el-button></td>
                <td><el-button @click="create()">新建</el-button></td>
                <td><el-button @click="query()">查询</el-button></td>
            </tr>
        </table>
        <table>
            <tr>
                <td>类别</td>
                <td>
                    <select name="" id="" v-model="dataDictionary.category">
                        <option disabled value="">请选择</option>
                        <option value="企业客户等级">企业客户等级</option>
                        <option value="服务类型">服务类型</option>
                    </select>
                </td>

                <td>条目</td>
                <td><input type="text" v-model="dataDictionary.item"></td>

                <td>值</td>
                <td><input type="text" v-model="dataDictionary.itemValue"></td>
            </tr>
        </table>
        <table>
            <tr>
                <td>编号</td>
                <td>类别</td>
                <td>条目</td>
                <td>值</td>
                <td>是否可编辑</td>
                <td>操作</td>
            </tr>

            <tr v-for="(item, index) in dataDictionaryList" :key="item.category">
                <td>{{ index + 1 }}</td>
                <td>{{ item.category }}</td>
                <td>{{ item.item }}</td>
                <td>{{ item.itemValue }}</td>
                <td>
                    <label v-if="item.edite == true">是</label>
                    <label v-else-if="item.edite == false">否</label>
                </td>
                <td>
                    <el-button @click="deleted(item.id)">删除</el-button>
                    &nbsp;&nbsp;
                    <el-button v-if="item.edite" @click="edite(item)">编辑</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageDataDictionary',

    data() {
        return {
            dataDictionaryList: [],

            dataDictionary: {
                id: null,
                category: '',
                item: null,
                itemValue: null,
                edite: null,
            },
        };
    },

    mounted() {
        httpRequest.get('/databaseservice/dataBase/queryDataDictionary', {
            params: {

            }
        }).then((response) => {
            this.dataDictionaryList = response.data.data
        }).catch((err) => {

        });;
    },

    methods: {
        create() {
            this.$router.push('/dataBase/DataDictionary/createDataDictionary')
        },
        deleted(id) {
            httpRequest.get('/databaseservice/dataBase/deleteDataDictionary', {
                params: {
                    id: id
                }
            }).then((response) => {
                alert(response.data.msg);
                window.location.reload();
            }).catch((err) => {

            });;
        },
        edite(item) {
            this.$router.push({ path: '/dataBase/DataDictionary/updateDataDictionary', query: item })
        },
        query() {
            httpRequest.post('/databaseservice/dataBase/queryDataByCondition', {
                category: this.dataDictionary.category,
                item: this.dataDictionary.item,
                itemValue: this.dataDictionary.itemValue,
            }).then((response) => {
                this.dataDictionaryList = response.data.data
            }).catch((err) => {

            });
        }
    },
};
</script>

<style lang="scss" scoped></style>