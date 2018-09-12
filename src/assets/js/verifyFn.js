//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
export const  isCardNo = function(card){
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    if(reg.test(card) === false){
      return  false;
    }else{
      return true
    }
 }
 //隐藏手机号码中间4位
 export const  hidePhone = function(phone){
    var mtel = phone.substr(0, 3) + '****' + phone.substr(7); 
    return mtel
 }
/**
 * 常用方法目录 ：
 *  GetCookie -- 获取cookie
 *  changeUrlArg -- 修改当前url(参数)
 *  SetToken -- 设置token
 *  getLocation -- 
 *  testPhone -- 手机号验证
 *  limitPassword -- 
 *  limitSixNumber -- 
 *  addClass -- 添加class
 *  removeClass  -- 删除class    
 *  dragFn -- 拖动元素
 *  addFloat,subFloat,mulFloat,divFloat     -- 浮点数加减乘除计算 
 */


// 获取cookie
export const GetCookie = (name) => {
  let cookieStr
  let start
  let end
  if(!document || !document.cookie) {
    return null;
  } else {
    var xx;
    cookieStr = document.cookie
    start = cookieStr.indexOf(name + "=")
    end = cookieStr.indexOf(";", start)
    
    if(start <= -1) { return null }
    if(end <= -1) {
      xx= cookieStr.substring(start)
    } else {
      xx= cookieStr.substring(start, end - 1)
    }

    if (xx){
     xx = xx.split("=")[1];
    }else{
      xx = '';
    }
    return xx;
  }
}
/**
 * 修改当前url(参数)
 * @param  {string} url   当前地址
 * @param  {string} arg   修改的参数
 * @param  {string} val   参数值       
 * @param  {string} title 标题
 * @return {string}       修改后的url
 */
export const changeUrlArg = (url, arg, val,title ) => {
    var pattern = arg+'=([^&]*)';
    var replaceText = arg+'='+val;
    var changeUrl = url.match(pattern) ? url.replace(eval('/('+ arg+'=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url+'&'+replaceText : url+'?'+replaceText);
    history.replaceState(null,title,changeUrl);
    return changeUrl
} 
/**
 * 设置token
 * @param  {[type]} token [description]
 * @return {[type]}       [description]
 */
export const SetToken =(token) =>{
  http.headers.common['Authorization'] = token
}

export const getLocation = function(){
  let location = window.location.href
  return encodeURIComponent(location.substring(location.indexOf("#!")))
}

//验证手机号码
export const testPhone =function(val){
   var reg = /^1[34578]\d{9}$/;   // 验证手机号
   return reg.test(val)
}
//验证6到18位字符
export const limitPassword =function(val,maxlength,minlength){
   var reg = /\w/;   
   if(val!=''&&maxlength!=null&&minlength!=null){
    var test=(reg.test(val))&&(val.length>=minlength)&&(val.length<=maxlength)
    return test
   }else{
    return false
   }
}
//验证6位支付密码
export const limitSixNumber =function(val){
   var reg = /\d/;   
   if(val!=''){
    var test=(reg.test(val))&&(val.length==6)
    return test
   }else{
    return false
   }
   
}

/**
 * 添加class
 * @param {obj} obj 当前元素对象
 * @param {string} cls 添加的class
 */
export const addClass = function(obj, cls){
  if(obj){
    var obj_class = obj.className,
    blank = (obj_class != '') ? ' ' : '',
    added = obj_class + blank + cls;
    obj.className = added;  
  }
}
/**
 * 删除class
 * @param  {obj} obj 元素对象
 * @param  {string} cls 删除class，名
 * @return {[type]}     [description]
 */
export const removeClass = function(obj, cls){
  if(obj){
    var obj_class = ' '+obj.className+' ',
    obj_class = obj_class.replace(/(\s+)/gi, ' '),
    removed = obj_class.replace(' '+cls+' ', ' '); 
    removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;    
  }
}

/**
 * 拖动元素方法
 * @param  {string} idName 元素id
 * @return {[type]}        [description]
 */
export const dragFn = function(idName){
  var obj = document.getElementById(idName);
    var oW,oH;
    // 绑定touchstart事件
    obj.addEventListener("touchstart", function(e) {
        var touches = e.touches[0];
        oW = touches.clientX - obj.offsetLeft;
        oH = touches.clientY - obj.offsetTop;
        //阻止页面的滑动默认事件
        document.addEventListener("touchmove",defaultEvent,false);
    },false)

    obj.addEventListener("touchmove", function(e) {
        var touches = e.touches[0];
        var oLeft = touches.clientX - oW;
        var oTop = touches.clientY - oH;
        var docWid = document.documentElement.clientWidth
        var docHei = document.documentElement.clientHeight 
        // 检测边界
        if(oLeft < 0) {
            oLeft = 0;
        }
        else if(oTop < 0){
            oTop = 0;
        }
        else if( oTop > docHei - obj.offsetHeight){
            oTop = (docHei - obj.offsetHeight);
        }
        else if(oLeft > docWid - obj.offsetWidth) {
            oLeft = (docWid - obj.offsetWidth);
        }
        obj.style.left = oLeft + "px";
        obj.style.top = oTop + "px";
    },false);

    obj.addEventListener("touchend",function() {
        document.removeEventListener("touchmove",defaultEvent,false);
    },false);
    
    function defaultEvent(e) {
        e.preventDefault();
    }
}
/**
 * 处理浮点数计算问题 加减乘除
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @return {[type]}   [description]
 */
// 浮点 - 加法
export const addFloat = (a, b) => {
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mulFloat(a, e) + mulFloat(b, e)) / e;
}
// 浮点 - 减法
export const subFloat = (a, b) => { 
    var c, d, e;
    try {
        c = a.toString().split(".")[1].length;
    } catch (f) {
        c = 0;
    }
    try {
        d = b.toString().split(".")[1].length;
    } catch (f) {
        d = 0;
    }
    return e = Math.pow(10, Math.max(c, d)), (mulFloat(a, e) - mulFloat(b, e)) / e;
}
// 浮点 - 乘法
export const mulFloat = (a, b) => {
    var c = 0,
        d = a.toString(),
        e = b.toString();
    try {
        c += d.split(".")[1].length;
    } catch (f) {}
    try {
        c += e.split(".")[1].length;
    } catch (f) {}
    return Number(d.replace(".", "")) * Number(e.replace(".", "")) / Math.pow(10, c);
}
// 浮点 - 除法
export const divFloat = (a, b) => {
    var c, d, e = 0,
        f = 0;
    try {
        e = a.toString().split(".")[1].length;
    } catch (g) {}
    try {
        f = b.toString().split(".")[1].length;
    } catch (g) {}
    return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
}

//验证是否是在微信客户端

export const isWeixin = () => {
    var ua = window.navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        return true;
    }else{
        return false;
    }
}
//数组合并
export const merge = () => {
    return Array.prototype.concat.apply([], arguments)
}