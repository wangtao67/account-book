
<template>
  <div class="add-page">
    <div class="record-wrap">
      <header class="header">
        <div>
          <span class="back" @click="$router.go(-1)"><</span>
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
            <li v-for="item in incomeTypes" class="type-item" :key="item.name" @click="selectType(item)">
              <div class="add-img">{{item.name.substring(0, 1)}}</div>
              <div class="type-name">{{item.name}}</div>
            </li>
          </ul>
        </div>
        <div v-show="payType === 2" class="income-wrap">
          <ul class="type-list flex">
            <li v-for="item in costTypes" class="type-item" :key="item.name" @click="selectType(item)">
              <div class="add-img">{{item.name.substring(0, 1)}}</div>
              <div class="type-name">{{item.name}}</div>
            </li>
            <li class="type-add type-item" @click="showAddTypeMd = true">
              <div class="add-img">+</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <mDialog class="add-record" :visible="showAddRecordMd" title="新增" @hideFn="showAddRecordMd = false" @comfirmFn="addRecordFn">
      <div slot="body">
        <div class="cus-form">
          <div class="form-row">
            <label>类型</label>
            <div class="input-wrap">
              <div class="addtype-name">{{addRecord.useTypeName}}</div>
            </div>  
          </div>
          <div class="form-row">
            <label>日期</label>
            <div class="input-wrap">
              <input class="input" type="text" readonly v-model="addRecord.date" @click="openDate" placeholder="选择日期">
            </div>
          </div>
          <div class="form-row">
            <label>金额</label>
            <div class="input-wrap">
              <input class="input" type="text" v-model="addRecord.amount" placeholder="输入金额">
            </div>
          </div>
          <div class="form-row">
            <label>备注</label>
            <div class="input-wrap">
              <input class="input" type="text" v-model="addRecord.memo" placeholder="输入备注">
            </div>
          </div>
        </div>
      </div>
    </mDialog>
    <mt-datetime-picker
      ref="datePicker"
      v-model="recordDate"
      type="date"
      @confirm="dateChange"
      :endDate="new Date()"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日">
    </mt-datetime-picker>
    <mDialog class="add-type" :visible="showAddTypeMd" title="新增类型" @hideFn="showAddTypeMd = false" @comfirmFn="addTypeFn">
      <div slot="body">
        <div class="flex input-wrap">
          <label>类型名称</label>
          <input class="type-input" type="text" v-model="typeName" placeholder="类型名称">
        </div>
      </div>
    </mDialog>  
  </div>
</template>
<script>
import { mapActions } from 'vuex';
import { getTypeList, addExpCostType, addExpCostRecord } from '../../service/http';
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
      showAddRecordMd: false,
      showDateMd: true,
      showAddTypeMd: false, // 显示新增类型弹窗
      addRecord: {
        amount: '',
        date: '',
        useTypeId: '',
        useTypeName: '',
        memo: ''
      },
      typeName: '',
      recordDate: new Date()
    };
  },
  created () {
    this.getTypeList();
  },
  methods: {
    ...mapActions({
      showAddFn: 'showAddFn' 
    }),
    getTypeList () {
      getTypeList().then(({data}) => {
        var typeList = data.list;
        this.costTypes = typeList.filter(item => item.type === 2);
        this.incomeTypes = typeList.filter(item => item.type === 1);
      });
    },
    checkTab (type) {
      this.payType = type;
    },
    selectType (item) {
      this.addRecord.useTypeId = item._id;
      this.addRecord.useTypeName = item.name;
      this.showAddRecordMd = true;
    },
    /**
     * 添加类型
     */
    addTypeFn () {
      let typeName = this.typeName;
      let type = this.payType;
      if (!typeName) {
        this.$toast({
          message: '请输入类型名称',
          position: 'top',
        });
        return false;
      }
      addExpCostType({
        name: typeName,
        type: type
      }).then(res => {
        this.showAddTypeMd = false;
        this.$toast('添加成功');
        this.getTypeList();
      });
    },
    /**
     * 添加消费
     */
    addRecordFn () {
      var addRecord = this.addRecord;
      if (!addRecord.date || !addRecord.amount) {
        this.$toast({
          message: '请输入完整！',
          position: 'top',
        });
        return false;
      }
      addExpCostRecord({
        date: addRecord.date,
        amount: addRecord.amount,
        memo: addRecord.memo,
        useTypeId: addRecord.useTypeId,
        useTypeName: addRecord.useTypeName,
        type: this.payType
      }).then(res => {
        console.log(res);
        if (res.body.state === 1) {
          this.showAddRecordMd = false;
          this.$toast('添加成功');
        } else {
          this.$toast(res.body.msg);
        }
      });
    },
    openDate () {
      this.$refs['datePicker'].open();
    },
    dateChange (value) {
      console.log(value);
      this.addRecord.date = this.Util.formatDate(value);
    }
    
  } 
};

</script>
<style lang="less" scoped>
  .add-page {
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
        .type-item {
          text-align: center;
          margin: .15rem .12rem 0;

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
        .type-add {
          .add-img {
            font-size: .24rem;
          }
        }
      }
      .cost-wrap {

      }
    } 
    .form-modal {
      width: 100%;
    }
    .add-type {
      .input-wrap {
        margin-top: .1rem;
        margin-bottom: .1rem;
        label {
          padding-top: .05rem;
          width: .6rem;
        }
        .type-input {
          height: .3rem;
          width: 1rem;
          border: 1px solid #ddd;
          padding-left: .05rem;
        }
      }
    }
    .add-record {
      .input-wrap {
        width: 1.4rem;
      }
      .addtype-name {
        text-align: left;
        font-size: .14rem;
        color: #2adace;
      }
    }
  }
  
</style>