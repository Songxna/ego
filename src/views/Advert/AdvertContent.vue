<template>
  <div class="content">
    <el-button @click="addContent">{{ treeData.name }}广告</el-button>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="pid" label="PID" width="180"> </el-table-column>
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column prop="url" label="访问地址" min-width="240" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="iamge" label="图片地址" min-width="240" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
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
</template>

<script>
export default {
  props: {
    treeData: {
      type: Object,
      default: function () {
        return { name: "按钮" };
      },
    },
  },
  data() {
    return {
      tableData: [],
    };
  },
  watch: {
    treeData: function (val) {
      console.log(val);
      // 清空数据
      this.tableData = [];
      // 请求数据
      this.$api
        .addAdvertContent({
          pid: val.pid,
        })
        .then((res) => {
          console.log("广告内容监听", res);
          if (res.status === 200) {
            this.tableData = res.result;
          } else {
            this.$message.error("该活动没有数据");
          }
        });
    },
  },
  methods: {
    handleDelete(index, row) {
      console.log(index, row);
    },
    addContent() {
      console.log("添加广告");
    },
  },
};
</script>

<style scoped lang='scss'>
.content {
  text-align: center;
  > button {
    margin: 20px 0;
  }
}
</style>