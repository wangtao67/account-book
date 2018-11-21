
/**
 * 平台标识
 */
let PLATFORM_FLAG = 'account';
/**
 * 浏览器是否禁用cookie
 * @param return 返回布尔值标识是否禁用，true禁用
 */
function _browserIsDisableCookie() {
  let isCookie = document.cookie || navigator.cookieEnabled;
  if (!isCookie) {
    throw 'cookie被禁用';
    return false;
  } else {
    return true;
  }
}
export default {
  localStorage: {
    /**
     * 获取
     * @param {string} name 获取localStorage名称
     * @return {string} localStorage值
     */
    get: function(name) {
      return localStorage.getItem(name);
    },
    /**
     * 设置
     * @param {string} name 获取localStorage名称
     * @param {string} value 设置localStorage值
     */
    set: function(name, value) {
      localStorage.setItem(name, value);
    },
    /**
     * 删除
     * @param {string} name 删除localStorage名称
     */
    remove: function(name) {
      localStorage.removeItem(name);
    },
    /**
     * 清除所有localStorage
     */
    clear: function() {
      localStorage.clear();
    },
  },
  sessionStorage: {
    /**
     * 获取
     * @param {string} name 获取sessionStorage名称
     * @return {string} sessionStorage值
     */
    get: function(name) {
      return sessionStorage.getItem(name);
    },
    /**
     * 设置
     * @param {string} name 获取sessionStorage名称
     * @param {string} value 设置sessionStorage值
     */
    set: function(name, value) {
      sessionStorage.setItem(name, value);
    },
    /**
     * 删除
     * @param {string} name 删除sessionStorage名称
     */
    remove: function(name) {
      sessionStorage.removeItem(name);
    },
    /**
     * 清除所有sessionStorage
     */
    clear: function() {
      sessionStorage.clear();
    },
  },
  cookie: {
    /**
     * 获取
     * @param {string} name 获取cookie名称
     * @return {string} cookie值
     */
    get: function(name) {
      if (!_browserIsDisableCookie()) {
        return;
      }
      let arrStr = document.cookie.split('; ');
      for (let i = 0; i < arrStr.length; i++) {
        let temp = arrStr[i].split('=');
        if (temp[0] === PLATFORM_FLAG + name) {
          if (temp[1] == 'undefined' || temp[1] == 'null') {
            return null;
          }
          return unescape(temp[1]);
        }
      }
      return null;
    },
    /**
     * 设置
     * @param {string} name 获取cookie名称
     * @param {string} value 设置cookie值
     */
    set: function(name, value) {
      if (!_browserIsDisableCookie()) {
        return;
      }
      if (!name) {
        throw 'cookie的name不能为空';
        return;
      }
      document.cookie = PLATFORM_FLAG + name + '=' + escape(value) + ';path=/';
    },
    /**
     * 清除所有cookie内容
     */
    clear: function() {
      if (!_browserIsDisableCookie()) {
        return;
      }
      let arrStr = document.cookie.split('; ');
      for (let i = 0; i < arrStr.length; i++) {
        let temp = arrStr[i].split('=');
        let bf = PLATFORM_FLAG ? temp[0].indexOf(PLATFORM_FLAG) != -1 : true;
        if (bf) {
          //设置过时时间
          document.cookie = temp[0] + '=0' + ';expires=' + new Date(0).toGMTString() + ';path=/';
        }
      }
    },
  },
};
