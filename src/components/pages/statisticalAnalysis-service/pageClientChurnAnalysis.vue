<template>
    <div>
        <div class="search" style="width: 55vw;">
            客户名称
            <input type="text" v-model="client.clientName" style="margin-right: 2rem;" />
            客户经理
            <input type="text" v-model="client.clientManager" style="margin-right: 3rem;" />
            <el-button @click="query()">查询</el-button>
        </div>

        <table style="width:50vw">
            <tr>
                <td>编号</td>
                <td>年份</td>
                <td>客户</td>
                <td>客户经理</td>
                <td>流失原因</td>
            </tr>

            <tr v-for="item in pageResult.data" :key="item.clientId">
                <td>{{ item.clientId }}</td>
                <td>{{ item.lostTime.substring(0, 4) }}</td>
                <td>{{ item.clientName }}</td>
                <td>{{ item.clientManager }}</td>
                <td>{{ item.lossReason }}</td>
            </tr>
        </table>
        <table>
            <tr>
                <td>共有{{ pageResult.allData }}条记录</td>
                <td>第{{ pageResult.nowPage }}/共{{ pageResult.allPages }}页</td>
                <td>
                    <el-button @click="firstPage()" id="firstPage">第一页</el-button>
                    <el-button type="primary" icon="el-icon-arrow-left" @click="lastPage()" id="lastPage">上一页</el-button>
                    <el-button type="primary" @click="nextPage()" id="nextPage">下一页
                        <i class="el-icon-arrow-right el-icon--right"></i>
                    </el-button>
                    <el-button @click="endPage()" id="endPage">最后一页</el-button>
                </td>
                <td>
                    转到<input type="text" v-model="forw" />页
                    <el-button @click="forward()">Go</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import httpRequest from "@/request";
export default {
    name: "ClientmanagesystemPageClientChurnAnalysis",

    data() {
        return {
            client: {
                clientName: null,
                clientManager: null,
            },

            pageResult: {
                allData: null,
                allPages: null,
                nowPage: null,
                firstPage: null,
                endPage: null,
                pageSize: null,
                data: [],
            },

            forw: 1,
        };
    },

    mounted() {
        httpRequest
            .get("/statisticalanalysisservice/statisticalAnalysis/queryClientChurn", {
                params: {
                    clientName: this.client.clientName,
                    clientManager: this.client.clientManager,
                    pageNum: 1,
                    pageSize: 10,
                },
            })
            .then((response) => {
                this.pageResult = response.data.data;
            })
            .catch((err) => { });
    },

    methods: {
        query() {
            httpRequest
                .get("/statisticalanalysisservice/statisticalAnalysis/queryClientChurn", {
                    params: {
                        clientName: this.client.clientName,
                        clientManager: this.client.clientManager,
                        pageNum: 1,
                        pageSize: this.pageResult.pageSize,
                    },
                })
                .then((response) => {
                    this.pageResult = response.data.data;
                })
                .catch((err) => { });
        },

        firstPage() {
            if (this.pageResult.nowPage != 1) {
                httpRequest
                    .get("/statisticalanalysisservice/statisticalAnalysis/queryClientChurn", {
                        params: {
                            clientName: null,
                            clientManager: null,
                            pageNum: 1,
                            pageSize: this.pageResult.pageSize,
                        },
                    })
                    .then((response) => {
                        this.pageResult = response.data.data;
                    })
                    .catch((err) => { });
            }
        },

        lastPage() {
            if (this.pageResult.nowPage != 1) {
                httpRequest
                    .get("/statisticalanalysisservice/statisticalAnalysis/queryClientChurn", {
                        params: {
                            clientName: null,
                            clientManager: null,
                            pageNum: this.pageResult.nowPage - 1,
                            pageSize: this.pageResult.pageSize,
                        },
                    })
                    .then((response) => {
                        this.pageResult = response.data.data;
                    })
                    .catch((err) => { });
            }
        },

        nextPage() {
            if (this.pageResult.nowPage != this.pageResult.endPage) {
                httpRequest
                    .get("/statisticalanalysisservice/statisticalAnalysis/queryClientChurn", {
                        params: {
                            clientName: null,
                            clientManager: null,
                            pageNum: this.pageResult.nowPage + 1,
                            pageSize: this.pageResult.pageSize,
                        },
                    })
                    .then((response) => {
                        this.pageResult = response.data.data;
                    })
                    .catch((err) => { });
            }
        },
        endPage() {
            if (this.pageResult.nowPage != this.pageResult.endPage)
                httpRequest
                    .get("/statisticalanalysisservice/statisticalAnalysis/queryClientChurn", {
                        params: {
                            clientName: null,
                            clientManager: null,
                            pageNum: this.pageResult.endPage,
                            pageSize: this.pageResult.pageSize,
                        },
                    })
                    .then((response) => {
                        this.pageResult = response.data.data;
                    })
                    .catch((err) => { });
        },
        forward() {
            if (
                this.forw < this.pageResult.firstPage ||
                this.forw > this.pageResult.endPage
            ) {
                alert("请输入有效页数");
            } else {
                httpRequest
                    .get("/statisticalanalysisservice/statisticalAnalysis/queryClientChurn", {
                        params: {
                            clientName: null,
                            clientManager: null,
                            pageNum: this.forw,
                            pageSize: this.pageResult.pageSize,
                        },
                    })
                    .then((response) => {
                        this.pageResult = response.data.data;
                    })
                    .catch((err) => { });
            }
        },
    },
};
</script>
<style lang="less" scoped>
.main {
    padding: 0 !important;
    margin: 0 !important;

}
</style>
