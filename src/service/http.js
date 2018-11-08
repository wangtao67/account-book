
import Utils from '../assets/js/Utils'

import { baseUrl } from './config'  // 基本url api地址

// 获取类型
export const getTypeList = function () {  
  return http.get(baseUrl + 'expCostTypes');
}

// 新增类型
export const addExpCostType = function (params) {  
  return http.post(baseUrl + 'addexpCostType', params);
}

// 新增记录
export const addExpCostRecord = function (params) {  
  return http.post(baseUrl + 'addRecord', params);
}

