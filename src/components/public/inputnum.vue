<template>
    <div class="inputnum">
        <div class="mui-numbox" data-numbox-min='1' data-numbox-max='maxnum'>
            <button class="mui-btn mui-btn-numbox-minus" type="button" >-</button>
            <input id="test" class="mui-input-numbox" type="number"@change="numberchange" ref="inputnum" />
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
            numberchange(){
                console.log(this.$refs.inputnum.value)
                this.$emit('getcount',parseInt(this.$refs.inputnum.value))

            }
        },
        props:["maxnum"],
        watch:{
            'maxnum':function (newval,oldval) {
                mui(".mui-numbox").numbox().setOption('max',newval)
            }
        }


    }
</script>

<style scoped>
  .inputnum{
      display: inline;
  }
</style>