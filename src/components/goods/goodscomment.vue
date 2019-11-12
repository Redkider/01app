<template>
    <div class="comments">

        <comment :id="'2-'+goodsid" ></comment>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import comment from '../public/comment.vue'
    export default {
        name: "goodscomment",
        data(){
            return{
                goodsid:this.$route.params.id,

            }
        },
        methods(){

        },
        components:{
            comment
        }
    }
</script>

<style scoped>
  .comments{
      margin: 10px 4px;
  }
</style>