<template>
  <div class="mine-page">
    <div class="basic-info">
      <div class="info flex">
        <div class="head-img">
          <img src="../../assets/img/man.png">
        </div>
        <div class="user-wrap flex-1">
          <p class="username">{{ userinfo.username }}</p>
          <p v-if="userinfo.tel" class="phone">手机号：{{ userinfo.tel || '绑定电话' }}</p>
          <p v-else class="bind-phone">绑定电话</p>          
        </div>
      </div>
      <div class="accounts flex">
        <div class="flex-1 ac-item">
          <div class="ac-value">0</div>
          <div class="ac-name">我的钱包(元)</div>
        </div>
        <div class="flex-1 ac-item">
          <div class="ac-value">0</div>
          <div class="ac-name">我的预记币</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { getUserInfo } from '@service/http';
  export default {
    data() {
      return {
        userinfo: {}
      }
    },
    created () {
      this.getUser();
    },
    mounted() {
      
    },
    components: {
    },
    methods: {
      getUser () {
        var me = this;
        getUserInfo({
          uid: Storages.cookie.get('uid'),
        }).then(({data})=> {
          if (data.state === 1) {
            me.userinfo = data.data;
          } else  {
            me.$toast(data.msg);
          }
        });
      }
    }
  }
</script>

<style lang="less">
  .mine-page {
    .basic-info {
      background-color: #fff;
      margin-top: .1rem;
      .info {
        padding: .1rem;
        .head-img {
          width: .4rem;
          height: .4rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .user-wrap {
          margin-left: .1rem;
          .username {
            font-size: .14rem;
          }
          .phone,
          .bind-phone {
            margin-top: .04rem;
            font-size: .12rem;
            color: #747272;
          }
          .bind-phone {
            color: #165a87;
          }
        }
      }  
      .accounts {
        padding-top: .1rem;
        padding-bottom: .18rem;
        .ac-item {
          text-align: center;
          &:first-child {
            border-right: 1px solid rgba(133, 131, 131, 0.45);
          }
          .ac-name {
            font-size: .12rem;
            color: #858383;
          }
          .ac-value {
            font-size: .14rem;
          }
        }
      }
    }
    
  }

</style>
