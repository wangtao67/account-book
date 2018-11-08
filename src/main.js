import Vue from 'vue'
import Vuex from 'vuex'
import store from './vuex/store'
import App from './App'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router';
import { routes } from './router/index'
import * as filters from './filter/index'
import * as directives from './directive/index'
import Utils from './assets/js/Utils'
import VueAwesomeSwiper from 'vue-awesome-swiper'  // 轮播插件
import MintUI from 'mint-ui'
import 'assets/style/mintStyle.css'
require('swiper/dist/css/swiper.css')

Vue.config.debug = true;

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(Vuex)
Vue.use(VueAwesomeSwiper)
Vue.use(MintUI)
//将http作为全局变量保存 
window.http = Vue.http 

// 全局工具函数 页面通过 this.Util.函数名 使用
Vue.prototype.Util = Utils;

// 全局注册过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

// 全局注册指令
Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]);
});

// 全局组件
import components from './components';
Object.keys(components).forEach(key => {
  Vue.component(key, components[key]);
});

const router = new VueRouter({
  routes: routes,
  // mode: 'history',
  
});

router.beforeEach((route, redirect, next) => {
  document.title = route.meta.title || document.title;
  next();
});

const app = new Vue({
  router,
  store,
	render: h => h(App)
}).$mount('#app');

