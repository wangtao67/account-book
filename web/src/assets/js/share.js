/* eslint-disable */
/**
 * 初始化微信配置（单页应用只需执行一次配置）
 * @param  {Object} http Vue.resource
 * @param  {String} href url
 * @return {[type]} 
 */
import { linkWx } from 'service/http'
export const configWX = (url) => {
   linkWx(url)
    .then(function({data : {appId, timestamp, nonceStr, signature}}){
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appId, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr:nonceStr, // 必填，生成签名的随机串
            signature:signature,// 必填，签名，见附录1
            jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                 // 所有要调用的 API 都要加到这个列表中
                'openAddress',
                "chooseWXPay",
                "chooseImage",
                "previewImage",
                "uploadImage",
                "downloadImage",
                "getLocation"

            ]
        })
        wx.error(function(res){
            console.log("配置失败："+res)
        })
    })
}

/**
 * 微信统一分享方法（分享朋友和朋友圈内容相同时）
 * @param  {String} href  分享内容对应的链接
 * @param  {String} text  分享内容显示文本
 * @param  {String} title 分享内容对应的标题
 * @return {[type]}       [description]
 */
export const ShareWx = (href, text, title, headImgUrl) => {
    /** 分享给好友 */
	wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: text, // 分享描述
        link: href, // 分享链接
        imgUrl: headImgUrl, // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
    /** 分享到朋友圈 */
    wx.onMenuShareTimeline({
        title: title + " - " + text, // 分享标题
        link: href, // 分享链接
        imgUrl: headImgUrl, // 分享图标
        success: function () { },
        cancel: function () { }
    })
}
/**
 * 微信分享到朋友圈
 * @param  {String} href  分享内容对应的链接
 * @param  {String} text  分享内容显示文本
 * @param  {String} title 分享内容对应的标题
 * @return {[type]}       [description]
 */
export const ShareWxAppMessage = (href, text, title, headImgUrl) => {
    /** 分享给好友 */
    wx.onMenuShareAppMessage({
        title: title, // 分享标题
        desc: text, // 分享描述
        link: href, // 分享链接
        imgUrl: headImgUrl, // 分享图标
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        }
    });
}
/**
 * 微信分享到朋友圈
 * @param  {String} href  分享内容对应的链接
 * @param  {String} title 分享内容标题
 * @return {[type]}       [description]
 */
export const ShareWxTimeline = (href,title, headImgUrl) => {
    /** 分享到朋友圈 */
    wx.onMenuShareTimeline({
        title: title, // 分享标题
        link: href, // 分享链接
        imgUrl: headImgUrl, // 分享图标
        success: function () { },
        cancel: function () { }
    })
}



