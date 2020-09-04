<template>
  <el-dialog title="导入加班核对表" :close-on-click-modal="false" @close="closeClick()" width="30%"  :visible.sync="isImportDialog">
    <el-upload
            class="upload-demo"
            ref="upload"
            action="http://127.0.0.1:8000/checkOverTime/importExcel"
            :file-list="fileList"
            :on-success="handleSuccess"
            :limit="1">
       <el-button slot="trigger" style="margin-top: 20%" size="small" type="primary">选取文件</el-button>
    </el-upload>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        fileList: []
      };
    },
    props: {
      isImportDialog: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      //关闭弹出框
      closeClick() {
        this.$parent.isImportDialog = false;
      },
      //上传成功后的回调
      handleSuccess(response, file, fileList) {
        this.closeClick();
        this.$message.success("导入成功");
      }
    }
  }
</script>