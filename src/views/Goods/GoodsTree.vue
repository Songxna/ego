<template>
  <div>
    <el-tree
      :props="props"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData: "",
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf", // lazy 属性的情况下生效
      },
    };
  },
  methods: {
    // 获取node数据发送给弹框
    // handleNodeClick(data) {
    //   // console.log(data.name);
    //   this.treeData=data.name;
    // },
    handleNodeClick(data) {
      // console.log(data.name);
     this.$emit('getTree',data)
    },
    loadNode(node, resolve) {
      //懒加载事件
      // console.log(node.level, node); //node是element虚拟DOM
      if (node.level === 0) {
        console.log("进入树加载");
        this.$api.getSelectCategory().then((res) => {
          console.log(res);
          if (res.status === 200) {
            return resolve(res.result);
          }
        });
      } else {
        this.$api
          .getSelectCategory({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.status === 200) {
              return resolve(res.result);
            } else {
              return resolve([]);
            }
          });
      }
    },
  },
};
</script>

<style>
</style>