<template>
    <div>
        <table>
            <tr>
                <td>
                    <el-button>帮助</el-button>
                </td>
                <td>
                    <el-button @click="query()">查询</el-button>
                </td>
            </tr>
        </table>
        <table>
            <tr>
                <td>名称</td>
                <td><input type="text" v-model="productInfo.productName"></td>
            </tr>
            <tr>
                <td>型号</td>
                <td><input type="text" v-model="productInfo.productType"></td>
            </tr>
            <tr>
                <td>批次</td>
                <td><input type="text" v-model="productInfo.productDegree"></td>
            </tr>
        </table>

        <table>
            <tr>
                <td>编号</td>
                <td>名称</td>
                <td>型号</td>
                <td>等级/批次</td>
                <td>单位</td>
                <td>单价(元)</td>
                <td>备注</td>
            </tr>

            <tr v-for="(item, index) in pageResult.data" :key="item.productName">
                <td>{{ index + 1 }}</td>
                <td>{{ item.productName }}</td>
                <td>{{ item.productType }}</td>
                <td>{{ item.productDegree }}</td>
                <td>{{ item.unit }}</td>
                <td>{{ item.productPrice }}</td>
                <td>{{ item.notes }}</td>
            </tr>
        </table>
        <table>
            <tr>
                <td>共有{{ pageResult.allData }}条记录</td>
                <td>第{{ pageResult.nowPage }}/共{{ pageResult.allPages }}页</td>
                <td><el-button @click="firstPage()" id="firstPage">第一页</el-button></td>
                <td><el-button @click="lastPage()" id="lastPage">上一页</el-button></td>
                <td><el-button @click="nextPage()" id="nextPage">下一页</el-button></td>
                <td><el-button @click="endPage()" id="endPage">最后一页</el-button></td>
                <td>转到<input type="text" v-model="forw">页<el-button @click="forward()">Go</el-button></td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from '@/request';
export default {
    name: 'ClientmanagesystemPageProductInfo',

    data() {
        return {
            productInfo: {
                productName: null,
                productType: null,
                productDegree: null,
            },

            pageResult: {
                allData: null,
                allPages: null,
                nowPage: null,
                firstPage: null,
                endPage: null,
                pageSize: null,
                data: []
            },
        };
    },

    mounted() {
        httpRequest.get('/databaseservice/dataBase/pageProductInfo', {
            params: {
                pageNum: 1,
                pageSize: 2,
                productName: null,
                productType: null,
                productDegree: null,
            }
        }).then((reponse) => {
            this.pageResult = reponse.data.data
        }).catch((err) => {

        });;
    },

    methods: {
        query() {
            httpRequest.get('/databaseservice/dataBase/pageProductInfo', {
                params: {
                    pageNum: 1,
                    pageSize: 5,
                    productName: this.productInfo.productName,
                    productType: this.productInfo.productType,
                    productDegree: this.productInfo.productDegree,
                }
            }).then((reponse) => {
                this.pageResult = reponse.data.data
            }).catch((err) => {

            });;
        },
        firstPage() {
            if (this.pageResult.nowPage != 1) {
                httpRequest.get('/databaseservice/dataBase/pageProductInfo', {
                    params: {
                        productName: null,
                        productType: null,
                        productDegree: null,
                        pageNum: 1,
                        pageSize: this.pageResult.pageSize,
                    }
                }).then((response) => {
                    this.pageResult = response.data.data
                }).catch((err) => {

                });
            }
        },

        lastPage() {
            if (this.pageResult.nowPage != 1) {
                httpRequest.get('/databaseservice/dataBase/pageProductInfo', {
                    params: {
                        productName: null,
                        productType: null,
                        productDegree: null,
                        pageNum: this.pageResult.nowPage - 1,
                        pageSize: this.pageResult.pageSize,
                    }
                }).then((response) => {
                    this.pageResult = response.data.data
                }).catch((err) => {

                });
            }
        },

        nextPage() {
            if (this.pageResult.nowPage != this.pageResult.endPage) {
                httpRequest.get('/databaseservice/dataBase/pageProductInfo', {
                    params: {
                        productName: null,
                        productType: null,
                        productDegree: null,
                        pageNum: this.pageResult.nowPage + 1,
                        pageSize: this.pageResult.pageSize,
                    }
                }).then((response) => {
                    this.pageResult = response.data.data
                }).catch((err) => {

                });
            }
        },
        endPage() {
            if (this.pageResult.nowPage != this.pageResult.endPage)
                httpRequest.get('/databaseservice/dataBase/pageProductInfo', {
                    params: {
                        productName: null,
                        productType: null,
                        productDegree: null,
                        pageNum: this.pageResult.endPage,
                        pageSize: this.pageResult.pageSize,
                    }
                }).then((response) => {
                    this.pageResult = response.data.data
                }).catch((err) => {

                });
        },
        forward() {
            if (this.forw < this.pageResult.firstPage || this.forw > this.pageResult.endPage) {
                alert("请输入有效页数");
            } else {
                httpRequest.get('/databaseservice/dataBase/pageProductInfo', {
                    params: {
                        pageNum: 1,
                        pageSize: 2,
                        productName: null,
                        productType: null,
                        productDegree: null,
                    }
                }).then((response) => {
                    this.pageResult = response.data.data
                }).catch((err) => {

                });
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>