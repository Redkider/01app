<template>
    <div>
        <div class="newsinfo">
            <h3 class="newstitle">{{newsinfo.title}}</h3>
            <p class="newssub">
                <span class="newstime">更新日期:{{newsinfo.time|modifyTime('YYYY-MM-DD')}}</span>
                <span class="newsclick">点击{{newsinfo.click}}次</span>
            </p>
            <hr/>
            <div class="newscontent" v-html="newsinfo.content"></div>
        </div>
        <comment :id="'0-'+this.id" ></comment>


    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import comment from '../public/comment.vue'


    export default {
        components: {comment},
        data(){
            return{
                newsinfo:{},
                id:this.$route.params.id //把url地址上传递的id挂载在data上
            }
        },

        created(){
         this.getNewsInfo(this.id)

        },
        methods:{
            getNewsInfo(id){
                this.axios.get("/src/data/news.json",).then(result=>{
                    if(result.data.status===0){
                        this.newsinfo=result.data.message[id-1]

                    }else{
                        Toast("获取新闻详情失败")

                    }
                })
            }

        }
    }
</script>

<style  xml:lang="scss">
    .newsinfo{
      padding: 0 4px;
    }
    .newsinfo .newstitle{
        text-align: center;
        margin: 15px 0;
        font-size: 16px;
    }
    .newsinfo .newssub{
        display: flex;
        justify-content: space-around;

    }
     .newscontent img{
        width: 100%;
    }

</style>