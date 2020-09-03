<template>
  <div class="panel">
    <div class="panel-item">
      <div class="panel-where">
        <!--查询条件-->
        <el-row :gutter="10">
          <el-col :span="1">
            <div class="label">用户名:</div>
          </el-col>
          <el-col :span="4">
            <el-input v-model="params.loginName" size="mini" placeholder="请输入用户名"></el-input>
          </el-col>
          <el-col :span="1">
            <div class="label">状态:</div>
          </el-col>
          <el-col :span="4">
            <el-select v-model="params.status" size="mini" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-col>
          <el-col :span="2">
            <div class="label">创建时间:</div>
          </el-col>
          <el-col :span="9">
            <div class="block">
              <el-date-picker
                      @change="packParams"
                      size="mini"
                      v-model="dates"
                      value-format="yyyy-MM-dd HH:mm:ss"
                      type="daterange"
                      :clearable="false"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="button-align">
              <el-button type="primary" title="查 询" icon="el-icon-search" @click="searchUserList" circle></el-button>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="button-align">
              <el-button type="warning" title="重 置" icon="el-icon-refresh-left" @click="resetWhere" circle></el-button>
            </div>
          </el-col>
          <el-col :span="1">
            <div class="button-align">
              <el-button type="success" title="添 加" icon="el-icon-circle-plus-outline" @click="add" circle></el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="table-panel">
        <div class="table-title">
          <h5>用户列表</h5>
        </div>
        <el-table :data="parseTableData" size="mini" border stripe style="width: 100%" highlight-current-row>
          <el-table-column type="expand"></el-table-column>
          <el-table-column v-for="(item,index) in table.tableColumn" :type="item.type" :width="item.width"
                           :prop="item.prop" :label="item.label" :align="item.align"/>
          <el-table-column align="center" fixed="right" width="100px" label="操作">
            <template slot-scope="scope">
              <el-row :gutter="0">
                <el-col :span="6">
                  <li class="el-icon-search" title="查看" @click="view(scope.row)"></li>
                </el-col>
                <el-col :span="6">
                  <li class="el-icon-edit" title="编辑" @click="edit(scope.row)"></li>
                </el-col>
                <el-col :span="6">
                  <li class="el-icon-delete" title="删除" @click="deleteById(scope.row)"></li>
                </el-col>
                <el-col :span="6">
                  <li class="el-icon-setting" title="重置密码" @click="resetPassword(scope.row)"></li>
                </el-col>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
        <div class="page-position">
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="params.page"
                  :page-sizes="[5,10, 15, 20, 25]"
                  :page-size=params.size
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="table.total">
          </el-pagination>
        </div>
      </div>
      <!--查看详情弹出组件-->
      <UserView :isViewDialog="isViewDialog" :viewObj="viewObj"></UserView>
      <!--添加 or 修改 from弹出组件-->
      <UserForm :isFormDialog="isFormDialog" :formObj="formObj"></UserForm>
      <!--重置密码弹出组件-->
      <UserResetPass :UserResetPass="UserResetPass" :id="id"></UserResetPass>
    </div>
  </div>
</template>

