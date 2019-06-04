
import Vue from "vue";
import VueRouter from 'vue-router';
import Storages from '@assets/js/storages';
import { routes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: routes,
  // mode: 'history',
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || document.title;
  let pathNames = ['login', 'register', 'test'];
  let token = Storages.cookie.get('token');
  // 如果访问paths中包含的路径或者已登录，可以进入路由页面，否则返回登录
  if (pathNames.includes(to.name) || token) {
    next();
  } else {
    next({ name: 'login'});
  }
  next();
});

export default router;
