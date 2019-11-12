<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
                <router-link :to="'/home/newsInfo/'+item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.src">
                    <div class="mui-media-body">
                        <h3 class="news-title">{{item.title}}</h3>
                        <p class='mui-ellipsis'><span class="news-time">更新日期:{{item.time| modifyTime('YYYY-MM-DD')}}</span><span class="news-click">点击{{item.click}}次</span></p>
                    </div>
                </router-link>
            </li>


        </ul>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                newslist:[



                ]
            }
        },
        created(){
           this.getNewsList()
        },
        methods:{
          getNewsList(){
                this.axios.get('/src/data/news.json').then(result=>{

                    if(result.data.status===0){
                       this.newslist=result.data.message
                    }else {
                        Toast("获取新闻列表数据失败")
                    }
                })
            }
        }
    }
</script>

<style  xml:lang="sass"  scoped>
.mui-table-view{

}
.mui-table-view .news-title{
    font-size: 16px;
    font-weight: 500;


}
.mui-table-view .mui-ellipsis{
    display: flex;
    justify-content: space-between;
    color: #007aff;
}
.mui-table-view .mui-ellipsis .news-time{

}

</style>