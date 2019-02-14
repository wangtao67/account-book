
import Utils from '../assets/js/Utils'
import Storages from "@assets/js/storages";
import { baseUrl } from './config'  // 基本url api地址

http.interceptors.push((request, next) => {  console.log(request);
	var uid = Storages.cookie.get('uid');
	if (request.method === 'POST') {
		request.body.uid = uid; // 设置请求uid
	} 
	else if (request.method === 'GET') {
		request.params.uid = uid; // 设置请求uid
	}

  next((response) => {});   
});

// 获取记录列表
export const getRecordList = function (params = {}) {  
  return http.post(baseUrl + 'recordList', params);
}

// 获取月金额统计
export const getMonthAccount = function (params = {}) {  
  return http.post(baseUrl + 'userMonthAccount', params);
}

// 获取类型
export const getTypeList = function (params = {}) {  
  return http.get(baseUrl + 'expCostTypes', { params });
}

// 新增类型
export const addExpCostType = function (params) {  
  return http.post(baseUrl + 'addexpCostType', params);
}

// 新增记录
export const addExpCostRecord = function (params) {  
  return http.post(baseUrl + 'addRecord', params);
}

// 登录
export const userLogin = function (params) {  
  return http.post(baseUrl + 'login', params);
}

// 注册
export const userRegister = function (params) {  
  return http.post(baseUrl + 'register', params);
}

// 获取用户信息
export const getUserInfo = function (params) {  
  return http.post(baseUrl + 'getUserInfo', params);
}