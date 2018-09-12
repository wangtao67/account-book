<template>
  <div class="index-page">
    <div class="header flex bg-white">
      <div class="month-wrap flex-1">
        <div class="year">2018</div>
        <div class="month">8月</div>        
      </div>
      <div class="income h-item flex-1">
        <div class="it-name">收入(元)</div>
        <div class="it-val">{{ 700 }}</div>
      </div>
      <div class="cost h-item flex-1">
        <div class="it-name">支出(元)</div>
        <div class="it-val">{{ 700 }}</div>
      </div>
      <div class="rest h-item flex-1">
        <div class="it-name">结余(元)</div>
        <div class="it-val">{{ 300 }}</div>
      </div>
    </div>

    <div class="record">
      <ul class="day-record-list">
        <li class="day-record-item">
          <div class="it-header">
            <span class="date">{{ '19日 星期日' }}</span>
            <span class="total-cost fr">支出：{{ '609' }}</span>
          </div>
          <ul class="record-list">
            <li class="record-item">
              <span class="categray">【零食】</span>
              <span class="content">鸡排</span>
              <span class="cost fr">{{ '-24.00' }}</span>
            </li>
          </ul>
        </li>
        <!-- <li v-for="item in recordList">
          
        </li> -->
      </ul>
    </div>
    
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    mounted() {
      
    },
    components: {
    },
    methods: {
      
    }
  }
</script>

<style lang="less">
  .index-page {
    .header {
      text-align: center;
      padding: .08rem 0;

      .it-name {
        color: #a89b9b;
        font-size: .12rem;
      }
      .it-val {
        margin-top: .05rem;
        font-size: .14rem;
      }
    }
    .record {
      .day-record-list {

      }
      .it-header {
        padding: .1rem;
        color: #a89b9b;
      }
      .record-item {
        padding: .12rem .15rem;
        background-color: #fff;
        .content {
          margin-left: .25rem;
        }
      }
    }
  }

</style>
