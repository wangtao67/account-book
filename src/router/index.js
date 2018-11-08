
/**
 * 路由配置
 */

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
    path:'/chart', 
    name: 'chart',
    meta: { 
      title: "图表" ,
    },
    component: resolve => require(['../pages/chart/index'], resolve)     
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

]
