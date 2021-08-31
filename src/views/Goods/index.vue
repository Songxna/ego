<template>
  <div>
    <!-- 搜索框 -->
    <div class="header">
      <el-input
        v-model="search"
        placeholder="请输入内容"
        @change="goSearch"
      ></el-input>
      <el-button type="primary">查询</el-button>
      <el-button type="primary" @click="showDialog">添加</el-button>
    </div>
    <!-- 表格数据 -->
    <el-table
      :data="tableData"
      ref="multipleTable"
      @selection-change="selectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="id" label="商品ID" width="100"></el-table-column>
      <el-table-column
        prop="title"
        label="商品名称"
        width="120"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        width="100"
      ></el-table-column>
      <el-table-column prop="num" label="商品数量" width="80"></el-table-column>
      <el-table-column prop="category" label="规格类目"></el-table-column>
      <el-table-column
        prop="image"
        label="商品图片"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="sellPoint"
        label="商品卖点"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="descs"
        label="商品描述"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作">
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
    <div style="margin-top: 20px">
      <el-button @click="deleteBatch">批量删除</el-button>
      <el-button @click="toggleSelection([tableData[1], tableData[2]])"
        >切换第二、第三行的选中状态</el-button
      >
      <el-button @click="toggleSelection()">取消选择</el-button>
    </div>
    <!-- 分页 -->
    <Pagination
      :pageSize="pageSize"
      :total="total"
      @changeCurrent="changePage"
    />
    <!-- 弹框 -->
    <GoodsDialog ref="dialog" :title="title" :rowData="rowData" />
  </div>
</template>

<script>
import Pagination from "../../components/Pagination.vue";
import GoodsDialog from "./GoodsDialog.vue";
export default {
  data() {
    return {
      tableData: [], //表格数据
      rowData: {},
      pageSize: 10,
      total: 100,
      search: "", //搜索
      dialogVisible: false, //弹框
      idArr: [], //删除id数组
      title: "添加商品",
      currentId:"",//当前页码
    };
  },
  components: {
    Pagination, //分页
    GoodsDialog, //弹框
  },
  methods: {
    // 搜索框
    goSearch() {
      console.log("--sou", this.search);
      if (this.search) {
        this.$api
          .getSearch({
            search: this.search,
          })
          .then((res) => {
            console.log(res);
            if (res.data.status === 200) {
              this.tableData = res.data.result;
              this.pageSize = 8;
              this.total = res.data.result.length;
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
      console.log("显示");
      this.$refs.dialog.dialogVisible = true;
      this.title = "添加商品";
    },
    // 编辑商品
    handleEdit(index, row) {
      console.log("编辑商品", row);
      this.$refs.dialog.dialogVisible = true;
      this.title = "编辑商品";
      this.rowData={...row}//row传值  1. {...row}传址每次传址不一样  2. object.assign({},row)
      // this.rowData = Object.assign({}, row);
    },
    // 删除商品--删除按钮
    handleDelete(index, rowData) {
      console.log(index, rowData);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 删除商品
        this.$api
          .getDeleteProduct({
            id:rowData.id,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
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
    // 删除---
    deleteHandle(){
      this.$api.getBatchDelete({
        idArr:this.idArr
      })
      .then(res=>{
        console.log(res);
        if(res.status===200){
          this.$message.success('删除成功'),
          // 更新视图
          this.http(this.currentId);
        }
      })
    },
    // 批量删除
    deleteBatch() {
      console.log("pil");
      if (this.idArr.length <= 0) {
        this.$message.error("至少删除一个商品");
        return;
      } else {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.deleteHandle();
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
    },
    // 反选按钮
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 选择row id
    selectionChange(selection) {
      let arr = [];
      selection.forEach((ele) => {
        arr.push(ele.id);
      });
      console.log(arr);
      this.idArr = arr;
    },
    // 点击分页
    changePage(val) {
      console.log(val);
      this.currentId=val;
      this.http(val);
    },
    // 网络请求
    http(page) {
      this.$api
        .getProductList({
          page,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.tableData = res.data;
            // 显示每页条数
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

<style lang="scss" scoped>
.header {
  display: flex;
  margin: 30px;
  > button {
    margin-left: 20px;
  }
}
</style>