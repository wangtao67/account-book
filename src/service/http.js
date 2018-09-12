 import Utils from '../assets/js/Utils'

import { apiUrl } from './api'  // 基本url api地址

// 测试openid ，根据process.env.NODE_ENV在开发环境时设值  // tao 生产 oBWRrwAacLE6O4rY21KC_mBZUTLg
const testOpenId = process.env.NODE_ENV === 'production' ? "" : "ohht0uJNn_LVRWEhLOkTIL4B5HAs" //油条 "ohht0uJNn_LVRWEhLOkTIL4B5HAs"//Atao ： "ohht0uKp1IYWtNyFStRzGNeDaIhU"  //"ohht0uJNn_LVRWEhLOkTIL4B5HAs"

export const openId = Utils.GetCookie('weixinOpenId') || testOpenId  //'oBWRrwCb4NNJBjUFyBHWk14N0-LQ'  

const sourceId = 2 // 用户来源  贷帮：1，乡墅：2，小程序：3 



//  引导弹窗等控制显示
export const ifAdvertise = function(){  
    return  http.post(apiUrl+'/villa/villa_advertisement',
        {
            openIdG : openId,
           // activityCode :activityCode  // 0006：贷帮0007：我爱乡墅 0008：小镇 0009: 订单详情提示分享
        })
}

// 微信的jssdk接口
export const linkWx = function(url){
    return http.get(apiUrl+'/wechat/getWeixinJSSDK',{
        params:{
            jsurl : url
        }
    })
}

//临时页面 - 录入信息
export const submitUser = function(realname,mobilePhone,role){
    return http.post(apiUrl + '/crowd/submit_information',
    {   
        sourceId:sourceId,
        openId:openId,
        realname :realname,
        mobilePhone:mobilePhone,
        role: role
    })
}

// 服务 - 获取服务列表
export const getServiceList = (serviceType, searchFlag, currPage, pageSize) => {  
    return  http.post(apiUrl + '/crowd/search_products',
        {
            searchFlag,  // 搜索参数
            serviceType,  // 服务类型: { 14: 建房设计, 15: 建房服务, "": 所有 }  
            currPage,
            pageSize
        })
} 

// 店铺 - 获取店铺列表
export const getShopList = (searchFlag, currPage, pageSize) => {  
    return  http.post(apiUrl + '/crowd/search_shops',
        {
            searchFlag, // 搜索参数
            currPage,
            pageSize 
        })
}

