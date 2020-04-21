export default {
  setSessionStorage(key, obj) {
    sessionStorage.setItem(key, JSON.stringify(obj));
  },

  getSessionStorage(key) {
    return JSON.parse(sessionStorage.getItem(key));
  },
  setLocalStorage(key, obj) {
    localStorage.setItem(key, JSON.stringify(obj));
  },

  getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  copyObject(o) {
    return JSON.parse(JSON.stringify(o));
  },
  GetCookie(name) {
    let cookieStr;
    let start;
    let end;
    if(!document || !document.cookie) {
      return null;
    } else {
      var xx;
      cookieStr = document.cookie;
      start = cookieStr.indexOf(name + "=");
      end = cookieStr.indexOf(";", start);
      
      if(start <= -1) { return null; }
      if(end <= -1) {
        xx = cookieStr.substring(start);
      } else {
        xx = cookieStr.substring(start, end - 1);
      }

      if (xx){
       xx = xx.split("=")[1];
      }else{
        xx = '';
      }
      return xx;
    }
  },
  /**
   * 修改当前url(参数)
   * @param  {string} url   当前地址
   * @param  {string} arg   修改的参数
   * @param  {string} val   参数值       
   * @param  {string} title 标题
   * @return {string}       修改后的url
   */
  changeUrlArg(url, arg, val,title ) {
      var pattern = arg + '=([^&]*)';
      var replaceText = arg + '=' + val;
      var changeUrl = url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
      history.replaceState(null,title,changeUrl);
      return changeUrl;
  },
  getLocation(){
    let location = window.location.href;
    return encodeURIComponent(location.substring(location.indexOf("#!")));
  },
  //验证手机号码
  testPhone(val){
     var reg = /^1[34578]\d{9}$/;   // 验证手机号
     return reg.test(val);
  },
  //验证6到18位字符
  limitPassword(val,maxlength,minlength){
     var reg = /\w/;   
     if(val != '' && maxlength != null && minlength != null){
      var test = (reg.test(val)) && (val.length >= minlength) && (val.length <= maxlength);
      return test;
     }else{
      return false;
     }
  },
  //验证6位支付密码
  limitSixNumber(val){
     var reg = /\d/;   
     if(val != ''){
      var test = (reg.test(val)) && (val.length == 6);
      return test;
     }else{
      return false;
     }
     
  },

  /**
   * 添加class
   * @param {obj} obj 当前元素对象
   * @param {string} cls 添加的class
   */
  addClass(obj, cls){
    if(obj){
      var obj_class = obj.className,
      blank = (obj_class != '') ? ' ' : '',
      added = obj_class + blank + cls;
      obj.className = added;  
    }
  },
  /**
   * 删除class
   * @param  {obj} obj 元素对象
   * @param  {string} cls 删除class，名
   * @return {[type]}     [description]
   */
  removeClass(obj, cls){
    if(obj){
      var obj_class = ' ' + obj.className + ' ',
      obj_class = obj_class.replace(/(\s+)/gi, ' '),
      removed = obj_class.replace(' ' + cls + ' ', ' '); 
      removed = removed.replace(/(^\s+)|(\s+$)/g, '');
      obj.className = removed;    
    }
  },

  /**
   * 拖动元素方法
   * @param  {string} idName 元素id
   * @return {[type]}        [description]
   */
  dragFnn(idName){
    var obj = document.getElementById(idName);
      var oW,oH;
      // 绑定touchstart事件
      obj.addEventListener("touchstart", function(e) {
          var touches = e.touches[0];
          oW = touches.clientX - obj.offsetLeft;
          oH = touches.clientY - obj.offsetTop;
          //阻止页面的滑动默认事件
          document.addEventListener("touchmove",defaultEvent,false);
      },false);

      obj.addEventListener("touchmove", function(e) {
          var touches = e.touches[0];
          var oLeft = touches.clientX - oW;
          var oTop = touches.clientY - oH;
          var docWid = document.documentElement.clientWidth;
          var docHei = document.documentElement.clientHeight; 
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
  },
  /**
   * 处理浮点数计算问题 加减乘除
   * @param  {[type]} a [description]
   * @param  {[type]} b [description]
   * @return {[type]}   [description]
   */
  // 浮点 - 加法
 addFloat(a, b){
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
  },
  // 浮点 - 减法
  subFloat(a, b) { 
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
  },
  // 浮点 - 乘法
  mulFloat(a, b) {
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
  },
  // 浮点 - 除法
  divFloat(a, b) {
      var c, d, e = 0,
          f = 0;
      try {
          e = a.toString().split(".")[1].length;
      } catch (g) {}
      try {
          f = b.toString().split(".")[1].length;
      } catch (g) {}
      return c = Number(a.toString().replace(".", "")), d = Number(b.toString().replace(".", "")), mul(c / d, Math.pow(10, f - e));
  },

  //验证是否是在微信客户端

  isWeixin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if(ua.match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      }else{
          return false;
      }
  },
    // 设置标题，兼容ios在微信浏览器无效问题 
  setTitle(title) {
      var body = document.getElementsByTagName('body')[0];
      document.title = title;
      var iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.setAttribute("src", "http://named.cn/page/take/img/icon_phone.png");
      var d = function() {
          setTimeout(function() {
              iframe.removeEventListener('load', d);
              document.body.removeChild(iframe);
          }, 0);
      };
      iframe.addEventListener('load', d);
      document.body.appendChild(iframe);  
  } ,
 
  /**
 * 获取滚动条位置
 * @return {[type]} [description]
 */
  scrollPostion() {
      var t, l, w, h;
      if (document.documentElement && document.documentElement.scrollTop) {
          t = document.documentElement.scrollTop;
          l = document.documentElement.scrollLeft;
          w = document.documentElement.scrollWidth;
          h = document.documentElement.scrollHeight;
      } else if (document.body) {
          t = document.body.scrollTop;
          l = document.body.scrollLeft;
          w = document.body.scrollWidth;
          h = document.body.scrollHeight;
      }
      return {
          top: t,
          left: l,
          width: w,
          height: h
      };
  },

  /** date */

  formatDate (date) {  
    var y = date.getFullYear();  
    var m = date.getMonth() + 1;  
    m = m < 10 ? '0' + m : m;  
    var d = date.getDate();  
    d = d < 10 ? ('0' + d) : d;  
    return y + '-' + m + '-' + d;  
  },
  /**
   * 由时间戳获取格式化时间（主要用于获取特定格式）
   * @param {string} fmt "yyyy-MM-dd HH:mm:ss.S"
   */
  getFormatTime(stamp, fmt) {
    var date = null;
    fmt = fmt || 'yyyy-MM-dd';
    if (!stamp) {
      return '';
    } else if (stamp === 'now') {
      // 获取当前时间
      date = new Date();
    } else {
      date = new Date(Number(stamp));
    }
    var o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'H+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
      }
    }
    return fmt;
  }
};
