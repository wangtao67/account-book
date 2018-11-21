<template>
  <div id="app">
    <router-view :key="activeDate"></router-view>
    <tabbar v-show="showTabbar"></tabbar>
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
        activeDate: '', // 解决跳转相同组件页面不刷新
      	showTabbar: false,
        showTabMenus: ['index', 'explore', 'graph', 'mine']
      }
    },
    created() {

        
    },
    watch: {
      '$route' (to, from) {
        this.showTabbar = this.showTabMenus.includes(to.name) ? true : false;
        this.activeDate = new Date() + '';
      }
    },
    computed:{
      ...mapState({
        showAdd: state => state.showAdd
      }),
    },
    methods: {
      
    }
  }
</script>

<style lang="less">
body{
  margin: 0;
}
 @import url('./assets/style/base.less');
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  

</style>
