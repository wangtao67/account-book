
import Storages from "@assets/js/storages";
import { baseUrl } from './config';  // 基本url api地址
import { MessageBox } from 'mint-ui';
import router from '../router';

http.interceptors.push((request, next) => {
  var token = Storages.cookie.get('token');
  request.headers.set('token', token); // setting request.headers
  next((response) => {
    console.log(response);
    if (response.status === 0) {
      alert('请求失败');
    } else {
      if (response.body.state === 403) {
        MessageBox.confirm('登录已过期,请重新登录').then(action => {
          router.push({ name: 'login' });
        }).catch(() => {

        });
        return false;
      } else if (response.body.state === 401) {
        MessageBox.confirm('身份验证失败,请重新登录').then(action => {
          router.push({ name: 'login' });
        }).catch(() => {

        });
      } 
    }
  });   
});

// 获取记录列表
export const getRecordList = function (params = {}) {  
  return http.post(baseUrl + 'account/recordList', params);
};

// 获取月金额统计
export const getMonthAccount = function (params = {}) {  
  return http.post(baseUrl + 'account/userMonthAccount', params);
};

// 获取月各类型金额统计
export const getUserMonthTypeAccount = function (params = {}) {  
  return http.post(baseUrl + 'account/userMonthTypeAccount', params);
};

// 获取类型
export const getTypeList = function (params = {}) {  
  return http.get(baseUrl + 'useType/expCostTypes', { params });
};

// 新增类型
export const addExpCostType = function (params) {  
  return http.post(baseUrl + 'useType/addexpCostType', params);
};

// 新增记录
export const addExpCostRecord = function (params) {  
  return http.post(baseUrl + 'account/addRecord', params);
};

// 登录
export const userLogin = function (params) {  
  return http.post(baseUrl + 'user/login', params);
};

// 注册
export const userRegister = function (params) {  
  return http.post(baseUrl + 'user/register', params);
};

// 获取用户信息
export const getUserInfo = function (params) {  
  return http.post(baseUrl + 'user/getUserInfo', params);
};
