import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import './assets/css/icon.css'
import axios from 'axios'
import * as echarts from "echarts";

const app = createApp(App)

// 注册全局变量
app.config.globalProperties.$axios = axios
app.config.globalProperties.$echarts = echarts


installElementPlus(app)
app
    .use(store)
    .use(router)
    .mount('#app')