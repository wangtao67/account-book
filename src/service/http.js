
import Utils from '../assets/js/Utils'

import { baseUrl } from './config'  // 基本url api地址

//  引导弹窗等控制显示
export const getTypeList = function () {  
    return  http.get(baseUrl + 'expCostTypes');
}
