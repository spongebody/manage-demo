<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>发送信息</span>
            </div>
          </template>
          <div class="info">
            <el-form ref="form" v-model="form" label-width="80px">
              <el-input
                type="textarea"
                :rows="8"
                v-model="form.message"
              ></el-input>
              <div class="button-container">
                <el-button type="primary" @click="sendMesg">发送</el-button>
                <el-button @click="clearText">重置</el-button>
              </div>
            </el-form>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>接收信息</span>
            </div>
          </template>
          <div class="in">
            <el-scrollbar height="250px">
              <p v-for="(item, idx) in receiveMsgs" :key="idx">{{ item }}</p>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12" class="send-container">
        <el-card shadow="hover">
          <template #header>
            <div class="clearfix">
              <span>已发信息</span>
            </div>
          </template>
          <div class="in">
            <el-scrollbar height="250px">
              <p v-for="(item, idx) in sendMsgs" :key="idx">{{ item }}</p>
            </el-scrollbar>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="裁剪图片" v-model="dialogVisible" width="600px">
      <vue-cropper
        ref="cropper"
        :src="imgSrc"
        :ready="cropImage"
        :zoom="cropImage"
        :cropmove="cropImage"
        style="width: 100%; height: 400px"
      ></vue-cropper>

      <template #footer>
        <span class="dialog-footer">
          <el-button class="crop-demo-btn" type="primary"
            >选择图片
            <input
              class="crop-input"
              type="file"
              name="image"
              accept="image/*"
              @change="setImage"
            />
          </el-button>
          <el-button type="primary" @click="saveAvatar">上传并保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
import { ElMessage } from "element-plus";
import avatar from "../assets/img/img.jpg";
export default {
  name: "message",
  components: {
    VueCropper,
  },
  // setup() {

  //     var sendMesg = ''

  //     return {
  //        sendMesg
  //     };
  // },
  data() {
    return {
      form: {
        message: "",
      },
      sendMsgs: [],
      receiveMsgs: [],
      webSocketObj: null,
    };
  },
  created() {
    this.initWebsocket();
    this.receiveMsg();
  },
  methods: {
    sendMesg() {
      console.log(this.form.message);
      this.webSocketObj.send(this.form.message);
      this.sendMsgs.push(this.form.message);
      this.form.message = "";
    },
    initWebsocket() {
      this.webSocketObj = new WebSocket("ws://159.75.122.81:8887");
      this.webSocketObj.onopen = this.onOpen;
      // this.webSocketObj.onerror = this.onError
      this.webSocketObj.onclose = this.onClose;
      console.log(this.webSocketObj);
    },
    onOpen() {
      if (this.webSocketObj.readyState === 1) {
        ElMessage.success({
          message: "连接已成功建立！！",
          type: "success",
        });
      }
    },
    onClose() {
      this.webSocketObj && this.webSocketObj.close && this.webSocketObj.close();
      ElMessage.success({
        message: "连接已断开",
        type: "error",
      });
    },
    receiveMsg() {
      var $this = this
      this.webSocketObj.onmessage = function (evt) {
        var received_msg = evt.data;
        $this.receiveMsgs.push(received_msg);
        console.log("------------");
        console.log(evt);
      };
    },
  },
};
</script>

<style scoped>
.info {
  text-align: center;
  padding: 5px 0;
}
.info-image {
  position: relative;
  margin: auto;
  width: 100px;
  height: 100px;
  background: #f8f8f8;
  border: 1px solid #eee;
  border-radius: 50px;
  overflow: hidden;
}
.info-image img {
  width: 100%;
  height: 100%;
}
.info-edit {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: opacity 0.3s ease;
}
.info-edit i {
  color: #eee;
  font-size: 25px;
}
.info-image:hover .info-edit {
  opacity: 1;
}
.info-name {
  margin: 15px 0 10px;
  font-size: 24px;
  font-weight: 500;
  color: #262626;
}
.crop-demo-btn {
  position: relative;
}
.crop-input {
  position: absolute;
  width: 100px;
  height: 40px;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
}

.button-container {
  margin-top: 20px;
  display: flex;
}

.send-container {
  margin-top: 10px;
}
</style>