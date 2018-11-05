
<template>
  <mt-popup
    v-model="showAdd"
    position="right"
    class="add-modal">
    <div class="record-wrap">
      <header class="header">
        <div>
          <span class="back" @click="showAddFn(false)"><</span>
          <div class="title">记一笔</div>  
        </div>
        <div class="tab-wrap">
          <div class="tab flex">
            <div class="tab-item flex-1" :class="{'active': payType === 1}" @click="checkTab(1)">收入</div>
            <div class="tab-item flex-1" :class="{'active': payType === 2}" @click="checkTab(2)">支出</div>
          </div>
        </div>
      </header>
      <div class="tab-content">
        <div v-show="payType === 1" class="cost-wrap">
          <ul class="type-list flex">
            <li v-for="item in incomeTypes" class="type-item" @click="selectType(item)">
              <div class="add-img">{{item.name.substring(0, 1)}}</div>
              <div class="type-name">{{item.name}}</div>
            </li>
          </ul>
        </div>
        <div v-show="payType === 2" class="income-wrap">
          <ul class="type-list flex">
            <li v-for="item in costTypes" class="type-item" @click="selectType(item)">
              <div class="add-img">{{item.name.substring(0, 1)}}</div>
              <div class="type-name">{{item.name}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
   <!--  <mt-popup
    v-model="showFormMd"
    position="bottom"
    class="form-modal">
      <div>
        <mt-field label="金额" placeholder="请输入数字" type="number" v-model="form.amount"></mt-field>
        <mt-field label="日期" placeholder="请输入生日" type="date" v-model="form.date"></mt-field>
        <mt-field label="备注" placeholder="备注" type="textarea" rows="4" v-modal="form.memo"></mt-field>
      </div>
      
    </mt-popup> -->
<!--     <mt-popup
    v-model="showDateMd"
    position="bottom"
    class="date-modal"> -->
      <mt-datetime-picker
        v-model="showDateMd"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日">
      </mt-datetime-picker>
    <!-- </mt-popup> -->
  </mt-popup> 
</template>
<script>
import { mapActions } from 'vuex';
import { getTypeList } from '../../service/http';
export default {
  props: {
    showAdd: {
      type: Boolean,
      default: false
    } 
  },

  data() {
    return {
      costTypes: [],
      incomeTypes: [],
      payType: 2,
      showFormMd: false,
      showDateMd: false,
      form: {
        amount: 0,
        date: '',
        memo: ''
      }
    };
  },
  created () {
    getTypeList().then(({data}) => {
      console.log(data);
      var typeList = data;
      this.costTypes = typeList.filter(item => item.type === 1);
      this.incomeTypes = typeList.filter(item => item.type === 2);
    });
  },
  methods: {
    ...mapActions({
      showAddFn: 'showAddFn' 
    }),
    checkTab (type) {
      this.payType = type;
    },
    selectType (item) {
      console.log(item);
      this.showFormMd = true;
    }
  } 
};

</script>
<style lang="less" scoped>
  .add-modal {
    width: 100%;
    height: 100%;
    .record-wrap {
      width: 100%;
      background: #f1ecec;
      width: 100%;
      height: 100%;
    } 
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
            height: .2rem;
            line-height: .2rem;
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
    .tab-content {
      .type-list {
        padding: 0.05rem .2rem;
        flex-wrap: wrap;
        justify-content: space-between;
        .type-item {
          text-align: center;
          margin: .15rem .1rem 0;

          .add-img {
            width: .4rem;
            height: .4rem;
            line-height: .4rem;
            background: #fff;
            font-size: .18rem;
            border-radius: 50%;
          }
          .type-name {
            font-size: .14rem;
            margin-top: .05rem;
          }
        }
      }
      .cost-wrap {

      }
    } 
    .form-modal {
      width: 100%;
    }
  }
  
</style>