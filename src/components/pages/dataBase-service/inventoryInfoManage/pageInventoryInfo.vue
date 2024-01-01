<template>
  <table-style>
    <template #header>
      <el-button @click="create()">新增</el-button>
    </template>
    <table>
      <tr>
        <td>产品</td>
        <td>
          <input type="text" v-model="inventoryInfo.productName">
        </td>
        &nbsp;
        <td>仓库</td>
        <td><input type="text" v-model="inventoryInfo.stash"></td>
        &nbsp;&nbsp;&nbsp;
        <td>
          <el-button @click="query()">查询</el-button>
        </td>
      </tr>
    </table>
    <table>
      <tr>
        <td>序号</td>
        <td>产品</td>
        <td>仓库</td>
        <td>货位</td>
        <td>数量</td>
        <td>备注</td>
        <td>操作</td>
      </tr>

      <tr v-for="(item, index) in pageResult.result" :key="item.productName">
        <td>{{ index + 1 }}</td>
        <td>{{ item.productName }}</td>
        <td>{{ item.stash }}</td>
        <td>{{ item.freightSpace }}</td>
        <td>{{ item.productNum }}</td>
        <td>{{ item.notes }}</td>
        <td>
          <el-button @click="deleteById(item.id)">删除</el-button>
          <el-button @click="update(item)">编辑</el-button>
        </td>
      </tr>
    </table>
    <template #footer>
      <table>
        <tr>
          <td>共有{{ pageResult.total }}条记录</td>
          <td>第{{ pageResult.pageNum }}/共{{ Math.ceil(pageResult.total / pageResult.pageSize) }}页</td>
          <td>
            <el-button @click="firstPage()" id="firstPage">第一页</el-button>
          </td>
          <td>
            <el-button @click="lastPage()" id="lastPage">上一页</el-button>
          </td>
          <td>
            <el-button @click="nextPage()" id="nextPage">下一页</el-button>
          </td>
          <td>
            <el-button @click="endPage()" id="endPage">最后一页</el-button>
          </td>
          <td>转到<input type="text" v-model="pageResult.forward">页
            <el-button @click="forward()">Go</el-button>
          </td>
        </tr>
      </table>
    </template>
  </table-style>
</template>

<script>
import httpRequest from '@/request';
import TableStyle from "@/components/slot/tableStyle";

export default {
  name: 'ClientmanagesystemPageInventoryInfo',
  components: {TableStyle},
  data() {
    return {
      inventoryInfo: {
        productName: null,
        stash: null,
      },

      pageResult: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        forward: 1,
        result: []
      },

    };
  },

  mounted() {
    this.query();
  },

  methods: {
    query() {
      httpRequest.get('/databaseservice/inventoryInfo/queryInventoryInfo', {
        params: {
          pageNum: this.pageResult.pageNum,
          pageSize: this.pageResult.pageSize,
          productName: this.inventoryInfo.productName,
          stash: this.inventoryInfo.stash,
        }
      }).then((reponse) => {
        this.pageResult = reponse.data.data
      });
    },
    create() {
      this.$router.push("/dataBase/inventoryInfo/createInventoryInfo")
    },
    deleteById(id) {
      httpRequest.get('/databaseservice/inventoryInfo/delInventoryInfo', {
        params: {
          id
        }
      }).then((reponse) => {
        if (reponse.data.resCode === "000000") {
          alert(reponse.data.data);
          this.query();
        } else {
          alert(reponse.data.resDesc);
          this.query();
        }
      });
    },
    update(item){
      this.$router.push({
        path:"/dataBase/inventoryInfo/updateInventoryInfo",
        query: item
      })
    },
    /*******************************************/
    /**
     * 分页方法
     */
    firstPage() {
      this.pageResult.pageNum = 1;
      this.query();

    },
    lastPage() {
      if (this.pageResult.pageNum != 1) {
        --this.pageResult.pageNum
        this.query();
      }
    },
    nextPage() {
      if (this.pageResult.pageNum != Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        ++this.pageResult.pageNum
        this.query();
      }
    },
    endPage() {
      this.pageResult.pageNum = Math.ceil(this.pageResult.total / this.pageResult.pageSize);
      this.query();
    },
    forward() {
      if (this.pageResult.forward >= 1 && this.pageResult.forward <= Math.ceil(this.pageResult.total / this.pageResult.pageSize)) {
        this.pageResult.pageNum = this.pageResult.forward;
        this.query();
      } else {
        alert("页数不正确！")
        this.pageResult.forward = null;
      }
    },
    /*******************************************/
  },
};
</script>

<style lang="scss" scoped></style>