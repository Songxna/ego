<template>
  <div class="layout">
    <!-- 侧边导航 -->
    <Mymenu :isCollapse="isCollapse" />
    <!-- 右侧内容 -->
    <div class="main-content">
      <div class="top-header">
        <div class="left">
          <i
            class="iconfont"
            :class="{
              'icon-right-indent': isCollapse,
              'icon-left-indent': !isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
        </div>
        <div class="userinfo">
          <el-dropdown style="margin-right: 20px" @command="handleCommand">
            <span class="el-dropdown-link" style="color: #fff">
              切换语言<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>Hello {{ userinfo.user }}</span>
          <!-- <span>hello 用户名</span> -->
          <i class="iconfont icon-tuichu" @click="exit"></i>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Mymenu from "../../components/Mymenu.vue";
import { mapState, mapMutations } from "vuex";
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  components: {
    Mymenu,
  },
  computed: {
    ...mapState("loginModule", ["userinfo"]),
  },
  methods: {
    ...mapMutations("loginModule", ["clearUser"]),
    exit() {
      //   退出登录
      this.clearUser();
      localStorage.removeItem("userinfo");
      this.$router.push("/login");
      // 清空vuex数据

      // 浏览器重新加载
      window.location.reload();
    },

    // 切换语言
    handleCommand(command) {
      console.log("切换语言", command);
      console.log(this.$i18n.locale);
      // this.$i18n.locale=command;
      // 存储语言，刷新页面不会初始化
      if (command == "zh") {
        this.$i18n.locale = command;
        localStorage.setItem('lang', "zh");
      } else if (command == "en") {
        this.$i18n.locale = command;
        localStorage.setItem('lang', "en");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  display: flex;
  .main-content {
    flex: 1;
  }
  .top-header {
    background: #1e78bf;
    height: 50px;
    line-height: 50px;
    color: #fff;
    display: flex;
    .left {
      flex: 1;
    }
    .iconfont {
      font-size: 24px;
      color: #fff;
      padding-left: 10px;
    }
    .userinfo {
      color: #fff;
      vertical-align: middle;
      padding-right: 20px;
    }
  }
}
</style>