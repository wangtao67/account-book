export const routes = [
  // 主页
  {
    path:'/', 
    name: 'index',
    meta: { 
      title: "记账本" ,
    },
    component: resolve => require(['../pages/index/index'], resolve)     
  },
  {
    path:'/graph', 
    name: 'graph',
    meta: { 
      title: "图表" ,
    },
    component: resolve => require(['../pages/graph/index'], resolve)     
  },
  {
    path:'/explore', 
    name: 'explore',
    meta: { 
      title: "发现" ,
    },
    component: resolve => require(['../pages/explore/index'], resolve)     
  },
  {
    path:'/mine', 
    name: 'mine',
    meta: { 
      title: "记账本" ,
    },
    component: resolve => require(['../pages/mine/index'], resolve)     
  },
  {
    path:'/add_record', 
    name: 'addRecord',
    meta: { 
      title: "记账本" ,
    },
    component: resolve => require(['../pages/recordNew/index'], resolve)     
  },
  {
    path:'/login', 
    name: 'login',
    meta: { 
      title: "登录" ,
    },
    component: resolve => require(['../pages/login/index'], resolve)     
  },
  {
    path:'/register', 
    name: 'register',
    meta: { 
      title: "注册" ,
    },
    component: resolve => require(['../pages/login/index'], resolve)     
  },
]