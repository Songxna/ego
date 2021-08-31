<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="url"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSucess"
      :file-list="fileList"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px"
        size="small"
        type="success"
        @click="submitUpload"
        >上传到服务器</el-button
      >
      <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div>
    </el-upload>
  </div>
</template>

<script>
import base from '../../api/config'
export default {
  data() {
    return {
      fileList: [],
      url:base.host+base.upload
    };
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleSucess(response, file, fileList){
        console.log('上传成功');
        console.log(response.url);
        this.$message.success("上传成功!");
        // 传递图片--回显
        console.log(base.host+'/'+response.url.slice(7)); 
        let imgUrl=base.host+'/'+response.url.slice(7);
        this.$emit('showImg',imgUrl);
    }
  },
};
</script>

<style>
</style>