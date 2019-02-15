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
          <div class="month-wrap">
            <div class="year">{{ 2019 }}</div>
            <div class="month" @click="">{{ 2 }}月 <span class="down-arrow"></span></div>        
          </div>
          <div class="income h-item flex-1">
            <div class="it-name">收入(元)</div>
            <div class="it-val">{{ 222 }}</div>
          </div>
          <div class="cost h-item flex-1">
            <div class="it-name">支出(元)</div>
            <div class="it-val">{{ 444 }}</div>
          </div>  
        </div>
        <div class="chart">
          <div class="pie-chart" id="pie-chart"></div>
        </div>
      </div>

      <div class="income-wrap">

      </div>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  export default {
    data() {
      return {
        payType: 2,
      }
    },
    created() {
      this.$nextTick( () => {
        this.makePieChart();
      });
      
    },
    components: {
    },
    methods: {
      checkTab (type) {
        this.payType = type;
      },
      makePieChart () {
        var self = this;
        var pieChart = echarts.init(document.getElementById('pie-chart'));
        
        var piedata = [
          {
            name: '青桔单车',
            value: 15,
            itemStyle: {
              color: '#1171ff',
            },
          },
          {
            name: '其他',
            value: 10,
            itemStyle: {
              color: '#19aaff',
            },
          },
          {
            name: '其他',
            value: 5,
            itemStyle: {
              color: '#32ffff',
            },
          },
          {
            name: '摩拜单车',
            value: 40,
            itemStyle: {
              color: '#022e9f',
            },
          },
          {
            name: 'ofo',
            value: 30,
            itemStyle: {
              color: '#044ebe',
            },
          },
        ];
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
              radius: ['45%', '60%'],
              center: ['38%', '52%'],
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
        }
      }
      
    }
  }

</style>
