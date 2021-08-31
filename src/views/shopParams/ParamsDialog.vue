<template>
  <div>
    <el-dialog
      title="商品参数类目选择"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <div v-if="dialogVisible">
        <GoodsTree @getTree="getTree" />
      </div>
      <!-- 内弹框 -->
      <el-dialog
        width="45%"
        title="商品规格参数"
        :visible.sync="innerVisible"
        append-to-body
      >
        <p>当前选中的商品:{{ productInfo.name }}</p>
        <hr />
        <el-button @click="addDomain">新增规格列表</el-button>
        <br /><br />
        <el-form
          :model="dynamicForm"
          ref="dynamicForm"
          label-width="100px"
          class="demo-dynamic"
        >
          <!-- 第一层 -->
          <el-form-item
            v-for="(item, index) in dynamicForm.groups"
            :label="item.title"
            :key="index"
            :prop="item.title"
          >
            <div class="list">
              <el-input v-model="item.title"></el-input
              ><el-button @click.prevent="addChildDomain(index)"
                >添加子组</el-button
              >
              <el-button @click.prevent="removeDomain(index)">删除组</el-button>
            </div>
            <!-- 第二层 -->
            <el-form-item
              v-for="(ele, n) in item.children"
              :label="ele.title"
              :key="n"
              :prop="ele.title"
            >
              <div class="list">
                <el-input v-model="ele.title"></el-input>
                <el-button @click.prevent="removeCurrentDomain(index, n)"
                  >删除</el-button
                >
              </div>
            </el-form-item>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitForm">提交</el-button>
          <el-button @click="dialogVisible = false">重置</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          :disabled="isShow"
          @click="innerVisible = true"
          >确定并添加分组</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsTree from "../Goods/GoodsTree.vue";
export default {
  components: {
    GoodsTree,
  },
  props: {
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      isShow: true, //禁止
      innerVisible: false,
      productInfo: {}, //点击tree的数据
      ruleForm: {
        //参数表单
        id: "",
        itemCatId: "", //类目cid
        paramData: "",
        specsName: "",
      },
      dynamicForm: {
        groups: [
          //   {
          //     value: "", //规格值
          //     title: "基本信息", //规格名称
          //     children: [
          //       {
          //         value: "", //规格值
          //         title: "", //规格名称
          //       },
          //     ],
          //   },
          //   {
          //     value: "",
          //     title: "主体",
          //     children: [],
          //   },
        ],
      },
    };
  },
  // 监听
  watch: {
    rowData(val) {
      // 延迟加载 this.$nextTick()
      this.$nextTick(() => {
        console.log("watch", val);
        this.ruleForm = val;
        // 监听规格参数修改 解析paramData数据 页面显示groups表单
        this.dynamicForm.groups = JSON.parse(val.paramData);
      });
    },
  },
  methods: {
    //   关闭按钮
    handleClose() {
      this.dialogVisible = false;
    },
    // 点击tree之后传递数据给按钮
    getTree(val) {
      console.log("tree", val);
      this.isShow = false; //按钮可以点击
      this.productInfo = val;
    },
    // 提交表单事件
    submitForm() {
      console.log("添加规格参数", this.dynamicForm.groups);
      let { id, itemCatId, specsName } = this.ruleForm;
      //   判断是否参数规格有数据 没数据不添加
      if (
        this.dynamicForm.groups.length != 0 &&
        this.dynamicForm.groups[0].children[0].length > 0
      ) {
        this.$api
          .getInsertItemParam({
            specsName: this.productInfo.name,
            itemCatId: this.productInfo.cid,
            content: JSON.stringify(this.dynamicForm.groups),
          })
          .then((res) => {
            console.log("11---", res);
            if (res.status === 200) {
              this.$message.success("添加成功");
              //   关闭弹窗
              this.dialogVisible = false; //外弹框
              this.innerVisible = false; //内弹框
              // 更新视图
              this.$parent.http(1);
              // 清空表单数据
              // this.$refs.dynamicForm.resetFields();
              this.dynamicForm.groups = [];
              // 按钮禁止
              this.isShow = true;
            } else {
              this.$message.error("添加失败");
            }
          });
      } else {
        console.log("--修改参数", this.ruleForm.specsName);
        this.$api
          .getUpdateCategory({
            id,
            cid: itemCatId,
            specsName,
            content: JSON.stringify(this.dynamicForm.groups),
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success("修改成功");
              // 关闭弹窗
              this.dialogVisible = false;
              this.innerVisible = false;
              // 更新视图
              this.$parent.http(this.currentId);
              // 清空表单
              this.dynamicForm.groups = [];
            } else {
              this.$message.error("修改失败");
            }
          });
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 添加子组
    addChildDomain(index) {
      this.dynamicForm.groups[index].children.push({
        value: "",
        title: "",
      });
    },
    // 删除当前组
    removeCurrentDomain(index, n) {
      this.dynamicForm.groups[index].children.splice(n, 1);
    },
    // 删除组件
    removeDomain(index) {
      this.dynamicForm.groups.splice(index, 1);
    },
    // 增加外层父组件
    addDomain() {
      this.dynamicForm.groups.push({
        value: "",
        title: "",
        children: [],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  > button {
    margin-left: 10px;
  }
}
</style>