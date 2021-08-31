<template>
  <div class="pagination">
    <el-pagination
      background
      layout="total,prev, pager, next,jumper"
      :page-size="pageSize"
      :total="total"
      @current-change="changePage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 100,
    },
  },

  methods: {
    changePage(val) {
      this.$emit("changeCurrent", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.pagination {
  margin: 20px;
  text-align: center;
}
</style>