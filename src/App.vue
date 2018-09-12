<template>
  <div id="app">
    
    <router-view></router-view>

    <tabbar></tabbar>
     
  </div>
</template>

<script>
  import tabbar from './components/tabbar/index';
  export default {
    data() {
      return {
      	item: {
      		id: 1,
          name: 'vue'
        }
      }
    },
    mounted() {
      
    },
    components: {
      tabbar
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
