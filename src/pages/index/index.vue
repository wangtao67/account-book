<template>
  <div class="index-page">
    <div class="header flex bg-white">
      <div class="month-wrap flex-1">
        <div class="year">{{ slectMonth.year }}</div>
        <div class="month" @click="chooseMonth">{{ slectMonth.month }}月 <span class="down-arrow"></span></div>        
      </div>
      <div class="income h-item flex-1">
        <div class="it-name">收入(元)</div>
        <div class="it-val">{{ monthAccount.userIncome }}</div>
      </div>
      <div class="cost h-item flex-1">
        <div class="it-name">支出(元)</div>
        <div class="it-val">{{ monthAccount.userCost }}</div>
      </div>
      <div class="rest h-item flex-1">
        <div class="it-name">结余(元)</div>
        <div class="it-val">{{ monthAccount.userBalance }}</div>
      </div>
    </div>
    <div class="record">
      <p v-if="!recordList.length" class="no-list">暂无记录</p>
      <ul v-else class="day-record-list">
        <li class="day-record-item" v-for="item in recordList" :key="item.id">
          <div class="it-header">
            <span class="date">{{item.date}}</span>
            <span class="total-cost fr">支出：{{item.totalCost}}&nbsp;&nbsp;&nbsp;收入：{{item.totalIncome}}</span>
          </div>
          <ul class="record-list">
            <li class="record-item" v-for="recItem in item.records" :key="recItem.id">
              <span class="categray">【{{recItem.useTypeName}}】</span>
              <span class="content">{{recItem.memo}}</span>
              <span class="cost fr" :class="{'green-color': recItem.type === 1 }">{{recItem.type === 2 ? ('-' + recItem.amount) : recItem.amount}}</span>
            </li>
          </ul>
        </li>
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
        <mt-picker :slots="monthSlots" @change="monthChange"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
  import { getRecordList, getMonthAccount } from '@service/http';
  export default {
    data() {
      return {
        modalMonth: {},
        slectMonth: {},
        showMonthMd: false,
        monthAccount: {}, // 月统计
        monthSlots: [
          {
            flex: 1,
            values: ['2017', '2018'],
            className: 'slot1',
            textAlign: 'right',
          }, {
            flex: 1,
            divider: true,
            content: '年',
            className: 'slot2',
            textAlign: 'center'
          }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06','07', '08', '09', '10', '11', '12'],
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
        ],
        recordList: []
      }
    },
    created() {
      this.makeMonthSlots();
      this.getMonthAccount();
      this.getRecord();
    },
    components: {
    },
    methods: {
      /**
       * 获取月统计数据
       */
      getMonthAccount () {
        let me = this;
        let searchMonth = me.formatMonth(me.slectMonth);
        getMonthAccount({
          uid: Storages.cookie.get('uid'),
          month: searchMonth
        }).then(({data}) => {
          if (data.state === 1) {
            me.monthAccount = data.data;
          } else  {
            me.$toast(data.msg);
          }
        });   
      },
      /**
       * 获取记录数据
       */
      getRecord () {
        let me = this;
        let searchMonth = me.formatMonth(me.slectMonth);
        getRecordList({
          uid: Storages.cookie.get('uid'),
          searchMonth: searchMonth
        }).then(({data}) => {
          if (data.state === 1) {
            me.recordList = data.list;
          } else  {
            me.$toast(data.msg);
          }
        });   
      },
      /**
       * 生成年月数据
       */
      makeMonthSlots () {
        let dateObj = new Date();
        let nowYear = dateObj.getFullYear(),
          nowMonth = dateObj.getMonth() + 1;
        let yearArr = [];
        for (let i = nowYear; i >= nowYear - 2; i--) {
          yearArr.push(String(i));
        }
        yearArr.reverse(); 
        this.monthSlots[0].values = yearArr;
        this.monthSlots[0].defaultIndex = yearArr.length - 1;
        this.monthSlots[2].defaultIndex = nowMonth - 1;
        
        this.slectMonth.year =  nowYear;
        this.slectMonth.month = nowMonth;
      },   
      chooseMonth () {
        this.showMonthMd = true;
      },
      monthChange (picker, value) {
        this.modalMonth.year = value[0];
        this.modalMonth.month = value[1];
        console.log(value);
      },
      chooseMonthFn () {
        this.showMonthMd = false;
        this.slectMonth = this.modalMonth;
        this.getRecord();
        this.getMonthAccount();
        
      },
      /**
       * 将年月格式化为标准6位年月
       */
      formatMonth (slectMonth) {
        let year = slectMonth.year;        
        let month = slectMonth.month;
        month = Number(month);
        if (month < 10) {
          month = '0' + month;
        }
        return year + '-' + month + '';
      }
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
      padding-bottom: .8rem;
      .no-list {
        margin-top: .6rem;
        text-align: center;
        color: #888;
      }
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
        .cost {
          color: #e6cc68;
          &.green-color {
            color: #31cf31;
          }
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
