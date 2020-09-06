<template>
  <div class="panel">
    <div class="panel-item">
      <div class="table-panel">
        <div class="table-title">
          <h5>加班核对列表</h5>
        </div>
        <div style="float:right;padding-bottom: 10px;">
          <el-button type="primary" @click="openImport">导入</el-button>
          <el-button type="success">导出</el-button>
        </div>
        <el-table :data="table.tableData" size="mini" border stripe style="width: 100%" highlight-current-row>
          <el-table-column v-for="(item,index) in table.tableColumn" :type="item.type" :width="item.width"
                           :prop="item.prop" :label="item.label" :align="item.align"/>
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
        <import-excel :isImportDialog="isImportDialog"></import-excel>
      </div>
    </div>
  </div>
</template>

<script>

  import {search} from "network/excelcheck/overtime/checkOverTime";
  import ImportExcel from "./ImportExcel";

  export default {
    components: {
      ImportExcel
    },
    methods: {
      //导入
      openImport() {
        this.isImportDialog = true;
      },
      //加载列表
      search(params) {
        search(params).then(res => {
          console.log(res.data.data);
          this.table.tableData = res.data.data;
          this.table.total = res.data.count;
        })
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
      }
    },
    //vue实例加载完成后调用列表查询
    created() {
      this.search(this.params);
    },
    data() {
      return {
        params: {//查询参数
          page: 1,
          size: 5
        },
        table: {//列表参数
          tableData: [],
          total: null,
          tableColumn: column
        },
        isImportDialog: false
      }
    }
  }

  //table-column循环遍历展示table列
  const column = [
    { prop: 'dno', label: '单据号', align: 'center', width: '100px'},
    { prop: 'account', label: '账号', align: 'center', width: '100px'},
    { prop: 'name', label: '姓名', align: 'center', width: '100px'},
    { prop: 'outCompany', label: '外包公司', align: 'center', width: '100px'},
    { prop: 'timeType', label: '加班类型', align: 'center', width: '100px'},
    { prop: 'startTime', label: '开始日期', align: 'center', width: '150px'},
    { prop: 'endTime', label: '结束日期', align: 'center', width: '150px'},
    { prop: 'timeHour', label: '加班小时数', align: 'center', width: '100px'},
    { prop: 'checkInHour', label: '签入小时数', align: 'center', width: '100px'},
    { prop: 'checkInTime', label: '签入时间', align: 'center', width: '150px'},
    { prop: 'checkOutTime', label: '签出时间', align: 'center', width: '150px'},
    { prop: 'ceaseDay', label: '调休天数', align: 'center', width: '100px'},
    { prop: 'knotDay', label: '结算天数', align: 'center', width: '100px'},
    { prop: 'reasonsOvertime', label: '加班事由', align: 'center', width: '100px'},
    { prop: 'projectOvertime', label: '加班项目', align: 'center', width: '100px'},
    { prop: 'submitTime', label: '提交日期', align: 'center', width: '150px'},
    { prop: 'currentStatus', label: '当前状态', align: 'center', width: '100px'},
    { prop: 'reviewedBys', label: '已审核人', align: 'center', width: '100px'},
    { prop: 'serviceGroup', label: '服务事业群', align: 'center', width: '100px'},
    { prop: 'outsourceType', label: '外包类型', align: 'center', width: '100px'},
    { prop: 'city', label: '所在城市', align: 'center', width: '100px'},
    { prop: 'status', label: '状态', align: 'center', width: '100px'},
    { prop: 'statusMessage', label: '状态中文编码', align: 'center', width: '100px'}
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