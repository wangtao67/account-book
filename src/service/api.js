/**
 * 设置 isDev 的值 来设置测试环境和生产环境不同的基本配置地址
 * isDev = true -> 测试环境 ，isDev = false -> 开发环境 
 * 可直接引入相关配置名
 */
const isDev = true 

// 不同配置
let exportObj =  isDev ? {     // 测试配置

                            apiUrl:  "http://139.129.161.48:8788/leda/engine/api" ,  // 后台api基本地址 

                            authShareBaseUrl: "http://villa.finengine.cn/wechat/share?state="  // 分享基本地址
                            
                        }
                        : {     // 生产配置
                            apiUrl :"/leda/",

                            authShareBaseUrl: "http://weixin.woaixiangshu.com/leda/wechat/share?state=",
                               // 乡墅logo地址
                        }

// 相同配置
exportObj.logoUrl = 'http://121.42.25.188:8890/villaImg/2017011210411248652.jpg'  // 乡墅logo

exportObj.isDev = isDev 


module.exports = exportObj