<template>
  <div>
    <el-dialog :title="title" :close-on-click-modal="false" @close="closeClick(ruleForm)" width="50%" :visible.sync="isFormDialog">
      <el-form :model="formObj" :rules="rules" :ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-row gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="formObj.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名" prop="loginName">
              <el-input v-model="formObj.loginName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="formObj.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="formObj.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="状态" prop="status">
              <el-select v-model="formObj.status" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="排序" prop="seq">
              <el-input-number size="medium" v-model="formObj.seq"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="10">
          <el-col :span="24">
            <el-form-item label="描述" prop="describe">
              <el-input
                      type="textarea"
                      :autosize="{ minRows: 4, maxRows: 8}"
                      placeholder="请输入内容"
                      v-model="formObj.remarks">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeClick(ruleForm)">关 闭</el-button>
        <el-button type="primary" @click="submitForm(ruleForm)">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

  import {insert,update} from "network/system/user";

  export default {
    data() {
      //验证手机号码
      let checkPhone = (rule, value, callback) => {
        if(value == undefined){
          return callback(new Error("请输入手机号"));
        }
        if(!(/^1[3456789]\d{9}$/.test(value))){
          return callback(new Error("请输入正确手机号"));
        }
        callback();
      };
      //验证邮箱
      let checkEmail = (rule, value, callback) => {
        if(value == undefined){
          return callback(new Error("请输入邮箱"));
        }
        if(!(/^[\da-z]+([\-\.\_]?[\da-z]+)*@[\da-z]+([\-\.]?[\da-z]+)*(\.[a-z]{2,})+$/.test(value))){
          return callback(new Error("请输入正确邮箱"));
        }
        callback();
      };
      return {
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 2, max: 30, message: '名字最少两个字符', trigger: 'blur' }
          ],
          loginName: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 8, max: 16, message: '请输入8-16位字符', trigger: 'blur' }
          ],
          phone: [
            { validator: checkPhone , required: true, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail , required: true, trigger: 'blur' }
          ],
          seq: [
            {required: true, message:'请输入排序' , trigger: 'blur' }
          ],
          status: [
            {required: true, message:'请选择状态' , trigger: 'change' }
          ]
        },
        options: [{value: 1,label: '可用'}, {value: 2,label: '不可用'}],//下来框选项
        ruleForm: 'ruleForm' //form标识
      }
    },
    props: {
      isFormDialog: {
        type: Boolean,
        default: false
      },
      formObj: {
        type: Object,
        default: {}
      },
      title: {
        type: String,
        default: '添加'
      }
    },
    methods: {
      closeClick(formName) {
        this.$refs[formName].resetFields();
        this.$parent.isFormDialog = false;
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if(null != this.formObj.id && this.formObj.id != '' && this.formObj.id != undefined){
              this.update();
            }else {
              this.insert();
            }
          } else {
            return false;
          }
        });
      },
      insert() {
        insert(this.formObj).then( res =>{
          if(res.data.success){
            this.$message.success(res.data.message);
            this.$parent.isFormDialog = false;
            this.$parent.searchUserList();
          }else {
            this.$message.error(res.data.message);
          }
        });
      },
      update() {
        update(this.formObj).then( res =>{
          if(res.data.success){
            this.$message.success(res.data.message);
            this.$parent.isFormDialog = false;
            this.$parent.searchUserList();
          }else {
            this.$message.error(res.data.message);
          }
        });
      }
    }
  }

</script>
