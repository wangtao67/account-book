# 乡墅众包平台移动端项目

### 1. 项目说明

    乡墅众包平台移动端项目                     

-----

### 2. 相关文件及目录说明
``` 
|---wei
    |-- dist                            // 打包生成目录                         
    |-- build                           // 项目管理工具配置文件                   
    |-- package.json                    // npm配置文件 
    |-- .gitignore                      // git忽略文件配置                      
    |-- src                             // 项目主要内容                
        |-- assets                      // 图片等静态文件  
            |-- img                     // 静态图片
            |-- js                      // js文件等
            |-- style                   // 样式文件
        |-- components                  // 公用组件 
            |-- button                  // 按钮
            |-- calender                // 日历
            |-- footerNav               // 页面底部tab
            |-- load                    // 加载组件
            |-- serviceList             // 商品列表
            |-- storeLlist              // 店铺列表
            |-- toast                   // 提示
        |-- filter                      // 过滤器（价格的显示方式，字数限制等）
        |-- pages                        // 页面   
            |-- customization           // 定制化 
            |-- facilitator             // 注册
            |-- home                    // 主页
            |-- order                   // 订单
            |-- service                 // 服务商品
            |-- shop                    // 服务店铺
            |-- temporary               // 提交

        |-- router                      // 路由
        |-- App.vue                     // 根组件                
        |-- main.js                     // 入口文件               
```

-----

### 3. 新增子项目操作说明

> 1、在相关模块增加模块文件夹再增加文件，或者需要新建模块业务
> 2、修改README.md文件**项目说明**

-----

### 4. 相关技术说明
* vue   
* vue-cli           vue脚手架工具
* vue-resource      请求插件
* vue-router        路由插件
* vue-awesome-swiper 强大的轮播插件
* less
* vuex               
...

-----

### 5. 相关命令

``` bash
#  安装依赖
npm install

#  运行项目
npm run dev

#  打包
npm run build
```
For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

-----


