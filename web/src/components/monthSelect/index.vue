<template>
  <mt-popup
    class="month-modal"
    v-model="showMMd"
    position="bottom">
      <div class="modal-header flex">
        <div class="flex-1" @click="handleCancel">取消</div>
        <div class="sure-btn" @click="chooseMonthFn">确定</div>
      </div>
      <mt-picker :slots="monthSlots" @change="monthChange"></mt-picker>
  </mt-popup>
</template>

<script>
import { mapActions } from 'vuex'
export default {
 
  props: {
    showMd: {
      default: false,
      type: Boolean
    },
    defalutMonth: String  // YYYY-MM
  },
  data () {
    return {
      showMMd: this.showMd,
      modalMonth: {},
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
    }
  },
  watch: {
    showMMd: {
      handler: function(val) {
        this.$emit('showChange', val);
      },
    },
    showMd: {
      handler: function(val) {
        this.showMMd = val;
      },
    },
  },
  computed: {
 
  },
  created () {
    var me = this;

    var setMonth = '', setYear = '';
    if (me.defalutMonth) {
      setYear = me.defalutMonth.split('-')[0];
      setMonth = me.defalutMonth.split('-')[1];
    } else {
      let dateObj = new Date();
      setYear = dateObj.getFullYear(),
      setMonth = dateObj.getMonth() + 1;
    }
    let yearArr = [];
    for (let i = setYear; i >= setYear - 2; i--) {
      yearArr.push(String(i));
    }
    yearArr.reverse(); 

    this.monthSlots[0].values = yearArr;
    this.monthSlots[0].defaultIndex = yearArr.length - 1;
    this.monthSlots[2].defaultIndex = setMonth - 1;

    this.$emit('dateCreated', { year: setYear, month: setMonth });   
  },
  methods: {
    monthChange (picker, value) {
      this.modalMonth.year = value[0];
      this.modalMonth.month = value[1];
      console.log(value);
    },
    chooseMonthFn () {
      this.$emit('sureFn', this.modalMonth);
    },
    handleCancel () {
      this.$emit('cancelFn');
    }
  } 
};

</script>
<style lang="less" scoped>
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
</style>