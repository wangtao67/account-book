
// import Utils from '../assets/js/Utils';
import Storages from "@assets/js/storages";
import { baseUrl } from './config';  // 基本url api地址

http.interceptors.push((request, next) => {
	var uid = Storages.cookie.get('uid');
	if (request.method === 'POST') {
		request.body.uid = uid; // 设置请求uid
	} 
	else if (request.method === 'GET') {
		request.params.uid = uid; // 设置请求uid
  }
  next((response) => {
    if (response.status === 0) {
      alert('请求失败');
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

var url = "http://192.168.10.115:7086/system/data?module=rec&service=RechargeCard&method=addRechargeCard&companyid=20190227102852830586227948106682&account=18603646001&mebid=20190615092811153335497927341097&carnumber=%E6%B5%99V89001%2C%E6%B5%99V89002%2C%E6%B5%99V89003%2C%E6%B5%99V89004&ploid=20181203123900941200783475811106%2C20181128165915711562788249990276%2C20181127192355367788826606020438&usetype=1&addusername=FY001&ve=2&ms=1551345996179&clientType=html&u=20181123094515571162126640435276&t=0080251392104310765639&v=20190228171259980526828935524200&comid=200000044&sign=fb07feb785e801721afebc99fbace3af";
http.post(url, {});
