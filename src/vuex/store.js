import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

// 应用初始状态
const state = {
    homeListScrollY: 0,  // 主页列表滚动位置
    searchListScrollY: 0, // 搜索列表滚动位置
    orderListScrollY: 0  // 订单列表滚动位置

}

// 定义所需的 mutations
const mutations = {
    SETHOMEPOSITION(state,value) {
        state.homeListScrollY = value
    },
    SETSEARCHPOSITION(state,value) {
        state.searchListScrollY = value
    },
    SETORDERLISTPOSITION(state,value) {
        state.orderListScrollY = value
    },
}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations
})