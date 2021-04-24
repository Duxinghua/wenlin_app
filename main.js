import Vue from 'vue';
import App from './App';
import {wxUploadFile } from 'common/request';
import Tool from 'common/tool.js'


Vue.config.productionTip = false;

App.mpType = 'app';

// 此处为演示Vue.prototype使用，非uView的功能部分
Vue.prototype.vuePrototype = '';

// 引入全局uView
import uView from 'uview-ui';
Vue.use(uView);

// 此处为演示vuex使用，非uView的功能部分
import store from '@/store';

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js');
Vue.mixin(vuexStore);

// 引入uView对小程序分享的mixin封装
let mpShare = require('uview-ui/libs/mixin/mpShare.js');
Vue.mixin(mpShare);

//公共处理方法
let VueMixin = require('@/mixin/mixin.js');
Vue.mixin(VueMixin);

Vue.prototype.upload = function(params,data){
	return wxUploadFile(params,data,'https://sq.wenlinapp.com/api/wxadmin/upload/one')
}

/*格式化时间戳*/
Vue.filter('formatTime', function(n) {
	return Tool.dateFormat('mm-dd HH:MM',new Date(n*1000));
});


// 由于微信小程序的运行机制问题，需声明如下一行，H5和APP非必填


const app = new Vue({
	store,
	...App
});

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/http.api.js';
Vue.use(httpApi, app);

app.$mount();
