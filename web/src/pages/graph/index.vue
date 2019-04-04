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
    <div class="content">
      <div class="cost-wrap">
        <div class="total-wrap flex">
          <div class="month-wrap" @click="fnn">
            <div class="year">{{ selectMonth.year }}</div>
            <div class="month">{{ selectMonth.month }}月 <span class="down-arrow"></span></div>        
          </div>
          <div class="income h-item flex-1">
            <div class="it-name">收入(元)</div>
            <div class="it-val">{{ monthAccount.userIncome }}</div>
          </div>
          <div class="cost h-item flex-1">
            <div class="it-name">支出(元)</div>
            <div class="it-val">{{ monthAccount.userCost }}</div>
          </div>  
        </div>
        <div class="chart">
          <div class="pie-chart" id="pie-chart"></div>
        </div>
        <div class="range">
          <div class="range-tt">
            <h4>支出排行榜</h4>
          </div>
          <ul>
            <li class="range-item flex" v-for="item in categorysData" :key="item.name">
              <span class="rg-icon">{{item.name.substring(0, 1)}}</span>
              <div class="rg-main flex-1">
                <div class="flex">
                  <div class="rg-it-name flex-1">{{ item.name}} &nbsp;{{ (item.percent * 100) + '%'}}</div>
                  <div class="rg-it-val">{{ item.value }}</div>
                </div>
                <div class="bar-wrap">
                  <div class="bar" :style="{'width': (item.percent * 100) + '%'}"></div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="income-wrap">

      </div>
    </div>

    <monthSelect  :showMd="showMonthSelect" :defalutMonth="fomerMonthStr" @showChange="monthShowChange" @dateCreated="dateCreated" @cancelFn="showMonthSelect = false" @sureFn="chooseMonthCb"></monthSelect>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import { getMonthAccount, getUserMonthTypeAccount } from '@service/http'; 
  import { mapState, mapGetters, mapActions } from 'vuex';

  export default {
    data() {
      return {
        payType: 2,
        monthAccount: {}, // 月统计
        showMonthSelect: false,
        nowDate: {
          year: '',
          month: ''
        },
        categorysData: [],
      }
    },
    created() {
      var me = this;
      me.$nextTick( () => {
        
      });
      
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
      fnn () { 
        this.showMonthSelect = true; 
        console.log(this.showMonthSelect); 
      },
      checkTab (type) {
        this.payType = type;
      },
      chooseMonthCb (val) {
        var me = this;
        me.showMonthSelect = false;
        me.setNowMonth(val);
        console.log(val);
        console.log(me.fomerMonthStr);
        me.getMonthAccount(me.formatMonth(val));
        me.getUserMonthTypeAccountFn (me.formatMonth(val));
      },
      /**
       * 月份组件渲染年月信息后
       * @param {object} val {year, month} 
       */
      dateCreated (val) {
        let me = this;
        var monthObj;
        if (me.selectMonth.month) {
          monthObj = me.selectMonth;
        } else {
          monthObj = val;
          me.setNowMonth(val);
        }
        let searchMonth = me.formatMonth(monthObj);
        me.getMonthAccount(searchMonth);
        me.getUserMonthTypeAccountFn(searchMonth);
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
      },
      monthShowChange (val) {
        this.showMonthSelect = val;
      },
      /**
       * 获取月统计数据
       */
      getMonthAccount (searchMonth) {
        let me = this;
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
      getUserMonthTypeAccountFn (searchMonth) {
        let me = this;
        getUserMonthTypeAccount({
          uid: Storages.cookie.get('uid'),
          month: searchMonth
        }).then(({data}) => {
          console.log(data);
          if (data.state === 1) {
            var categorys = data.data.categorys;
            me.categorysData = categorys;
            categorys = sortCategory(categorys);
            if (categorys.length) {
              makeChart(categorys);
            } else {
              // nodata
            }
          } else  {
            me.$toast(data.msg);
          }
        }); 

        /**
         * 排序分类统计（按从大到小）
         */
        function sortCategory (categorys) {
          for (let j = 0; j < categorys.length; j++ ) {
            for (let i = 0; i < categorys.length - 1 - j; i++) {
              var temp = {};
              if (categorys[i].value < categorys[i + 1].value) {
                temp = categorys[i];
                categorys[i] = categorys[i + 1];
                categorys[i + 1] = temp;
              }
            }  
          }
          return categorys;
        }
        
        /**
         * 生成pie图
         */
        function makeChart (categorys) {
          var self = this;
          var pieChart = echarts.init(document.getElementById('pie-chart'));
          var colors = ['#e30c33', '#ff584f', '#fd7b1c', '#fdab2a', '#ffd038', '#7de352', '#63ee29', ];
          var piedata = [], i = 0;
          categorys.forEach((item, index) => {
            piedata.push({
              name: item.name,
              value: item.value,
              itemStyle: {
                color: colors[index],
              },
            });
          });
          
          console.log(piedata);
          var option = {
            tooltip: {
              trigger: 'item',
              formatter: '{b} {d}%',
              textStyle: {
                fontSize: 12,
              },
            },
            legend: {
              show: false,
            },
            series: [
              {
                name: '共享单车品牌占比',
                type: 'pie',
                radius: ['35%', '55%'],
                center: ['50%', '52%'],
                avoidLabelOverlap: false,
                label: {
                  normal: {
                    color: '#aac1d6',
                    fongSize: 12,
                  },
                },
                labelLine: {
                  normal: {
                    show: true,
                    length: 5,
                    length2: 5,
                    lineStyle: {
                      color: '#aac1d6',
                    },
                  },
                },
                data: piedata,
              },
            ],
          };
          
          pieChart.setOption(option);
        }
      },
    }
  }
</script>

<style lang="less">
  .graph-page {
    padding-bottom: .6rem;
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
    .content {
      .total-wrap {
        padding-top: .06rem;
        padding-bottom: .06rem;
        background-color: #fff;
        align-items: center;
        text-align: center;
        .month-wrap {
          padding-left: .15rem;
          padding-right: .15rem;
          .month {
            margin-top: .02rem;
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
        .income {
          border-left: 1px solid #ddd;
          border-right: 1px solid #ddd;
        }
        .h-item {
          font-size: .12rem;
        }
        .it-val {
          font-size: .14rem;
          margin-top: .04rem;
        }
      }
      .chart {
        .pie-chart {
          height: 3rem;
          width: 100%;
          margin: 0 auto;
        }
      }
      .range {
        .range-tt {
          padding: 0 .12rem;
          margin-bottom: .1rem;
          & > h4 {
            padding: .13rem 0;
            font-size: .14rem;
            border-bottom: 1px solid #e6e6e6;
          }
        }

        .range-item {
          padding-left: .12rem;
          margin-top: .12rem;
          .rg-icon {
            display: inline-block;
            width: .25rem;
            height: .25rem;
            line-height: .25rem;
            background: #fcda55;
            font-size: .12rem;
            border-radius: 50%;
            color: #333;
            text-align: center;
          }
          .rg-main {
            margin-left: .18rem;
            padding-bottom: .1rem;
            border-bottom: 1px solid #e6e6e6;
            .rg-it-name {
              font-size: .12rem;
            }
            .rg-it-val {
              margin-right: .12rem;
            }
            .bar-wrap {
              height: .04rem;
              margin-top: .06rem;
              .bar {
                height: 100%;
                // width: 50%;
                background-color: #fcda55;
                border-radius: .05rem;
              }
            }
          }
        }
      }
    }
  }

</style>
