<template>
  <div style="background-color: #ffffff;height: 100%;width: 100%;">
    <div style="padding: 10px;">
      <div style="padding-bottom: 30px;padding-top: 10px;">
        <el-row :gutter="10">
          <el-col :span="1"><div class="label">用户名:</div></el-col>
          <el-col :span="4"><el-input v-model="params.loginName" placeholder="请输入用户名"></el-input></el-col>
          <el-col :span="1"><div class="label">状态:</div></el-col>
          <el-col :span="4">
            <el-select v-model="params.status" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="1"><div class="label">创建:</div></el-col>
          <el-col :span="7">
            <div class="block">
              <el-date-picker
                      v-model="params.dates"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="text-align: right">
              <el-button type="primary" size="mini" class="el-icon-search" @click="searchUserList">查询</el-button>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="text-align: left">
              <el-button type="warning" size="mini" class="el-icon-refresh-left" @click="resetWhere">重置</el-button>
            </div>
          </el-col>
          <el-col :span="2">
            <div style="text-align: right">
              <el-button type="success" size="mini" class="el-icon-circle-plus-outline" @click="searchUserList">添加</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div style="float: left;font-size: 16px;color: #222222;font-weight: bold;">
        <h5>用户列表</h5>
      </div>
      <el-table :data="parseTableData" size="mini" border stripe style="width: 100%" highlight-current-row>
        <el-table-column  v-for="item in table.tableColumn" :prop="item.prop" :label="item.label" :align="item.align"/>
        <el-table-column align="center"  label="操作">
          <template slot-scope="scope">
            <el-row :gutter="0">
              <el-col :span="8"><i class="el-icon-search" @click="handleClick(scope.row)"></i></el-col>
              <el-col :span="8"><i class="el-icon-edit"></i></el-col>
              <el-col :span="8"><i class="el-icon-delete" @click="deleteById(scope.row)"></i></el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div style="position: fixed;right: 20px;margin-top: 10px;">
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="params.page"
                :page-sizes="[10, 15, 20, 25]"
                :page-size=params.size
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
      </div>
      <!--查看详情弹出组件-->
      <UserDetail :isDetailDialog="isDetailDialog" :detailObj="detailObj"></UserDetail>
    </div>
  </div>
</template>

<script>

  import {search,deleteById,findById} from "network/system/user";
  import UserDetail from "./UserDetail";

  export default {
    components: {
      UserDetail
    },
    methods: {
      //加载列表
      search(params){
        search(params).then(res => {
          this.table.tableData = res.data.data;
          this.table.total = res.data.count;
        })
      },
      //查询
      searchUserList(){
        this.packParams();
        this.search(this.params);
      },
      //重置
      resetWhere(){
        this.params.startDate = null;
        this.params.endDate = null;
        this.params.loginName = '';
        this.params.status = null;
        this.params.dates = '';
      },
      //查看
      handleClick(row) {
        findById(row.id).then( res => {
          this.detailObj =  res.data
        });
        this.isDetailDialog = true;
      },
      //删除
      deleteById(row) {
        deleteById(row.id).then(res => {
          this.search(this.currentPage,this.pageSize,this.status,this.loginName);
          if(res.data.success){
            this.$message.success(res.data.message);
          }else {
            this.$message.error(res.data.message);
          }
        })
      },
      //分页change事件
      handleSizeChange(val) {
        this.packParams();
        this.params.size = val;
        this.search(this.params);
      },
      //分页change事件
      handleCurrentChange(val) {
        this.packParams();
        this.params.page = val;
        this.search(this.params);
      },
      //封装查询条件
      packParams() {
        const arr = this.params.dates.split(",");
        this.params.startDate = arr[0],
        this.params.endDate = arr[1]
      }
    },
    //vue实例加载完成后调用列表查询
    created() {
      this.search(this.params);
    },
    computed: {
      //处理列表显示内容
      parseTableData() {
        for(let data of this.table.tableData){
          data.status=data.status == 1?'可用':'不可用';
        }
        return this.table.tableData;
      }
    },
    data() {
      return {
        params: {//查询参数
          page:1,
          size:10,
          loginName: '',
          status: null,
          dates: '',
          startDate: null,
          endDate: null
        },
        table: {//列表参数
          tableData: [],
          total: null,
          tableColumn: column
        },
        options: [{value: '1',label: '可用'}, {value: '2',label: '不可用'}],//下来框选项
        isDetailDialog: false,//是否打开详情页面弹出框
        detailObj: {}//给详情弹出框传入要展示的对象
      }
    }
  }

  const column = [
    {
      prop: 'name',
      label: '姓名',
      align: 'center'
    },{
      prop: 'loginName',
      label: '用户名',
      align: 'center'
    },{
      prop: 'email',
      label: '邮箱',
      align: 'center'
    },{
      prop: 'phone',
      label: '手机号',
      align: 'center'
    },{
      prop: 'seq',
      label: '排序',
      align: 'center'
    },{
      prop: 'status',
      label: '状态',
      align: 'center'
    },{
      prop: 'describe',
      label: '描述',
      align: 'center'
    }
  ]
</script>

<style>
  .content {
    padding: 0px;
    overflow-y: auto;
  }

  .label{
    text-align: right;
    font-size: 12px;
    font-weight: bold;
    margin-top: 5px;
    color: #222222;
  }

</style>