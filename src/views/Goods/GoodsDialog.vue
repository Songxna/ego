<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="clearForm"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="类目选择">
          <el-button type="primary" @click="showInnerDialog">
            类目选择
          </el-button>
          <!-- {{ typeData }} -->
          {{ ruleForm.category }}
        </el-form-item>
        <el-form-item label="商品名称" prop="title">
          <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="ruleForm.num"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="ruleForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品图片" prop="image">
          <el-button type="primary" @click="uploadImage">上传图片</el-button>
          <img
            :src="ruleForm.image"
            style="width: 120px; vertical-align: middle; margin-left: 20px"
          />
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <Editor @getEditor="getEditor" ref="wangEditor" />
        </el-form-item>
        <el-form-item label="规格参数配置" prop="desc" v-show="paramShow">
          <el-form ref="dynamicForm" label-width="100px" class="demo-dynamic">
            <!-- 第一层 -->
            <el-form-item
              v-for="(item, index) in paramData"
              :label="item.title"
              :key="index"
              :prop="item.title"
            >
              <div class="list">
                <el-input v-model="item.value"></el-input>
              </div>
              <!-- 第二层 -->
              <el-form-item
                v-for="(ele, n) in item.children"
                :label="ele.title"
                :key="n"
                :prop="ele.title"
              >
                <div class="list children">
                  <el-input v-model="ele.value"></el-input>
                </div>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearForm">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 类目选择--内弹框 -->
    <el-dialog
      width="40%"
      title="类目选择"
      :visible.sync="innerVisible"
      append-to-body
    >
      <GoodsTree ref="tree" @getTree="getTree" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="showTypeData">确定</el-button>
      </span>
    </el-dialog>

    <!-- 上传图片--内弹框 -->
    <el-dialog
      width="40%"
      title="上传图片"
      :visible.sync="ImginnerVisible"
      append-to-body
    >
      <GoodsUpload @showImg="showImg" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="ImginnerVisible = false"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import GoodsTree from "./GoodsTree.vue";
import GoodsUpload from "./GoodsUpload.vue";
import Editor from "./WangEditor.vue";
export default {
  props: {
    // currentId: "", //当前页码
    title: {
      type: String,
      default: "添加商品",
    },
    rowData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  // 侦听
  watch: {
    rowData(val) {
      // 延迟加载 this.$nextTick() 回调延迟到下次 DOM 更新循环之后执行
      this.$nextTick(() => {
        console.log("watch", val);
        this.ruleForm = val;
        // 编辑器数据
        // this.ruleForm.desc = val;
        // 判断规格参数是否存在 存在显示 转为数组对象
        if (val.paramsInfo) {
          this.paramData = JSON.parse(val.paramsInfo);
          console.log('-----------',this.paramData);
          this.paramShow = true;
        }
        // 富文本组件设置内容
        this.$refs.wangEditor.editor.txt.html(val.descs);
      });
    },
  },
  data() {
    return {
      dialogVisible: false, //外弹框
      innerVisible: false, //类目内弹框
      ImginnerVisible: false, //图片内弹框
      // typeData: "", //类目
      typeData: {}, //类目
      paramShow: false, //规格参数显示
      paramData: [], //规格配置数据
      ruleForm: {
        id:"",
        cid: "", //类目标识
        title: "",
        price: "",
        num: "",
        category: "", //类目选择
        sellPoint: "",
        image: "",
        desc: "",
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        price: [{ required: true, message: "请输入商品价格", trigger: "blur" }],
        num: [
          { required: true, message: "请输入商品数量", trigger: "blur" },
          { min: 1, message: "商品最少为一件", trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    // 显示类目弹框
    showInnerDialog() {
      this.innerVisible = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    getTree(val) {
      this.typeData = val;
    },
    // 显示类目选择
    // showTypeData() {
    //   this.innerVisible = false;
    //   this.typeData = this.$refs.tree.treeData;
    // },
    showTypeData() {
      this.ruleForm.category = this.typeData.name;
      this.ruleForm.cid = this.typeData.cid;
      this.innerVisible = false; // 隐藏弹框
      // 获取规格参数
      this.$api
        .getCategoryData({
          cid: this.ruleForm.cid,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            // 渲染规格配置
            this.paramShow = true;
            // 解析配置数据 paramData
            this.paramData = JSON.parse(res.result[0].paramData);
          }
        });
    },
    // 显示上传图片弹框
    uploadImage() {
      this.ImginnerVisible = true;
    },
    showImg(val) {
      this.ruleForm.image = val;
    },
    // 富文本编辑
    getEditor(val) {
      this.ruleForm.desc = val;
    },
    // 添加商品
    submitForm() {
      let { id,cid, title, price, num, category, sellPoint, image, desc } =
        this.ruleForm;
      let paramsInfo = JSON.stringify(this.paramData); //规格参数配置
      // 判断 添加商品还是--编辑商品
      if (this.title === "添加商品") {
        this.$api
          .getAddProduct({
            cid,
            title,
            price,
            num,
            category,
            sellPoint,
            image,
            desc,
            paramsInfo,
          })
          .then((res) => {
            console.log("---", res);
            // 添加成功
            if (res.status === 200) {
              this.$message.success("添加成功");

              // 清空数据
              this.clearForm();

              // 更新商品列表
              this.$parent.http(1);
            } else {
              this.$message.error("添加失败");
            }
          });
      } else {
        console.log("编辑商品");
        this.$api
          .getUpdateTbItem({
            id,
            title,
            cid,
            category,
            sellPoint,
            price,
            num,
            desc,
            image,
            paramsInfo
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.clearForm();
              this.$message.success("修改成功");
              // 更新视图
              this.$parent.http(this.$parent.currentId);
              // 隐藏弹窗
              this.dialogVisible = false;
            }
          });
      }
    },
    // 清空数据
    clearForm() {
      // 隐藏弹窗
      this.dialogVisible = false;
      this.ruleForm = {
        cid: "",
        title: "",
        price: "",
        num: "",
        category: "",
        sellPoint: "",
        image: "",
        desc: "",
      };
      // editor.txt.clear() 清空编辑器内容。
      this.$refs.wangEditor.editor.txt.clear();
      // 清空规格参数数据
      this.paramData = [];
      this.paramShow = false;
    },
  },
  components: {
    GoodsTree,
    GoodsUpload,
    Editor,
  },
};
</script>

<style lang="scss" scoped>
.children {
  margin: 10px 0;
}
</style>