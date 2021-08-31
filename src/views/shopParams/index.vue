<template>
  <div>
    <!-- 搜索 -->
    <div class="header">
      <el-input v-model="search" placeholder="请输入内容" @change="goSearch" />
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>
    <!-- 表格 -->
    <el-table :data="tableData">
      <el-table-column prop="itemCatId" label="规格参数ID" width="120">
      </el-table-column>
      <el-table-column prop="id" label="类目ID" width="120"> </el-table-column>
      <el-table-column prop="specsName" label="规格名称" width="180">
      </el-table-column>
      <el-table-column prop="paramData" label="规格参数" show-overflow-tooltip>
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
    <!-- 分页 -->
    <Pagination
      :pageSize="pageSize"
      :total="total"
      @changeCurrent="changePage"
    />
    <!-- 弹框 -->
    <ParamsDialog ref="dialog" :rowData="rowData" />
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import ParamsDialog from "./ParamsDialog.vue";
export default {
  components: {
    Pagination, //分页
    ParamsDialog, //弹框
  },
  data() {
    return {
      tableData: [],
      rowData:{},
      pageSize: 10,
      total: 100,
      currentId: "", //当前页码
      search: "",
      rowData: {},
    };
  },
  methods: {
    // 查询
    goSearch() {
      console.log("sou", this.search);
      if (this.search) {
        this.$api
          .getParamsSearch({
            search: this.search,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.tableData = res.result;
              this.pageSize = 8;
              this.total = res.result.length;
            } else {
              console.log("查无数据");
              this.tableData = [];
              this.pageSize = 1;
              this.total = 0;
            }
          });
      } else {
        this.http(1);
      }
    },
    // 显示弹框
    showDialog() {
      this.$refs.dialog.dialogVisible = true;
    },
    // 编辑参数
    handleEdit(index, row) {
      console.log(index, row);
      // 显示外弹框
      this.$refs.dialog.dialogVisible = true;
      // 显示内弹框
      this.$nextTick(() => {
        this.$refs.dialog.innerVisible = true;
        this.rowData = { ...row };
      });
      
    },
    // 删除参数
    handleDelete(index, rowData) {
      console.log(index, rowData);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$api
          .getParamsDelete({
            id: rowData.id,
          })
          .then((res) => {
            console.log("s", res);
            if (res.status === 200) {
              this.$message.success("删除成功");
              // 更新视图
              this.http(this.currentId);
            } else {
              this.$message({
                type: "error",
                message: "删除失败!",
              });
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      });
    },
    // 获取分页按钮
    changePage(val) {
      this.currentId = val;
      this.http(val);
    },
    // 网络请求
    http(page) {
      this.$api
        .getItemParam({
          page,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data;
            this.total = res.total;
            this.pageSize = res.pageSize;
          }
        });
    },
  },
  created() {
    this.http(1);
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  margin: 30px;
  > button {
    margin-left: 20px;
  }
}
</style>