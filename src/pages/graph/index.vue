<template>
  <div class="graph-page">
    <header class="header">
      <div class="tab-wrap">
        <div class="tab flex">
          <div class="tab-item flex-1" :class="{'active': payType === 1}" @click="checkTab(1)">收入</div>
          <div class="tab-item flex-1" :class="{'active': payType === 2}" @click="checkTab(2)">支出</div>
        </div>
      </div>
    </header>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        payType: 2,
      }
    },
    mounted() {
      
    },
    components: {
    },
    methods: {
      checkTab (type) {
        this.payType = type;
      },
    }
  }
</script>

<style lang="less">
  .graph-page {
    .header {
      padding: .12rem .1rem;; 
      background: #fcda55;
      position: relative;
      .back {
        position: absolute;
        top: .06rem;
        left: .12rem;
        font-size: .25rem;
        float: left;
      }
      .title {
        text-align: center;
      }
      .tab-wrap {
        .tab {
          width: 50%;
          margin: .1rem auto 0;
          border: 1px solid #333;
          .tab-item {
            height: .25rem;
            line-height: .25rem;
            text-align: center;
            &:first-child {
              border-right: 1px solid #333;
            }
            &.active {
              background-color: #333;
              color: #fcda55;
            }
          }
        }
      }
    }
  }

</style>
