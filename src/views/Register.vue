<template>
  <div class="register-wrap">
    <div class="register-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="企业管理员注册" name="admin">
          <el-scrollbar height="60vh">
            <el-form
              ref="adminForm"
              :model="adminForm"
              :rules="rules"
              label-width="120px"
              class="demo-adminForm"
            >
              <el-form-item label="企业名称" prop="enterprise_name">
                <el-input v-model="adminForm.enterprise_name"></el-input>
              </el-form-item>
              <el-form-item label="组织机构代码" prop="organization_id">
                <el-input v-model="adminForm.organization_id"></el-input>
              </el-form-item>
              <el-form-item label="企业类型" prop="enterprise_type">
                <!-- <el-col :span="24" class="select-container"> -->
                <el-select
                  v-model="adminForm.enterprise_type"
                  placeholder=""
                  style="width: 100%"
                >
                  <el-option label="type 1" value="type1"></el-option>
                  <el-option label="type 2" value="type2"></el-option>
                </el-select>
                <!-- </el-col> -->
              </el-form-item>
              <el-form-item label="所在地区" prop="enterprise_location">
                <el-input
                  v-model="adminForm.enterprise_location"
                  placeholder="如河北省秦皇岛市海港区"
                ></el-input>
              </el-form-item>
              <el-form-item label="地址" prop="enterprise_address">
                <el-input
                  v-model="adminForm.enterprise_address"
                  placeholder="XX街道XX门牌号"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="enterprise_email">
                <el-input
                  v-model="adminForm.enterprise_email"
                  placeholder=""
                ></el-input>
              </el-form-item>
              <el-form-item label="设置密码" prop="enterprise_passwd">
                <el-input
                  v-model="adminForm.enterprise_passwd"
                  placeholder=""
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="重复密码" prop="enterprise_passwd_again">
                <el-input
                  v-model="adminForm.enterprise_passwd_again"
                  placeholder=""
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="企业电话" prop="enterprise_tel">
                <el-input
                  v-model="adminForm.enterprise_tel"
                  placeholder="输入电话号"
                ></el-input>
              </el-form-item>
              <el-form-item label="法人身份证号" prop="legal_id_num">
                <el-input
                  v-model="adminForm.legal_id_num"
                  placeholder=""
                ></el-input>
              </el-form-item>
              <el-form-item label="法人姓名" prop="legal_name">
                <el-input
                  v-model="adminForm.legal_name"
                  placeholder=""
                ></el-input>
              </el-form-item>
              <el-form-item label="法人电话" prop="legal_tel">
                <el-input
                  v-model="adminForm.legal_tel"
                  placeholder=""
                ></el-input>
              </el-form-item>
              <el-form-item label="营业执照" prop="b_image">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="法人身份证" prop="l_image">
                <el-upload
                  class="avatar-uploader"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                  <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="企业用户注册" name="user">
          <el-scrollbar height="60vh">
            <el-form
              ref="userForm"
              :model="userForm"
              :rules="userRules"
              label-width="120px"
              class="demo-adminForm"
            >
              <el-form-item label="所属企业" prop="enterprise_id">
                <el-select
                  v-model="userForm.enterprise_id"
                  placeholder=""
                  style="width: 100%"
                >
                  <el-option label="企业1" value="01"></el-option>
                  <el-option label="企业2" value="02"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="email" prop="user_email">
                <el-input v-model="userForm.user_email"></el-input>
              </el-form-item>
              <el-form-item label="设置密码" prop="user_passwd">
                <el-input
                  v-model="userForm.user_passwd"
                  placeholder=""
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="重复密码" prop="user_passwd_again">
                <el-input
                  v-model="userForm.user_passwd_again"
                  placeholder=""
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户类型" prop="user_type">
                <el-select
                  v-model="userForm.user_type"
                  placeholder=""
                  style="width: 100%"
                >
                  <el-option label="管理员" value="01"></el-option>
                  <el-option label="普通用户" value="02"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="用户电话" prop="user_tel">
                <el-input
                  v-model="userForm.user_tel"
                  placeholder="请输入电话号码"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
      <div class="btn-container">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
        <el-button type="primary" @click="toLogin"
          >去登录<i class="el-icon-arrow-right el-icon-right"></i
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  data() {
    // 密码验证
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请设置密码"));
      } else {
        if (this.adminForm.enterprise_passwd_again !== "") {
          this.$refs.adminForm.validateField("enterprise_passwd_again");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value !== this.adminForm.enterprise_passwd) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };

    const validatePassUser = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请设置密码"));
      } else {
        if (this.userForm.user_passwd_again !== "") {
          this.$refs.userForm.validateField("user_passwd_again");
        }
        callback();
      }
    };
    const validatePassUser2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请确认密码"));
      } else if (value !== this.userForm.user_passwd) {
        callback(new Error("两次密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "",
      tabName: "管理员注册",
      activeName: "admin",
      adminForm: {
        organization_id: "",
        enterprise_name: "",
        enterprise_type: "",
        enterprise_location: "",
        enterprise_address: "",
        enterprise_email: "",
        enterprise_passwd: "",
        enterprise_passwd_again: "",
        enterprise_tel: "",
        legal_name: "",
        legal_id_num: "",
        legal_tel: "",
        businesslicense_image: "",
        legal_id_image: "",
        register_date: "",
        review_date: "",
        enterprise_id: "",
        enterprise_flag: "",
      },
      userForm: {
        user_email: "",
        user_passwd: "",
        user_passwd_again: "",
        user_tel: "",
        user_type: "",
        user_role: "",
        enterprise_id: "",
        user_flag: "",
      },
      userRules: {
        enterprise_id: {
          required: true,
          message: "请选择企业",
          trigger: "blur",
        },
        user_email: {
          required: true,
          message: "请输入email",
          trigger: "blur",
        },
        user_passwd: {
          validator: validatePassUser,
          trigger: "blur",
        },
        user_passwd_again: {
          validator: validatePassUser2,
          trigger: "blur",
        },
        user_type: {
          required: true,
          message: "请选择用户类型",
          trigger: "blur",
        },
        user_tel: {
          required: true,
          message: "请输入用户电话",
          trigger: "blur",
        },
      },
      rules: {
        enterprise_name: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur",
          },
        ],
        enterprise_passwd: [
          {
            trigger: "blur",
            validator: validatePass,
          },
        ],
        enterprise_passwd_again: [
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        organization_id: [
          {
            required: true,
            message: "请输入机构代码",
            trigger: "blur",
          },
        ],
        enterprise_type: [
          {
            required: true,
            message: "请选择企业类型",
            trigger: "blur",
          },
        ],
        enterprise_location: [
          {
            required: true,
            message: "请输入企业所在地区",
            trigger: "blur",
          },
        ],
        enterprise_address: [
          {
            required: true,
            message: "请输入企业具体地址",
            trigger: "blur",
          },
        ],
        enterprise_email: [
          {
            required: true,
            message: "请输入具体邮箱",
            trigger: "blur",
          },
          {
            min: 7,
            max: 15,
            message: "邮箱格式错误",
            trigger: "blur",
          },
        ],
        enterprise_tel: [
          {
            required: true,
            message: "请输入企业联系电话",
            trigger: "blur",
          },
        ],
        legal_id_num: [
          {
            required: true,
            message: "请输入法人身份证号",
            trigger: "blur",
          },
        ],
        legal_name: [
          {
            required: true,
            message: "请输入法人姓名",
            trigger: "blur",
          },
        ],
        legal_tel: [
          {
            required: true,
            message: "请输入联系人电话",
            trigger: "blur",
          },
        ],
        busPhoto: [
          {
            required: true,
            message: "请上传企业图片",
            trigger: "blur",
          },
        ],
        idPhoto: [
          {
            required: true,
            message: "请上传身份证图片",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    const router = useRouter();
    console.log(router);
    this.$router = router;
  },
  methods: {
    handleClick(tab) {
      this.tabName = tab.props.label;
      console.log(tab.props.label);
    },
    submitForm() {
      var $this = this;
      var formName = this.tabName.includes("管理员注册") ? "adminForm" : "userForm";

      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log($this[formName]);
          ElMessage.success("注册成功, 请登录！");
          $this.$router.push("/login");
        } else {
          console.log("error submit!!");
          console.log($this[formName]);

          return false;
        }
      });
    },
    resetForm() {
      var formName = this.tabName.includes("管理员注册") ? "adminForm" : "userForm";
      this.$refs[formName].resetFields();
    },
    toLogin() {
      this.$router.push("/login");
    },

    // 图片相关
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw)
      console.log(1111111);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        ElMessage.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        ElMessage.error("Avatar picture size can not exceed 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
};
</script>

<style scoped>
.register-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  background-color: #f0f0f0;
  justify-content: center;
  align-items: center;
  /* padding: 40px; */
}
.register-container {
  width: 40vw;
  /* border: 1px solid gray; */
  background-color: rgb(245 245 245);
  padding: 20px;
  border-radius: 30px;
}

.demo-adminForm {
  padding-right: 25px;
}

.select-container .el-select {
  width: 100%;
}

.btn-container {
  margin-top: 20px;
  text-align: center;
}

/* 图片相关 */
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: inherit;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>