<template>
  <div class="content">
    <Content />
  </div>
</template>

<script>
import Content from "../main-content/content.vue";
export default {
  components: {
    Content,
  },
};
</script>

<style lang="scss" scoped>
.content{
    flex: 1;
}
</style>