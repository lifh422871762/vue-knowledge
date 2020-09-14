<template>
  <el-dialog title="导入加班核对表" :close-on-click-modal="false" @close="closeClick()" width="30%"
             :visible.sync="isImportDialog">
    <div style="text-align: center">
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="importExcelPath"
        :file-list="fileList"
        :on-success="handleSuccess"
        :limit="1">
        <el-button slot="trigger" style="margin-top: 20%" size="small" type="primary">选取文件</el-button>
      </el-upload>
    </div>
  </el-dialog>
</template>
<script>

  import {servicePath} from "network/path";

  export default {
    data() {
      return {
        fileList: [],
        importExcelPath: servicePath + "/checkOverTime/importExcel"
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
        this.fileList = [];
        this.$parent.isImportDialog = false;
      },
      //上传成功后的回调
      handleSuccess(response, file, fileList) {
        if(response.success){
          this.closeClick();
          this.$parent.searchOverTimeCheckList();
          this.$message.success(response.message);
        } else {
          this.$message.error(response.message);
        }
      }
    }
  }
</script>

<style>

  .el-dialog {
    display: flex;
    flex-direction: column;
    margin: 0 !important;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /*height:600px;*/
    max-height: calc(100% - 30px);
    max-width: calc(100% - 30px);
  }

  .el-dialog .el-dialog__body {
    flex: 1;
    overflow: auto;
  }

</style>