<template>
  <el-dialog title="重置密码" :close-on-click-modal="false" width="25%" @close="close(refName)"
             :visible.sync="UserResetPass">
    <el-form :model="ruleForm" status-icon :rules="rules" :ref="refName" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="usedPass">
        <el-input v-model.number="ruleForm.usedPass"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="newPass">
        <el-input type="password" v-model="ruleForm.newPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(refName)">提交</el-button>
        <el-button @click="close(refName)">关闭</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>

  import {restPassword} from "network/system/user";

  export default {
    props: {
      id: {
        type: String,
        default: ''
      },
      UserResetPass: {
        type: Boolean,
        default: false
      }
    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value.length < 8 || value.length > 16) {
          callback(new Error('请输入8-16位密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newPass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        refName: 'ruleForm',
        ruleForm: {
          usedPass: '',
          newPass: '',
          checkPass: ''
        },
        rules: {
          usedPass: [
            {required: true, message: '请输入旧密码', trigger: 'blur'}
          ],
          newPass: [
            {validator: validatePass, required: true, trigger: 'blur'}
          ],
          checkPass: [
            {validator: validatePass2, required: true, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            restPassword(this.ruleForm.usedPass, this.ruleForm.newPass, this.id).then(res => {
              console.log(res.data.success);
              if (res.data.success) {
                this.close(this.refName);
                this.$message.success(res.data.message);
              } else {
                this.$message.error(res.data.message);
              }
            })
          } else {
            return false;
          }
        });
      },
      close(formName) {
        this.$parent.UserResetPass = false;
        this.$parent.id = '';
        this.$refs[formName].resetFields();
      }
    }
  }
</script>