<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 已注册账户信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <el-select
          v-model="query.user_flag"
          placeholder="审核状态"
          class="handle-select mr10"
        >
          <el-option key="1" label="审核通过" :value="2"></el-option>
          <el-option key="2" label="待审核" :value="0"></el-option>
          <el-option key="3" label="审核未通过" :value="1"></el-option>
        </el-select>
        <el-select
          v-model="query.user_type"
          placeholder="用户类型"
          class="handle-select mr10"
        >
          <el-option key="1" label="企业管理员" :value="2"></el-option>
          <el-option key="2" label="普通用户" :value="1"></el-option>
        </el-select>
        <el-input
          v-model="query.user_tel"
          placeholder="电话"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" icon="el-icon-search" @click="handleSearch"
          >搜索</el-button
        >
      </div>
      <el-table
        :data="tableData"
        border
        class="table"
        ref="multipleTable"
        header-cell-class-name="table-header"
      >

        <el-table-column prop="user_tel" label="用户电话"></el-table-column>
        <el-table-column prop="user_email" label="用户邮箱"></el-table-column>
        
        <!-- <el-table-column label="头像(查看大图)" align="center">
          <template #default="scope">
            <el-image
              class="table-td-thumb"
              :src="scope.row.thumb"
              :preview-src-list="[scope.row.thumb]"
            >
            </el-image>
          </template>
        </el-table-column> -->
        <el-table-column prop="user_type" label="用户类型">
          <template #default="scope">
            <el-tag v-if="scope.row.user_type == 2">管理员</el-tag>
            <el-tag v-else type="info">普通用户</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="审核状态" prop="user_flag" align="center">
          <template #default="scope">
            <el-tag type="success" v-if="scope.row.user_flag == 2">审核通过</el-tag>
            <el-tag type="info" v-else-if="scope.row.user_flag == 0">待审核</el-tag>
            <el-tag type="danger" v-else>审核未通过</el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="date" label="注册时间"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="scope.row.user_flag == 0"
              >审核通过
            </el-button>
            <el-button
              type="text"
              class="red"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="scope.row.user_flag == 0"
              >审核不通过</el-button
            >
            <el-button
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="scope.row.user_flag == 1"
              
              >发送邮件
            </el-button>
            <el-button
              type="text"
              @click="handleEdit(scope.$index, scope.row)"
              v-if="scope.row.user_flag == 2"

              >分配角色
            </el-button>
          </template>
          <!-- <template #default="scope" v-else-if="scope.row.user_flag == 1">
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >发送邮件
            </el-button>
          </template>
          <template #default="scope" v-else>
            <el-button
              type="text"
              icon="el-icon-edit"
              @click="handleEdit(scope.$index, scope.row)"
              >分配角色
            </el-button>
          </template> -->
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="query.pageIndex"
          :page-size="query.pageSize"
          :total="pageTotal"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="form.user_tel"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="form.user_flag"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveEdit">确 定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { fetchData } from "../api/index";
import { getCurrentInstance } from "vue";
export default {
  name: "basetable",
  setup() {
    const $this = getCurrentInstance();
    const query = reactive({
      user_flag: "", // 审核状态。0-待审核 1-不通过 2-通过
      user_tel: "",
      user_type: "",
      pageIndex: 1,
      pageSize: 10,
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      console.log($this);
      fetchData(query).then((res) => {
        tableData.value = res.list;
        pageTotal.value = res.pageTotal || 50;
      });
    };
    getData();

    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      getData();
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
        .then(() => {
          ElMessage.success("删除成功");
          tableData.value.splice(index, 1);
        })
        .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      user_tel: "",
      user_flag: "",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      form,
      handleSearch,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
