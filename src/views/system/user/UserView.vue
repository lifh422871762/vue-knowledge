<template>
  <div>
    <el-dialog title="详情" width="40%" :visible.sync="isViewDialog">
      <div class="row-view">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label-view">姓名:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.name}}</div></el-col>
          <el-col :span="labelSpan"><div class="label-view">用户名:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.loginName}}</div></el-col>
        </el-row>
      </div>
      <div class="row-view">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label-view">手机号:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.phone}}</div></el-col>
          <el-col :span="labelSpan"><div class="label-view">邮箱:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.email}}</div></el-col>
        </el-row>
      </div>
      <div class="row-view">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label-view">排序:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.seq}}</div></el-col>
          <el-col :span="labelSpan"><div class="label-view">状态:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.status == 1 ?'可用' : '不可用'}}</div></el-col>
        </el-row>
      </div>
      <div class="row-view">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label-view">创建人:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.createdBy}}</div></el-col>
          <el-col :span="labelSpan"><div class="label-view">创建时间:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.createdAt}}</div></el-col>
        </el-row>
      </div>
      <div class="row-view">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label-view">修改人:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.modifiedBy}}</div></el-col>
          <el-col :span="labelSpan"><div class="label-view">修改时间:</div></el-col>
          <el-col :span="contentSpan"><div class="content-view">{{viewObj.modifiedAt}}</div></el-col>
        </el-row>
      </div>
      <div class="row-view">
        <el-row :gutter="gutter">
          <el-col :span="labelSpan"><div class="label-view">描述:</div></el-col>
          <el-col :span="mergeContentSpan"><div class="content-view">{{viewObj.remarks}}</div></el-col>
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
        mergeContentSpan: 20,
        gutter: 10
      }
    },
    props: {
      isViewDialog: {
        type: Boolean,
        default: false
      },
      viewObj: {
        type: Object,
        default: {}
      }
    },
    methods: {
      closeClick() {
        this.$parent.isViewDialog = false;
      }
    }
  }
</script>

<style>

  .label-view{
    text-align: right;
    font-size: 14px;
    font-weight: bold;
    color: #222222;
  }

  .content-view {
    text-align: left;
    font-size: 14px;
    margin-top: 3px;
    color: #6f7180;
  }

  .row-view {
    padding-top: 10px;
  }
</style>