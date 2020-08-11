<template>
  <div style="background-color: #ffffff;height: 100%;width: 100%;">
    <div style="padding: 10px;">
      <div style="padding-bottom: 30px;padding-top: 10px;">
        <el-row :gutter="10">
          <el-col :span="2"><div style="font-size:14px;color: #a3a3a5;padding-top: 5px;padding-left: 10px;">用户名:</div></el-col>
          <el-col :span="4"><el-input v-model="loginName" placeholder="请输入用户名"></el-input></el-col>
          <el-col :span="2"><div style="font-size:14px;color: #a3a3a5;padding-top: 5px;padding-left: 20px;">状态:</div></el-col>
          <el-col :span="4">
            <el-select v-model="status" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="1">
            <el-button type="primary" @click="searchUserList">查 询</el-button>
          </el-col>
        </el-row>
      </div>
      <div style="padding-bottom: 10px;margin-left: 10px;">
        <h5>用户列表</h5>
      </div>
      <el-table :data="tableData" size="mini" border stripe style="width: 100%" highlight-current-row>
        <el-table-column fixed prop="name" label="姓名" align="center"/>
        <el-table-column prop="loginName" label="用户名" align="center"/>
        <el-table-column prop="email" label="邮箱" align="center"/>
        <el-table-column prop="phone" label="手机号" align="center"/>
        <el-table-column prop="seq" label="排序" align="center"/>
        <el-table-column prop="status" label="状态" align="center"/>
        <el-table-column prop="describe" label="描述" align="center"/>
        <el-table-column fixed="right" align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400">
      </el-pagination>
    </div>
  </div>
</template>

<script>

  import {search} from "network/system/user";

  export default {
    methods: {
      //查看
      handleClick(row) {
        console.log(row);
      },
      //加载列表
      searchUser(){
        search().then(res => {
          this.tableData = res.data.data;
        })
      },
      //条件查询
      searchUserList(){
        alert(this.loginName)
        alert(this.status)
      },
      handleSizeChange(val) {
        alert(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        alert(`当前页: ${val}`);
      }
    },
    created(){
      this.searchUser();
    },
    data() {
      return {
        options: [{
          value: '1',
          label: '可用'
        }, {
          value: '2',
          label: '不可用'
        }],
        tableData: [],
        status: null,
        loginName: "",
        currentPage:1
      }
    }
  }
</script>

<style>
  .content {
    padding: 0px;
    overflow-y: hidden;
  }
</style>