<template>
  <div class="clearfix" id="login_wrap">
    <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="登录" name="login">
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号:" prop="username">
            <el-input
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >登录</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="zhuce">
        <el-form
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号:" prop="username">
            <el-input
              type="text"
              v-model="loginForm.username"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码:" prop="password">
            <el-input
              type="password"
              v-model="loginForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >注册</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import jwt from "jwt-decode";
import { mapMutations } from "vuex";
export default {
  data() {
    return {
      activeName: "login",
      loginForm: {
        //登录表单数据
        username: "",
        password: "",
      },
      rules: {
        //校验验证规则
        username: [
          { required: true, message: "请输入账号名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    ...mapMutations("loginModule", ["setUser"]),
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录提交表单事件
          console.log(this.loginForm);
          let { username, password } = this.loginForm;
          if (this.activeName === "login") {
            this.$api
              .getLogin({
                username,
                password,
              })
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  // 解析token字段
                  console.log(jwt(res.data));
                  let obj = {
                    user: jwt(res.data).username,
                    token: res.data,
                  };
                  /**
                   * 存储vuex
                   * 存储本地
                   * 进入首页
                   */
                  this.setUser(obj);
                  localStorage.setItem("userinfo", JSON.stringify(obj));
                  this.$router.push("/");
                } else {
                  console.log("错误");
                  this.$message.error("错了哦，账号或密码错误");
                }
              });
          } else {
            this.$api
              .gatRegister({
                username,
                password,
              })
              .then((res) => {
                console.log("---", res);
                if (res.status === 200) {
                  this.$message.success("注册成功！请登录");
                }
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // tab切换
    handleClick(tab) {
      console.log("tab", tab.name);
      // 重置表单
      this.$refs.loginForm.resetFields();
    },
  },
};
</script>
<style scoped lang="scss">
.title {
  text-align: center;
  font-size: 22px;
}
#login_wrap {
  position: relative;
  background: rgba(64, 64, 194, 0.1);
  height: 600px;
  > div {
    background: #fff;
    width: 479px;
    height: 325px;
    padding: 30px 40px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    > div {
      padding: 10px 0;
      border-bottom: 1px solid #ddd;
      &.login--account {
        margin: 25px 0 30px;
      }
      span {
        color: #666;
        display: inline-block;
        width: 84px;
        font-size: 20px;
      }
      input {
        background: none;
        font-size: 16px;
        border: none;
        height: 30px;
        width: 280px;
        padding-left: 12px;
        box-sizing: border-box;
        color: #666;
        &.error {
          border: 1px solid #f00;
        }
        &::-webkit-input-placeholder {
          color: #aaa;
        }
      }
    }

    p {
      text-align: right;
      &.login--btn {
        button {
          width: 100%;
          height: 50px;
          font-size: 18px;
          background: #0f6171;
          border: none;
          margin-top: 30px;
          color: #fff;
          border-radius: 6px;
          cursor: pointer;
        }
      }
      a {
        color: #fff;
        display: inline-block;
        padding: 0 15px;
        font-size: 14px;
      }
    }
  }
}
</style>
