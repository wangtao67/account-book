<template>
  <div class="login-page">
    <div class="bg-mask"></div>
    <form class="login-form cur-form">
      <div class="form-row flex">
        <i class="icon name-ic"></i>
        <div class="input-wrap flex-1">
          <input class="lg-input" type="text" v-model="form.username" placeholder="账号"> 
        </div>
      </div>
      <div class="form-row">
        <i class="icon name-ic"></i>
        <div class="input-wrap">
          <input class="lg-input" type="text" v-model="form.password" placeholder="密码"> 
        </div>  
      </div>
      <div class="form-row">
        <button class="lg-btn btn" @click="login">{{btnText}}</button>
        <div class="register-check" v-if="pageType === '1'">
          <span @click="checkpage('2')">立即注册</span>
        </div>
        <div class="register-check" v-else>
          <span @click="checkpage('1')">已有账号，点此登录</span>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
  import { userLogin, userRegister } from '@service/http';
  export default {
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        btnText: '登录',
        pageType: '1' // 1-登录 2-注册
      }
    },
    created() {
      this.pageType = this.$route.query.type || '1';
      this.btnText = this.pageType === '1' ? '登录' : '注册';

      Storages.cookie.set('uid', '');
    },
    computed: {

    },
    components: {

    },
    methods: {
      checkpage (type) {
        let toPage = type === '1' ? 'login' : 'register';
        this.$router.push({
          name: toPage, 
          query: {
            type
          }
        });
      },
      /**
       * 点击登录
       */
      login () {
        var me = this;
        var username = me.form.username;
        var password = me.form.password;
        console.log(1111111111111);
        if (!username) {
          me.$toast('请输入账号');
        } else if (!password) {
          me.$toast('请输入密码');
        } else {
          if (me.pageType === '1') {
            userLogin({
              username,
              password
            }).then(({data}) => {
              if (data.state === 1) {
                Storages.cookie.set('uid', data.id);
                setTimeout(() => {
                  me.$router.push({ name: 'index' });
                }, 100);
              } else  {
                me.$toast(data.msg);
              }
            }); 
          } else {
            userRegister({
              username,
              password
            }).then(({data}) => {
              if (data.state === 1) {
                me.$toast('注册成功！');
                me.$router.push({ name: 'login' });
              } else  {
                me.$toast(data.msg);
              }
            }); 
          }
        }
      }
    }
  }
</script>

<style lang="less">
  .login-page {
    height: 100%;
    position: relative;
    background-color: #fff;
    .bg-mask {
      height: 100%;
      background: url('../../assets/img/login_bg.jpg') no-repeat center;
      background-size: cover;
      filter: blur(1.2px);
    }
    .login-form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 70%;
      .form-row {
        margin-bottom: .15rem;
      }
      .lg-input {
        width: 100%;
        height: .36rem;
        padding-left: .18rem;
        border-radius: .02rem;
        background-color: rgba(0, 0, 0, 0.3);
        color: #fff;
        font-size: .12rem;
      }
      .lg-btn {
        width: 100%;
        margin-top: .2rem;
        height: .36rem;
        line-height: .36rem;
        background-color: #ffc107;
        color: #fff;
        font-size: .16rem;
        letter-spacing: 1em;
        border-radius: .02rem;
      }  
      .register-check {
        margin-top: .12rem;
        font-size: .12rem;
        color: #fff;
        text-align: right;
      }
    }
  }

</style>
