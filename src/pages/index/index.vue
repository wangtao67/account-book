<template>
  <div class="index-page">
    <div class="header flex bg-white">
      <div class="month-wrap flex-1">
        <div class="year">2018</div>
        <div class="month" @click="chooseMonth">{{nowMonth}}月 <span class="down-arrow"></span></div>        
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
    <mt-popup
      class="month-modal"
      v-model="showMonthMd"
      position="bottom">
        <div class="modal-header flex">
          <div class="flex-1" @click="showMonthMd = false">取消</div>
          <div class="sure-btn" @click="chooseMonthFn">确定</div>
        </div>
        <mt-picker :slots="slots" @change="monthChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        nowMonth: 10,
        showMonthMd: false,
        slots: [
          {
            flex: 1,
            values: ['2014', '2015', '2016', '2017', '2018'],
            className: 'slot1',
            textAlign: 'right'
          }, {
            flex: 1,
            divider: true,
            content: '年',
            className: 'slot2',
            textAlign: 'center'
          }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06','07', '08'],
            className: 'slot3',
            textAlign: 'left'
          },
          {
            flex: 1,
            divider: true,
            content: '月',
            className: 'slot4',
            textAlign: 'left'
          }, 
        ]
      }
    },
    mounted() {
      
    },
    components: {
    },
    methods: {
      chooseMonth () {
        this.showMonthMd = true;
      },
      monthChange () {

      },
      chooseMonthFn () {},
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
      .month-wrap {
        .month {
          margin-top: .05rem;
          .down-arrow {
            display: inline-block;
            width: .15rem;
            height: .15rem;
            background: url('../../assets/img/down_arrow.png') no-repeat center center;
            background-size: 100% 100%;
            transform: translateY(.04rem);
          }
        }
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
    .month-modal {
      width: 100%;
      .modal-header {
        height: .4rem;
        line-height: .4rem;
        padding: 0 .12rem;
        border-bottom: 1px solid #eee;
        font-size: .16rem;
        .sure-btn {
          color: #2196f3;
        }
      }
    }
  }

</style>
