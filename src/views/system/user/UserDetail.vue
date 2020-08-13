<template>
  <div>
    <el-dialog title="详情" width="40%" :visible.sync="isDetailDialog">
      <div class="row">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label">姓名:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.name}}</div></el-col>
          <el-col :span="labelSpan"><div class="label">用户名:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.loginName}}</div></el-col>
        </el-row>
      </div>
      <div class="row">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label">手机号:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.phone}}</div></el-col>
          <el-col :span="labelSpan"><div class="label">邮箱:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.email}}</div></el-col>
        </el-row>
      </div>
      <div class="row">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label">排序:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.seq}}</div></el-col>
          <el-col :span="labelSpan"><div class="label">状态:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.status == 1 ?'可用' : '不可用'}}</div></el-col>
        </el-row>
      </div>
      <div class="row">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label">创建人:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.createdBy}}</div></el-col>
          <el-col :span="labelSpan"><div class="label">创建时间:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.createdAt}}</div></el-col>
        </el-row>
      </div>
      <div class="row">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label">修改人:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.modifiedBy}}</div></el-col>
          <el-col :span="labelSpan"><div class="label">修改时间:</div></el-col>
          <el-col :span="contentSpan"><div class="content">{{detailObj.modifiedAt}}</div></el-col>
        </el-row>
      </div>
      <div class="row">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label">描述:</div></el-col>
          <el-col :span="mergeContentSpan"><div class="content">{{detailObj.describe}}</div></el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeClick">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        labelSpan: 4,
        contentSpan: 8,
        mergeContentSpan: 16,
        gutter: 10
      }
    },
    props: {
      isDetailDialog: {
        type: Boolean,
        default: false
      },
      detailObj: {
        type: Object,
        default: {}
      }
    },
    methods: {
      closeClick() {
        this.$parent.isDetailDialog = false;
      }
    }
  }
</script>

<style>

  .label{
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    color: #222222;
  }

  .content {
    text-align: left;
    font-size: 14px;
    margin-top: 3px;
    color: #6f7180;
  }

  .row {
    padding-top: 10px;
  }
</style>