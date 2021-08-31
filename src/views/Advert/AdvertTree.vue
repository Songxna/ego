<template>
  <div>
    <el-tree
      :data="data"
      node-key="pid"
      :expand-on-click-node="false"
      :render-content="renderContent"
      lazy
      :load="loadNode"
      :props="props"
      :default-expanded-keys="[1001]"
      @node-click="handleNodeClick"
    >
    </el-tree>
    <!-- 弹框 -->
    <el-dialog title="添加广告" :visible.sync="dialogVisible" width="40%">
      <p>当前处于广告位置：{{ advertInfo.name }}</p>
      <el-input type="text" v-model="advertName" />
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAdvert">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
let id = 1000;
export default {
  data() {
    return {
      dialogVisible: false, //弹框关闭
      advertName: "", //广告名字
      title: "添加广告",
      advertInfo: {}, //点击时节点内容
      props: {
        label: "name",
        children: "zones",
        isLeaf: "leaf",
      },
      data: [],
    };
  },

  methods: {
    //   点击tree节点--发送数据
    handleNodeClick(data) {
      console.log(data);
      this.$emit("getTree", data);
    },
    // 添加
    append(data) {
      console.log(data);
      //   显示弹窗
      this.dialogVisible = true;
      this.title = "添加广告";
      //   获取点击的节点内容
      this.advertInfo = data;
    },
    // 请求广告列表
    http() {
      this.$api.getAdvertList().then((res) => {
        console.log("广告分类", res);
        this.data = res.result;
      });
    },
    remove(node, data) {
      console.log("删除", node, data);
      this.$api
        .deleteAdvertContent({
          pid: data.pid,
        })
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            this.$message.success("删除成功");
            this.http();
          }
        });
    },
    // 修改
    update(data) {
      //   显示弹窗
      this.dialogVisible = true;
      this.title = "修改广告";
      //   获取点击的节点内容
      this.advertInfo = data;
      // 获取input框内容
      this.advertName = data.name;
      //   更新视图
    },
    // 提交按钮
    submitAdvert() {
      if (this.title == "添加广告") {
        console.log("+++++");
        this.$api
          .addAdvertChild({
            pid: this.advertInfo.pid,
            name: this.advertName,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success("添加成功");
              // 关闭弹窗
              this.dialogVisible = false;
              // 更新视图
              this.advertName = "";
              //   更新tree
              this.http();
            } else {
              this.$message.error("添加失败");
            }
          });
      } else {
        console.log("修改");
        this.$api
          .updateAdvert({
            pid: this.advertInfo.pid,
            name: this.advertName,
          })
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              this.$message.success("修改成功");
              // 关闭弹窗
              this.dialogVisible = false;
              // 更新视图
              this.advertName = "";
              //   更新tree
              this.http();
            } else {
              this.$message.error("修改失败");
            }
          });
      }
    },
    // 进入懒加载数据请求
    loadNode(node, resolve) {
      if (node.level === 0) {
        // 第一次请求
        this.$api.getAdvertList().then((res) => {
          console.log("广告分类", res);
          return resolve(res.result);
        });
      }
      if (node.level >= 1) {
        this.$api
          .getAdvertList({
            id: node.data.pid,
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
    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(data, "add")}
            >
              添加
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(data, "update")}
            >
              修改
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删除
            </el-button>
          </span>
        </span>
      );
    },
  },
};
</script>

<style>
</style>