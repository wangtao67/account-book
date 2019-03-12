
<template>
  <!-- 弹窗 -->
  <div class="md-wrap erwei-md" v-show="visible">
    <div class="md-content text-center">
      <div class="md-title">
        <slot name="header">
          <p class="title">{{title}}</p>
        </slot>
      </div>
        <div class="md-body">
          <slot name="body">
                       
          </slot>
        </div>
            
        <div class="md-bottom text-center flex bottom-btn" >
          <button class="cancel-btn" @click="hideHandle">取消</button>
          <button class="sure-btn" @click="comfirmHandle">确定</button>
        </div>    
      </div>
  </div>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '提示'
    }
  },
  data() {
    return {
    
    };
  },
  created () {
    
  },
  methods: {
    hideHandle () {
      this.$emit('hideFn');
    },
    comfirmHandle () {
      this.$emit('comfirmFn');
    }
  } 
};

</script>
<style lang="less" scoped>
  .md-wrap {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,.5);
    z-index: 6;
    padding-left: .15rem;
    padding-right: .15rem;
    .md-content {
        position: absolute;
        min-width: 50%;
        max-width: 90%;
        top: 40%;
        left: 50%; 
        transform: translate(-50%, -50%);
        background: #fff;
        font-size: .14rem;
        overflow: hidden;
        border-radius: .03rem;
        .md-title {
          padding-top: .08rem;
          padding-bottom: .08rem;
          color: #000;
          font-size: .14rem;
          text-align: center;
          border-bottom: 1px solid #ddd;
        }
        .md-body {
          padding: .1rem .25rem;
          font-size: .12rem;
        }
        .md-bottom {
            width:80%;
            color: #08c2b5;
            font-size: .16rem;
            background-color: #fafcfc;
            text-align: center;
            margin:.1rem auto;
            justify-content: flex-end;
            button {
              color: #fff;
              padding: .05rem .08rem;
              border-radius: .03rem;
            }
            .sure-btn {
              margin-left: .06rem;
              background-color: rgba(0, 149, 255, 0.85);
            }
            .cancel-btn {
              background-color: #d1d1d1;
            }

        }  
    }
}
</style>