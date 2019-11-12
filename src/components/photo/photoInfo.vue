<template>
    <div class="photo">
        <div class="photoinfo">
            <h3 class="title">{{imgInfo.title}}</h3>
            <p class="titlesub">
                <span class="time">发表时间:{{imgInfo.time|modifyTime('YYYY-MM-DD')}}</span>
                <span class="click">点击{{imgInfo.click}}次</span>
            </p>
            <hr/>
            <vue-preview :slides="photoslist" @close="handleClose"></vue-preview>
            <div class="photocontent" v-html="imgInfo.content">
            </div>

        </div>
        <comment :id="'1-'+this.id"></comment>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    import comment from "../public/comment.vue";

    export default {

        data(){
            return{
                id:this.$route.params.id,
                imgInfo:{},
                photoslist:  [

                ]

            }
        },

        created(){
            this.getPhotoInfo(this.id);
        },
        methods:{
           getPhotoInfo(id){
                this.axios.get('/src/data/photolist.json').then(result=>{
                    if(result.data.status===0){
                        var listitem=[]
                       result.data.message.forEach(function (element) {

                           listitem=listitem.concat(element.data)
                           console.log(listitem)
                       })
                       var news= listitem.find(function (item) {
                            return  item.id==id
                        })

                        this.imgInfo=news
                        this.photoslist.push(
                            {
                                src: news.url,
                                msrc: news.url,
                                alt: news.title,
                                title: news.title,
                                w: 300,
                                h: 150
                            }
                        )
                    }else {
                        Toast("获取图片详情失败")
                    }
                })
            },
            handleClose () {
                console.log('close event')
            }
        },

        components:{"comment":comment}
    }
</script>

<style scoped>
.photoinfo{
    padding:10px 5px;

}
figure {

}
figure img{
    width: auto;
    height: auto;

}
    .photoinfo .title{
        text-align: center;
        font-size: 16px;
        margin-bottom: 5px;
    }
    .photoinfo .titlesub{
        font-size: 12px;
        display: flex;
        justify-content: space-evenly;
       color: #007aff;

    }
</style>