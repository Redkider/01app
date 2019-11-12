<template>

   <div>
       <mt-swipe :auto="4000">
           <mt-swipe-item v-for="item in lunbolist" :key="item.id"><img :src="item.imgurl" title=""> </mt-swipe-item>

       </mt-swipe>

       <ul class="mui-table-view mui-grid-view mui-grid-9">
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/newsList">
               <img src="/src/images/sixgrid/menu1.png" alt="">
               <div class="mui-media-body">新闻资讯</div></router-link></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
               <img src="/src/images/sixgrid/menu2.png" alt="">
               <div class="mui-media-body">图片分享</div></router-link></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/goodslist">
               <img src="/src/images/sixgrid/menu3.png" alt="">
               <div class="mui-media-body">商品购买</div></router-link></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/comment">
               <img src="/src/images/sixgrid/menu4.png" alt="">
               <div class="mui-media-body">留言评论</div></router-link></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/video">
               <img src="/src/images/sixgrid/menu5.png" alt="">
               <div class="mui-media-body">视频专区</div></router-link></li>
           <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/contact">
               <img src="/src/images/sixgrid/menu6.png" alt="">
               <div class="mui-media-body">联系我们</div></router-link></li>

       </ul>
   </div>
</template>

<script>
    import { Toast } from 'mint-ui';
     export default {
        data(){
            return {
               lunbolist:[

               ]//保存轮播图的数组
            }
        },
        created(){
            this.getlunbo();
        },
        methods:{
           getlunbo(){ //获取轮播图数据
               this.axios.get('/src/data/swipedata.json').then(result=>{

                    if(result.data.status===0){
                       this.lunbolist=result.data.message;

                    }else{
                        Toast("加载数据失败!")
                    }
                })
            }
        },

    }
</script>

<style scoped>
.mint-swipe{


    height:165px;
}
.mint-swipe img{
    width: 100%;
}

.mui-table-view{
    background: #ffffff;
}
.mui-table-view img{
    width: 60px;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border: none;
}
.mui-media-body{
    font-size: 14px;
}
</style>