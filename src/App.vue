<template>
  <div id="app">
    
    <router-view></router-view>

    <tabbar></tabbar>

    <record-new :showAdd="showAdd"></record-new>
    
  </div>
</template>

<script>
  import tabbar from './components/tabbar/index';
  import recordNew from './components/recordNew/index';
  import { mapState } from 'vuex'

  export default {
    data() {
      return {
      	item: {
      		id: 1,
          name: 'vue'
        },
      }
    },
    mounted() {
      // http.post('http://localhost:3000/api/addexpCostType',
      //   {
      //     name : '退款',
      //     type: 2
      //   })
      
    },
    components: {
      tabbar,
      recordNew
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
