<template>
  <div>
    <!-- 1.搜索框 -->
    <div class="header">
      <el-input></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog"> 添加 </el-button>
    </div>
    <!-- 2.表格内容 -->
    <div class="table">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="itemCatId" label="规格参数ID" width="140">
        </el-table-column>
        <el-table-column prop="id" label="类目ID" width="140">
        </el-table-column>
        <el-table-column prop="specsName" label="规格名称" width="140">
        </el-table-column>
        <el-table-column
          prop="paramData"
          label="规格参数"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 3.分页 -->
    <div class="page">
      <Pagination
        :total="total"
        :pageSize="pageSize"
        @currentPage="currentPage"
      />
    </div>

    <!-- 4.弹框 -->
    <ParamsDialog ref='myDialog'/>
  </div>
</template>

<script>
import Pagination from "../../components/Pagination";
import ParamsDialog from "./ParamsDialog";
export default {
  components: {
    Pagination,
    ParamsDialog,
  },
  data() {
    return {
      tableData: [],
      pageSize: 1,
      total: 1,
    };
  },
  methods: {
    handleEdit() {},
    handleDelete() {},
    //分页
    currentPage(val) {
      console.log("--val", val);
      this.http(val);
    },
    /**
     * 点击添加按钮
     */
    showDialog(){
      this.$refs.myDialog.dialogVisible=true
    },
    http(page) {
      this.$api.selectItemParamAll({ page }).then((res) => {
        console.log(res);
        if (res.status === 200) {
          this.tableData = res.data;
          // 分页参数
          this.pageSize = res.pageSize;
          this.total = res.total;
        }
      });
    },
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang="less" scoped>
.header {
  display: flex;
  padding: 20px;
  button {
    margin-left: 20px;
  }
}
.table {
  margin-left: 20px;
  margin-right: 20px;
}
.page {
  text-align: center;
  margin-top: 20px;
  .el-Pagination {
    padding: 0;
  }
}
</style>