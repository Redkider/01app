<template>
    <div class="inputnum">
        <div class="mui-numbox" data-numbox-min='1' >
            <button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
            <input id="test" class="mui-input-numbox" type="number"@change="countchange" v-model="number" ref="inputnum" />
            <button class="mui-btn mui-btn-numbox-plus" type="button" >+</button>
        </div>

    </div>
</template>

<script>
    import  mui from '../../lib/mui/js/mui.js'
    export default {
        name: "inputnum",

        mounted(){
          mui(".mui-numbox").numbox();
        },
        methods:{
            countchange(){
                console.log(this.$refs.inputnum.value)
                this.$store.commit('changecount',{id:this.id,number:parseInt(this.$refs.inputnum.value)})


            }
        },
        props:["number","id"]




    }
</script>

<style scoped>
  .inputnum{
      display: inline;
  }
  .mui-numbox{

      height: 20px;
      width: 110px;
  }
  .mui-numbox [class*=btn-numbox]{
      width: 40px;
  }
  .mui-numbox .mui-input-numbox, .mui-numbox .mui-numbox-input {
  font-size: 12px;
  }
</style>