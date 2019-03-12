<template>
  <div class="index-page">
    <div class="header flex bg-white">
      <div class="month-wrap flex-1">
        <div class="year">{{ selectMonth.year }}</div>
        <div class="month" @click="chooseMonth">{{ selectMonth.month }}月 <span class="down-arrow"></span></div>        
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
    <!-- <mt-popup
      class="month-modal"
      v-model="showMonthMd"
      position="bottom">
        <div class="modal-header flex">
          <div class="flex-1" @click="showMonthMd = false">取消</div>
          <div class="sure-btn" @click="chooseMonthFn">确定</div>
        </div>
        <mt-picker :slots="monthSlots" @change="monthChange"></mt-picker>
    </mt-popup> -->
    <monthSelect  :showMd="showMonthMd" :defalutMonth="fomerMonthStr" @showChange="monthShowChange" @dateCreated="dateCreated" @cancelFn="showMonthSelect = false" @sureFn="chooseMonthCb"></monthSelect>
  </div>
</template>


<script>
  import { getRecordList, getMonthAccount } from '@service/http';
  import { mapState, mapGetters, mapActions } from 'vuex';
  export default {
    data() {
      return {
        modalMonth: {},
        // selectMonth: {},
        showMonthMd: false,
        monthAccount: {}, // 月统计
        recordList: []
      }
    },
    created() {
      // this.makeMonthSlots();
      // this.getMonthAccount();
      // this.getRecord();
    },
    computed: {
      ...mapState({ 
        selectMonth: state => state.nowMonth
      }),
      fomerMonthStr () {
        return this.formatMonth(this.selectMonth);
      }
    },
    methods: {
      ...mapActions([
        'setNowMonth' 
      ]),
      /**
       * 获取月统计数据
       */
      getMonthAccount () {
        let me = this;
        let searchMonth = me.formatMonth(me.selectMonth);
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
        let searchMonth = me.formatMonth(me.selectMonth);
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
      monthShowChange (val) {
        this.showMonthMd = val;
      },
      chooseMonthCb (val) {
        this.showMonthMd = false;
        this.setNowMonth(val);
        this.getRecord();
      },
      /**
       * 月份组件渲染年月信息后
       * @param {object} val {year, month} 
       */
      dateCreated (val) {
        let me = this;
        console.log(val);
        var monthObj;
        if (me.selectMonth.month) {
          monthObj = me.selectMonth;
        } else {
          monthObj = val;
          this.setNowMonth(val);
        }
        let searchMonth = this.formatMonth(monthObj);
        this.getMonthAccount();
        this.getRecord();
      },
      // /**
      //  * 生成年月数据
      //  */
      // makeMonthSlots () {
      //   var me = this;
      //   let dateObj = new Date();
      //   let nowYear = dateObj.getFullYear(),
      //     nowMonth = dateObj.getMonth() + 1;
      //   let yearArr = [];
      //   for (let i = nowYear; i >= nowYear - 2; i--) {
      //     yearArr.push(String(i));
      //   }
      //   yearArr.reverse(); 
      //   me.monthSlots[0].values = yearArr;
      //   me.monthSlots[0].defaultIndex = yearArr.length - 1;
      //   me.monthSlots[2].defaultIndex = nowMonth - 1;
        
      //   let monthObj = {
      //     year: nowYear,
      //     month: nowMonth
      //   };
      //   me.setNowMonth(monthObj);
      // },   
      chooseMonth () {
        this.showMonthMd = true;
      },
      // chooseMonthFn () {
      //   this.showMonthMd = false;
      //   // this.selectMonth = this.modalMonth;
      //   this.setNowMonth(val);
      //   this.getRecord();
      //   this.getMonthAccount();
        
      // },
      /**
       * 将年月格式化为标准6位年月
       */
      formatMonth (selectMonth) {
        if (!selectMonth.month || !selectMonth.year) {
          return;
        }
        let year = selectMonth.year;        
        let month = selectMonth.month;
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