//服务商注册 - 验证用户注册到哪一步
export const whichStep = function(){
    return http.post(apiUrl + '/crowd/which_step',
    {
        openId:openId,
        sourceId:sourceId
    })
}
//服务商注册 - 店铺注册
export const shopRegister = function(shopName,content,province,city,district,detailAddress,isRecommend,serviceType,mediaIds){
    return http.post(apiUrl + '/crowd/shop_register',
    {
        openId:openId,
        sourceId:sourceId,
        shopName:shopName,
        content:content,
        province:province,
        city:city,
        district:district,
        detailAddress:detailAddress,
        isRecommend:isRecommend, //推荐(0-不接受 1-接受)
        serviceType:serviceType ,
        mediaIds:mediaIds
    })
}
//服务商注册 - 实名认证 - 个人
export const shopCertification = function(crowdShopId,realname,idCard,mobilePhone,shopType,validCode){
    return http.post(apiUrl + '/crowd/shop_certification',
    {
        openId:openId,
        sourceId:sourceId,
        crowdShopId:crowdShopId,
        realname:realname,
        idCard:idCard,
        mobilePhone:mobilePhone,
        shopType:shopType,  //店铺类型 1-个人 2-企业;
        validCode:validCode
    })
}
//服务商注册 - 企业认证
export const shopFirmCertification = function(crowdShopId,companyName,codeType,companyCode,address,principal,telephone,mobilePhone,validCode,shopType){
    return http.post(apiUrl + '/crowd/shop_certification',
    {
        openId:openId,
        sourceId:sourceId,
        crowdShopId:crowdShopId,
        companyName:companyName,
        codeType:codeType,
        companyCode:companyCode,
        address:address,
        principal:principal,
        telephone:telephone,
        mobilePhone:mobilePhone,
        validCode:validCode,
        shopType:shopType  //店铺类型 1-个人 2-企业;
    })
}
//服务商注册 - 手机验证 - 验证码
export const sendSms = function(mobilePhone,type){
    return  http.post(apiUrl + '/userCenterResource/sendSms',
        {
            mobilePhone : mobilePhone,
            businessType : type  // 80001-乡墅游戏 80002-乡墅贷帮账户注册 800003-乡墅众包注册
        })
}
//服务商注册 - 缴纳保证金
export const shopPayDeposit  =function(crowdShopId,amount){
    return http.post(apiUrl + '/crowd/shop_pay_deposit',
    {
        openId:openId,
        sourceId:sourceId,
        crowdShopId:crowdShopId,
        amount:amount
    })
}
//商品详情 - 信息详情
export const goodsDetail = function(crowdProductId){
    return http.post(apiUrl + '/crowd/goods_detail',
    {
        crowdProductId:crowdProductId
    })
}
//商品下单 - 确认订单
export const crowdBuyGoods = function(crowdProductId,mobilePhone,validCode,count,orderId,amount){
    return http.post(apiUrl + '/crowd/crowd_buy_goods',
    {
        openId:openId,
        sourceId:sourceId,
        crowdProductId:crowdProductId,
        mobilePhone:mobilePhone,
        validCode:validCode,
        count:count,
        orderId:orderId,
        amount:amount
    })
}
//店铺详情 - 店铺首页
export const shopDetail = function(crowdShopId){
    return http.post(apiUrl + '/crowd/shop_detail',
    {
        crowdShopId:crowdShopId
    })
}
//雇佣店铺 - 修改手机号
export const  alterPhone = function(mobilePhone,validCode,ifModify){
    return http.post(apiUrl + '/crowd/get_mobilephone',
    {
        openId:openId,
        sourceId:sourceId,
        mobilePhone:mobilePhone,
        validCode:validCode,
        ifModify:ifModify //是否修改
    })
}
//雇佣店铺 - 提交需求
export const hripShop = function(crowdShopId,mobilePhone,validCode,serviceType,price,content){
    return http.post(apiUrl + '/crowd/hire_shop',
    {
        openId:openId,
        sourceId:sourceId,
        crowdShopId:crowdShopId,
        mobilePhone:mobilePhone,
        validCode:validCode,
        serviceType:serviceType,
        price:price,
        content:content
    })
}
//订单详情 - 详情信息
export const crowdOrderDetail =function(orderId){
    return http.post(apiUrl + '/crowd/crowd_order_detail',
    {
        openId:openId,
        sourceId:sourceId,
        orderId:orderId
    })
}
// 托管赏金 
export const crowdOrderMoney = function(orderId){
    return http.post(apiUrl + '/crowd/host_money',
    {
        openId:openId,
        sourceId:sourceId,
        orderId:orderId,
    })
}
//订单详情 - 订单关闭/接受/拒绝/验收
export const orderStatus = function(orderId,status){
    return http.post(apiUrl + '/crowd/change_order_status',
    {
        openId:openId,
        sourceId:sourceId,
        orderId:orderId,
        status:status  //7-用户取消 8-商户取消 2-接受订单 6-拒绝订单 5-提交验收
    })
}
//定制需求 - 获取设计类型
export const getConfig =function(grouping){
    return http.post(apiUrl + '/crowd/get_config',grouping)
}
//定制需求 - 提交需求
export const submitRequirement = function(title,serviceType,content,mobilePhone,validCode,price){
    return http.post(apiUrl + '/crowd/submit_requirement',
    {
        openId:openId,
        sourceId:sourceId,
        title:title,
        serviceType:serviceType,
        content:content,
        mobilePhone:mobilePhone,
        validCode:validCode,
        price:price
    })
}
// 订单 - 订单列表
export const getOrderList = function(currPage, pageSize){
    return http.post(apiUrl + '/crowd/crowd_myorder',
    {
        currPage,
        pageSize,
        openId,
        sourceId
    })
}
