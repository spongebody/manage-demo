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
                <el-input
                  v-model="adminForm.enterprise_name"
                  placeholder="请输入企业名称"
                ></el-input>
              </el-form-item>
              <el-form-item label="组织机构代码" prop="organization_id">
                <el-input
                  v-model="adminForm.organization_id"
                  placeholder="请输入组织机构代码"
                ></el-input>
              </el-form-item>
              <el-form-item label="企业类型" prop="enterprise_type">
                <!-- <el-col :span="24" class="select-container"> -->
                <el-select
                  v-model="adminForm.enterprise_type"
                  placeholder="请选择企业类型"
                  style="width: 100%"
                >
                  <el-option
                    v-for="item in roleList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                  <!-- <el-option label="type 1" value="type1"></el-option> -->
                  <!-- <el-option label="type 2" value="type2"></el-option> -->
                </el-select>
                <!-- </el-col> -->
              </el-form-item>

              <el-form-item label="所在地区" prop="provinceValue">
                <el-select
                  v-model="adminForm.provinceValue"
                  placeholder="请选择"
                  @change="selectProvimce"
                >
                  <el-option
                    v-for="(item, index) of provincearr"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-select
                  v-model="adminForm.cityValue"
                  placeholder="请选择"
                  @change="selectcity"
                >
                  <el-option
                    v-for="(item, index) of cityarr"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
                <el-select placeholder="请选择" v-model="adminForm.RegionValue">
                  <el-option
                    v-for="(item, index) of regionarr"
                    :key="index"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="地址" prop="enterprise_address">
                <el-input
                  v-model="adminForm.enterprise_address"
                  placeholder="请输入详细地址，如：XX街道XX门牌号"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="enterprise_email">
                <el-input
                  v-model="adminForm.enterprise_email"
                  placeholder="请输入邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item label="设置密码" prop="enterprise_passwd">
                <el-input
                  v-model="adminForm.enterprise_passwd"
                  placeholder="请输入密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="重复密码" prop="enterprise_passwd_again">
                <el-input
                  v-model="adminForm.enterprise_passwd_again"
                  placeholder="请重新输入密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="企业电话" prop="enterprise_tel">
                <el-input
                  v-model="adminForm.enterprise_tel"
                  placeholder="输入企业电话号"
                ></el-input>
              </el-form-item>
              <el-form-item label="法人身份证号" prop="legal_id_num">
                <el-input
                  v-model="adminForm.legal_id_num"
                  placeholder="请输入法人身份证号"
                ></el-input>
              </el-form-item>
              <el-form-item label="法人姓名" prop="legal_name">
                <el-input
                  v-model="adminForm.legal_name"
                  placeholder="请输入法人姓名"
                ></el-input>
              </el-form-item>
              <el-form-item label="法人电话" prop="legal_tel">
                <el-input
                  v-model="adminForm.legal_tel"
                  placeholder="请输入法人电话"
                ></el-input>
              </el-form-item>
              <el-form-item label="营业执照" prop="b_image">
                <el-upload
                  class="avatar-uploader"
                  action="aaaa"
                  ref="b_image"
                  ::limit="1"
                  :show-file-list="false"
                  :on-change="imagePreview1"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUploadbimage"
                >
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="法人身份证" prop="l_image">
                <el-upload
                  class="avatar-uploader"
                  action="aaaa"
                  ref="l_image"
                  ::limit="1"
                  :show-file-list="false"
                  :on-change="imagePreview2"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUploadlimage"
                >
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
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
                  placeholder="请选择所属企业"
                  style="width: 100%"
                >
                  <!-- <el-option label="企业1" value="01"></el-option> -->
                  <!-- <el-option label="企业2" value="02"></el-option> -->
                  <el-option
                    v-for="item in roleList2"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="email" prop="user_email">
                <el-input
                  v-model="userForm.user_email"
                  placeholder="请输入邮箱"
                ></el-input>
              </el-form-item>
              <el-form-item label="设置密码" prop="user_passwd">
                <el-input
                  v-model="userForm.user_passwd"
                  placeholder="请输入密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="重复密码" prop="user_passwd_again">
                <el-input
                  v-model="userForm.user_passwd_again"
                  placeholder="请重新输入密码"
                  type="password"
                ></el-input>
              </el-form-item>
              <el-form-item label="用户类型" prop="user_type">
                <el-select
                  v-model="userForm.user_type"
                  placeholder="请选择用户类型"
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
import axios from "axios";
// import  jsonData from '../store/china_address';
import { province } from '../store/china_address';

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

    ////////
    const checklocation = (rule, value, callback) => {
      if (!this.adminForm.provinceValue) {
	    	callback(new Error('请选择省份'));
	    } else if (!this.adminForm.cityValue) {
	    	callback(new Error('请选择城市'));
    	} else if (!this.adminForm.RegionValue) {
	    	callback(new Error('请选择地区'));
    	} else {
	    	callback();
    	}
    };


    //  定义有问题，记得改
    const checkNnterprisename = (rule, value, callback) => {
      axios.post(`http://211.81.248.108:8080/pltm-back/AdminRegist/check-enterprise_name`, value)
      .then(function(response){
        if (response.data.key === false) {
          callback(new Error("该公司已经存在，请检查信息填写是否正确！"));
        }else{
          callback();
        }
      }) 
    };


    const checkEmail = (rule, value, callback) => {
      // const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      const regEmail = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的邮箱"));
    };
    const checkMobile = (rule, value, callback) => {
      const regMobile =
        /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的手机号"));
    };
    const checkIDNum = (rule, value, callback) => {
      const regIDNum =
        /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (regIDNum.test(value)) {
        return callback();
      }
      callback(new Error("请输入正确的身份证号码"));
    };

    return {
      roleList: [], //保存后台请求的数据，企业注册
      roleList2: [], //保存后台请求的数据，所有企业
      imageUrl1: "",
      imageUrl2: "",
      tabName: "管理员注册",
      activeName: "admin",
      arr: [1, 3, 4],
      province: [],
      cityarr: [],
      regionarr: [],
      provinceValue: '',
      cityValue: '',
      RegionValue: '',
      formData: new window.FormData(),
      // enterprise_location : "", //所在地区
      adminForm: {
        identity: true, //表示注册界面类型，true为企业注册，false为用户注册
        organization_id: "", //企业编码
        enterprise_name: "", //去也名称
        enterprise_type: "", //企业类型
        // enterprise_location: "", //所在地区
        provinceValue: '',
        cityValue: '',
        RegionValue: '',
        enterprise_address: "", //地址
        enterprise_email: "", //邮箱
        enterprise_passwd: "", //设置密码
        enterprise_passwd_again: "", //重复密码
        enterprise_tel: "", //企业电话
        legal_name: "", //法人姓名
        legal_id_num: "", //法人身份证号
        legal_tel: "", //法人电话
        b_image : "",
        l_image : "",
      },
      userForm: {
        identity: false, //表示注册界面类型，true为企业注册，false为用户注册
        user_email: "", //邮箱
        user_passwd: "", //设置密码
        user_passwd_again: "", //重复密码
        user_tel: "", //用户电话
        user_type: "", //用户类型
        enterprise_id: "", //所属企业
      },
      userRules: {
        enterprise_id: {
          required: true,
          message: "请选择企业",
          trigger: "blur",
        },
        user_email: [
          {
            required: true,
            message: "请输入email",
            trigger: "blur",
          },
          {
            // 通过validator 进行自定义校验规则
            validator: checkEmail,
            trigger: "blur",
          },
        ],
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
        user_tel: [
          {
            required: true,
            message: "请输入用户电话",
            trigger: "blur",
          },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
      },
      rules: {
        enterprise_name: [
          {
            // required: true,
            // message: "请输入企业名称",
            trigger: "blur",
            validator : checkNnterprisename,
            //这里会有一个错误，改正之后要消除注释
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
            //此处添加一个触发器，用于检测数据
            // validator: validateDuplicateID,
          },
        ],
        building_id: {
          required: true, 
          validator: checklocation, 
          trigger: 'change'
          },
        enterprise_type: [
          {
            required: true,
            message: "请选择企业类型",
            trigger: "blur",
          },
        ],
        // enterprise_location: [
        //   {
        //     required: true,
        //     message: "请输入企业所在地区",
        //     trigger: "blur",
        //   },
        // ],
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
            // 通过validator 进行自定义校验规则
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        enterprise_tel: [
          {
            required: true,
            message: "请输入企业联系电话",
            trigger: "blur",
          },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
        legal_id_num: [
          {
            required: true,
            message: "请输入法人身份证号",
            trigger: "blur",
          },
          {
            validator: checkIDNum,
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
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
        // b_image: [
        //   {
        //     required: true,
        //     message: "请上传企业图片",
        //     trigger: "blur",
        //   },
        // ],
        // l_image: [
        //   {
        //     required: true,
        //     message: "请上传身份证图片",
        //     trigger: "blur",
        //   },
        // ],
      },
    };
  },
  created() {
    const router = useRouter();
    console.log(router);
    this.$router = router;

    // 地区选择联动
    this.provincearr = province
  },
  methods: {
    /**
     * 实现地区选择的下拉框
     */
    selectProvimce (id) {
      this.cityarr = [];
      this.regionarr = [];
      this.cityValue = '';
      this.RegionValue = '';
      for (let item of this.provincearr) {
        if (id == item.id) {
          console.log(item)
          this.cityarr = item.children
        }
      }
    },
    selectcity (id) {
      this.regionarr = [];
      this.RegionValue = '';
      for (let item of this.cityarr) {
        if (id == item.id) {
          this.regionarr = item.children
        }
      }
 
    },






    //动态显示后台数据到option,企业注册企业类型
    getrolelistBsType() {
      var $this = this;
      //此处端口用于查询企业类型
      axios
        .get(" https://mobile-ms.uat.homecreditcfc.cn/mock/6173873f0155e30027287c41/example/http:/gwpre.sina.com")
        .then((res) => {
          // console.log(res.data);
          let result = res.data.items; //items会根据返回的数据进行修改
          // console.log("角色获取列表：" +JSON.stringify(this.roleList));
          result.forEach((element) => {
            $this.roleList.push({ label: element.name, value: element.name });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //动态显示后台数据到option,用户注册所属企业
    getrolelistBelong() {
      var $this = this;
      //此处端口用于查询所有注册企业
      axios.get(" http://211.81.248.108:8080/pltm-back/AdminRegist/AdminRegist-selectall") .then((res) => {
          console.log(res.data);
          let result = res.data.items; //items会根据返回的数据进行修改
          // console.log("角色获取列表：" +JSON.stringify(this.roleList));
          result.forEach((element) => {
            $this.roleList2.push({ label: element.name, value: element.name });
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },

    //将tab标签中的label内容赋值给this.tabName
    handleClick(tab) {
      this.tabName = tab.props.label;
      console.log(tab.props.label);
    },
    //提交按钮绑定的的上传函数
    // submitForm() {
    //   var $this = this;
    //   var formName = this.tabName.includes("管理员注册") ? "adminForm" : "userForm";

    //   this.$refs[formName].validate((valid) => {
    //     if (valid) {
    //       console.log($this[formName]);
    //       ElMessage.success("注册成功, 请登录！");
    //       $this.$router.push("/login");
    //     } else {
    //       console.log("error submit!!");
    //       console.log($this[formName]);

    //       return false;
    //     }
    //   });
    // },

    //////////
    //提交按钮绑定的的提交函数
    submitForm() {
      var $this = this;
      console.log(111);
      // $this.formData = new FormData();
      var formName = this.tabName.includes("管理员注册")  ? "adminForm" : "userForm";
        if (formName === "adminForm") {
          console.log(2222);
          // var enterprise_location = $this.adminForm.provinceValue + $this.adminForm.cityValue + $this.adminForm.RegionValue;
          $this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(3333);
            $this.formData.append('orgnization_id', $this.adminForm.organization_id);
            $this.formData.append('enterprise_name', $this.adminForm.enterprise_name);
            $this.formData.append('enterprise_type', $this.adminForm.enterprise_type);
            $this.formData.append('enterprise_location', $this.adminForm.provinceValue + $this.adminForm.cityValue + $this.adminForm.RegionValue);
            $this.formData.append('enterprise_address', $this.adminForm.enterprise_address);
            $this.formData.append('enterprise_email', $this.adminForm.enterprise_email);
            $this.formData.append('enterprise_passwd', $this.adminForm.enterprise_passwd);
            $this.formData.append('enterprise_tel', $this.adminForm.enterprise_tel);
            $this.formData.append('legal_name', $this.adminForm.legal_name);
            $this.formData.append('legal_id_num', $this.adminForm.legal_id_num);
            $this.formData.append('legal_tel', $this.adminForm.legal_tel);
            
            console.log($this.formData.get('filea'));
            //此处接口用于传送企业注册表单数据
            axios.post(`https://mobile-ms.uat.homecreditcfc.cn/mock/6173873f0155e30027287c41/example/http:/register`, this.formData,)
            .then(function(response){
              console.log(4444555);
              if (response.data.message === "success") {
                ElMessage.success("注册成功, 请登录！");
              } else{
                console.log(response.data.message);
                ElMessage.error({message : "注册失败"});
              }
            });
          }else{
            console.log(444444);
            ElMessage.error({message: "请填写正确格式"});
          }
        });
        } else {
          $this.$refs[formName].validate((valid) => {
            if (valid) {
              var formDataUser = new window.FormData();
              formDataUser.append("user_email", $this.userForm.user_email);
              formDataUser.append("user_passwd", $this.userForm.user_passwd);
              formDataUser.append("user_tel", $this.userForm.user_tel);
              formDataUser.append("user_type", $this.userForm.user_type);
              formDataUser.append("enterprise_id", $this.userForm.enterprise_id);
              // console.log(formDataUser.get('user_email'));
              //此处接口用于传送用户注册表单数据
              axios.post(`https://mobile-ms.uat.homecreditcfc.cn/mock/6173873f0155e30027287c41/example/http:/register`, formDataUser)
              .then(function(response){
                console.log("222222");
                if (response.data.message === "success") {
                  ElMessage.success("注册成功, 请登录！");
                } else{
                  console.log(response.data.message);
                  ElMessage.error({message : "注册失败"});
                }
              });
            }else{
              $this.$message({type: 'warning',message: '请填写正确格式'});
            }
          })
        }
      



      // var $this = this;
      // var formName = this.tabName.includes("管理员注册")
      //   ? "adminForm"
      //   : "userForm";
      // $this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     axios({
      //       url: "http://localhost:5000",
      //       method: "post",
      //       data: formName,
      //     }).then(function (response) {
      //       //根据返回的response,data对象中的数据提示信息
      //       // if (condition1) {
      //       //   $this.$message({
      //       //     message: $this.$t
      //       //   })
      //       // }
      //       // if (condition2) {
      //       // }
      //       // else{
      //       // }
      //     });
      //   } else {
      //     console.log("error submit!!");
      //     console.log($this[formName]);
      //     return false;
      //   }
      // });
    },
    resetForm() {
      var formName = this.tabName.includes("管理员注册")
        ? "adminForm"
        : "userForm";
      this.$refs[formName].resetFields();

      this.imageUrl1 = ""; //重置图片
      this.imageUrl2 = "";
    },
    toLogin() {
      this.$router.push("/login");
    },

    // 图片相关
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(1111111);
    },

    //营业执照上传前操作
    beforeAvatarUploadbimage(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        ElMessage.error("Avatar picture must be JPG format!");
        return false ;
      }
      if (!isLt2M) {
        ElMessage.error("Avatar picture size can not exceed 2MB!");
        return false ;
      }
      this.formData.append('filea', file)
      return false
      // return isJPG && isLt2M;
    },


    //法人身份证上传前操作
    beforeAvatarUploadlimage(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        ElMessage.error("Avatar picture must be JPG format!");
      }
      if (!isLt2M) {
        ElMessage.error("Avatar picture size can not exceed 2MB!");
      }
      this.formData.append('filelb', file)
      return false
      // return isJPG && isLt2M;
    },


    //照片预览
    imagePreview1(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function (e) {
        _this.imageUrl1 = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
    },


    imagePreview2(file, fileList) {
      var _this = this;
      var event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      //转base64
      reader.onload = function (e) {
        _this.imageUrl2 = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
    },
  },

  mounted() {
    //在此请求初始化的option
    this.getrolelistBsType();
    this.getrolelistBelong();
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
/* 地区选择标签设置 */
.container {
  width: 800px;
  height: 400px;
  overflow: hidden;
}
.box {
  width: 800px;
  height: 50px;
  line-height: 50px;
  background: red;
  color: #fff;
}
</style>