<script>

  import {search, deleteById, findById} from "network/system/user";
  import UserView from "views/system/user/UserView";
  import UserForm from "views/system/user/UserForm";
  import UserResetPass from "views/system/user/UserResetPass";

  export default {
    components: {
      UserView,
      UserForm,
      UserResetPass
    },
    methods: {
      //查看
      view(row) {
        findById(row.id).then(res => {
          this.viewObj = res.data
        });
        this.isViewDialog = true;
      },
      //添加
      add() {
        this.formObj = {};
        this.isFormDialog = true;
      },
      //修改
      edit(row) {
        findById(row.id).then(res => {
          this.formObj = res.data
        });
        this.isFormDialog = true;
      },
      //删除
      deleteById(row) {
        deleteById(row.id).then(res => {
          this.search(this.currentPage, this.pageSize, this.status, this.loginName);
          if (res.data.success) {
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      //重置密码
      resetPassword(row) {
        this.id = row.id;
        this.UserResetPass = true;
      },
      //加载列表
      search(params) {
        search(params).then(res => {
          this.table.tableData = res.data.data;
          this.table.total = res.data.count;
        })
      },
      //查询
      searchUserList() {
        this.search(this.params);
      },
      //重置
      resetWhere() {
        this.params.startDate = '';
        this.params.endDate = '';
        this.params.loginName = '';
        this.params.status = null;
        this.dates = '';
      },
      //分页每页多少条改变change事件
      handleSizeChange(val) {
        this.params.size = val;
        this.search(this.params);
      },
      //分页当前页改变change事件
      handleCurrentChange(val) {
        this.params.page = val;
        this.search(this.params);
      },
      //封装查询条件
      packParams() {
        if (this.dates.length > 0) {
          this.params.startDate = this.dates[0];
          this.params.endDate = this.dates[1];
        }
      }
    },
    //vue实例加载完成后调用列表查询
    created() {
      this.search(this.params);
    },
    computed: {
      //处理列表显示内容
      parseTableData() {
        for (let data of this.table.tableData) {
          data.status = data.status == 1 ? '可用' : '不可用';
        }
        return this.table.tableData;
      }
    },
    data() {
      return {
        params: {//查询参数
          page: 1,
          size: 5,
          loginName: '',
          status: null,
          startDate: '',
          endDate: ''
        },
        table: {//列表参数
          tableData: [],
          total: null,
          tableColumn: column
        },
        options: [{value: '1', label: '可用'}, {value: '2', label: '不可用'}],//下来框选项
        isViewDialog: false,//是否打开详情页面弹出框
        isFormDialog: false,//是否打开form页面弹出框
        UserResetPass: false,//是否打开重置密码页面弹出框
        viewObj: {},//给详情弹出框传入要展示的对象
        formObj: {},//修改时传入组件内回显对象
        id: '',//重置密码传入弹出框的值
        dates: '',//时间输入框接收值
      }
    }
  }

  //table-column循环遍历展示table列
  const column = [
    {
      prop: 'id',
      label: '序列',
      align: 'center',
      width: '50px',
      type: 'index'
    },
    {
      prop: 'name',
      label: '姓名',
      align: 'center',
      width: '100px'
    }, {
      prop: 'loginName',
      label: '用户名',
      align: 'center',
      width: '100px'
    }, {
      prop: 'email',
      label: '邮箱',
      align: 'center',
      width: '200px'
    }, {
      prop: 'phone',
      label: '手机号',
      align: 'center',
      width: '100px'
    }, {
      prop: 'seq',
      label: '排序',
      align: 'center'
    }, {
      prop: 'status',
      label: '状态',
      align: 'center'
    }, {
      prop: 'createdBy',
      label: '创建人',
      align: 'center',
      width: '100px'
    }, {
      prop: 'createdAt',
      label: '创建时间',
      align: 'center',
      width: '150px'
    }, {
      prop: 'modifiedBy',
      label: '修改人',
      align: 'center',
      width: '100px'
    }, {
      prop: 'modifiedAt',
      label: '修改时间',
      align: 'center',
      width: '150px'
    }
  ]
</script>

<style>

  .label {
    text-align: right;
    font-size: 12px;
    font-weight: bold;
    margin-top: 5px;
    color: #222222;
  }

  .page-position {
    position: fixed;
    right: 20px;
    margin-top: 10px;
  }

  .table-title {
    float: left;
    font-size: 16px;
    color: #222222;
    font-weight: bold;
  }

  .table-panel {
    padding-top: 10px;
  }

  .button-align {
    text-align: right;
  }

  .panel {
    background-color: #ffffff;
    height: 100%;
    width: 100%;
  }

  .panel-item {
    padding: 10px;
  }

  .panel-where {
    border-radius: 10px;
    padding: 20px 20px 20px 20px;
    background-color: #f7f7f7;
  }

</style>