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
      <el-table :data="parseTableData" size="mini" border stripe style="width: 100%" highlight-current-row>
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
            <el-button @click="deleteById(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="position: fixed;right: 20px;margin-top: 10px;">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 15, 20, 25]"
                :page-size=pageSize
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </div>
      <el-dialog
              title="详情"
              :visible.sync="centerDialogVisible"
              :center="true"
              style="align-content: center">
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>

  import {search,deleteById} from "network/system/user";

  export default {
    methods: {
      //查看
      handleClick(row) {
        this.centerDialogVisible = true;
      },
      //删除
      deleteById(row) {
        deleteById(row.id).then(res => {
          this.searchUser(this.currentPage,this.pageSize,this.status,this.loginName);
          if(res.data.success){
            this.$message.success(res.data.message);
          }else {
            this.$message.error(res.data.message);
          }
        })
      },
      //加载列表
      searchUser(currentPage,pageSize,status,loginName){
        search(currentPage,pageSize,status,loginName).then(res => {
          this.tableData = res.data.data;
          this.total = res.data.count;
        })
      },
      //条件查询
      searchUserList(){
        this.searchUser(this.currentPage,this.pageSize,this.status,this.loginName);
      },
      //分页change时间
      handleSizeChange(val) {
        this.searchUser(this.currentPage,val,this.status,this.loginName);

      },
      //分页change时间
      handleCurrentChange(val) {
        this.searchUser(val,this.pageSize,this.status,this.loginName);
      }
    },
    created() {
      this.searchUser(this.currentPage,this.pageSize,this.status,this.loginName);
    },
    computed: {
      parseTableData() {
        for(let data of this.tableData){
          data.status=data.status==1?'可用':'不可用';
        }
        return this.tableData;
      }
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
        total: null,
        centerDialogVisible: false,
        currentPage:1,
        pageSize:10,
        status: null,
        loginName: ""
      }
    }
  }
</script>

<style>
  .content {
    padding: 0px;
    overflow-y: auto;
  }
</style>