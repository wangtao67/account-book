<template>
    <transition name="fade">
        <div class="alert" v-show="alert.show" v-html="alert.text" ref="alert ">
        <!-- {{alert.text}} -->
        </div>    
    </transition>
    
</template>

<script>
export default {
  data () {
    return {
      alert:{
        show:false,
        text:""
      }
    }
  },
  props:{
    
  },
  methods:{
    showAlert(text,callback,duration=2000){
        this.alert.text = text
        this.alert.show = true
        var me=this
        window.setTimeout(function(){
                me.alert.show = false
                typeof callback == "function" && callback()
            },duration)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .alert{
        padding: 1.5rem;
        margin: 0;
        border: none;
        border-radius: .4rem;
        text-align: center;
        font-size: 1.4rem;
        color:#f8f8f8;
        width:auto;
        position: fixed;
        top:50%;
        left:50%;
        z-index:3000;
        -webkit-transform: translate(-50%,-50%); 
        transform: translate(-50%,-50%);
        background-color:rgba(0,0,0,0.7);
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .3s
    }
    .fade-enter, .fade-leave-active {
        opacity: 0
    }
</style>
