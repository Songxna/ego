<template>
  <div class="advert">
    <!-- 左侧 -->
    <AdvertTree class="left" @getTree="getTree" />
    <!-- 右侧 -->
    <AdvertContent class="content" :treeData="treeData" />
  </div>
</template>

<script>
import AdvertTree from "./AdvertTree.vue";
import AdvertContent from "./AdvertContent.vue";
export default {
  components: {
    AdvertTree,
    AdvertContent,
  },
  data() {
    return {
      treeData: { name: "按钮" },
    };
  },
  methods: {
    getTree(val) {
      console.log("tree", val);
      this.treeData = val;
    },
  },
};
</script>

<style lang="scss" scoped>
.advert {
  .left {
    width: 300px;
    float: left;
  }
  .content {
    float: left;
  }
}
</style>