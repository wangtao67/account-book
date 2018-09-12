
<template>
  <div class="tab-wrap">
    <ul class="flex tab-list">
      <li class="tab-item flex-1" :class="{'active': $route.name === 'index'}" @click="goRouter('index')">
        <div class="icon-wrap">
          <img class="tab-icon" :src="require(`./img/money${$route.name === 'index' ? '_ac' : ''}.png`)">
        </div>
        <div class="tab-name">明细</div>
      </li>
      <li class="tab-item flex-1" :class="{'active': $route.name === 'graph'}" @click="goRouter('graph')">
        <div class="icon-wrap">
          <img class="tab-icon" :src="require(`./img/graph${$route.name === 'graph' ? '_ac' : ''}.png`)">
        </div>
        <div class="tab-name">报表</div>
      </li>
      <li class="tab-item flex-1 add-item">
        <div class="icon-wrap">
          <div class="tab-add">+</div>
        </div>
        <div class="tab-name">记一笔</div>
      </li>
      <li class="tab-item flex-1" :class="{'active': $route.name === 'explore'}" @click="goRouter('explore')">
        <div class="icon-wrap">
          <img class="tab-icon" :src="require(`./img/explore${$route.name === 'explore' ? '_ac' : ''}.png`)">
        </div>
        <div class="tab-name">发现</div>
      </li>
      <li class="tab-item flex-1" :class="{'active': $route.name === 'mine'}" @click="goRouter('mine')">
        <div class="icon-wrap">
          <img class="tab-icon" :src="require(`./img/person${$route.name === 'mine' ? '_ac' : ''}.png`)">
        </div>
        <div class="tab-name">我的</div>
      </li>
    </ul>
  </div>   
</template>

<script>
export default {
  props: {
       
  },

  data() {
    return {
     
    };
  },

  methods: {
    goRouter (name) {
      this.$router.push({ name });
    }
  } 
};

</script>
<style lang="less" scoped>
  .tab-wrap {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    border-top: 1px solid #c3c3c3;
    .tab-item {
      text-align: center;
      font-size: .12rem;
      padding: .07rem 0;
      .tab-name {
        margin-top: .05rem;
      }
      .tab-icon {
        display: block;
        width: .22rem;
        margin: 0 auto;
      }  
    }
    
    .add-item {
      margin-top: -.31rem;
      text-align: center;
      .icon-wrap {
        padding: .05rem;
        

      }
      .tab-add {
        height: .43rem;
        width: .43rem;
        line-height: .43rem;
        font-size: .4rem;
        color: #333;
        background: #fcda55;
        border-radius: 50%;
        margin: 0 auto;
      }
    }
  }
</style>