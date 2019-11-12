<template>
    <div class="desc">
        <h3>{{goodsdesc.title}}</h3>
        <div class="descccc"  v-html="goodsdesc.content"></div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';

    export default {
        name: "goodsdesc",
        data(){
            return{
                goodsdesc:{},
                id:this.$route.params.id
            }
        },
        created(){
          this.getGoodsdesc(this.id)
        },
        methods:{
            getGoodsdesc(id){
                this.axios.get('/src/data/shop.json').then(result=>{
                  if(result.data.status===0){
                      this.goodsdesc=result.data.message[id-1]
                  }else {
                     Toast("获取图文信息失败")
                  }
                })
            }
        }
    }
</script>

<style scoped>
    .desc{
        width: 100%;
        margin: 5px 4px;
        overflow: hidden;
    }
    .desc h3{
        font-size: 14px;
        margin-bottom: 10px;

    }

   .desccc img {
        width: 100%;
           overflow: hidden;
       }
</style>