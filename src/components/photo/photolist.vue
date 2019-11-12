<template>
    <div>
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item',item.id==0?' mui-active':'']"  v-for="item in photolisttitle" :key="item.id" @click="getPhotolist(item.id-1)">
                        {{item.name}}
                    </a>

                </div>
            </div>
        </div>
        <div class="photolist">
            <ul>
                <router-link :to="'/home/photoInfo/'+ item.id" v-for="item in photolistimg" :key="item.id" tag="li">
                    <img v-lazy="item.url">
                    <div class="photosub">
                        <h3 class="title">{{item.title}}</h3>
                        <div class="info">{{item.info}}</div>
                    </div>
                </router-link>
            </ul>
        </div>

    </div>
</template>

<script>
    import mui from  '../../lib/mui/js/mui.js'
    import { Toast } from 'mint-ui';
    export default {

        name: "photolist",
        data(){
            return{
                photolisttitle:[
                   {"id":0,"name":"全部","data":[]}

                ],
                photolistimg:[

                ],
                titleid:this.$route.params.id
            }
        },
        created(){
         this.getPhotoListTitle();
            this.getPhotolist(100)
        },

        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
        },
        methods:{

           getPhotoListTitle(){
                this.axios.get('/src/data/photolist.json').then(result=>{

                    if (result.data.status===0){

                         var data=[]
                        result.data.message.forEach(
                            function (item) {
                                  item.data.forEach(function (i) {
                                      data.push(i)
                                  })
                            }
                        )

                        this.photolisttitle[0].data= data


                        this.photolisttitle=this.photolisttitle.concat(result.data.message)

                    }else{

                    }

                })
            },

            getPhotolist(titleid){
                this.axios.get('/src/data/photolist.json').then(result=>{

                    if (result.data.status===0){
                       if(titleid==100){
                           this.photolistimg=this.photolisttitle[0].data
                           console.log(this.photolistimg)
                       }else{
                           this.photolistimg=result.data.message[titleid].data
                       }



                    }else{
                        Toast('获取图片列表失败')
                    }
                })

            }
        }
    }
</script>

<style scoped>
  *{
      touch-action: pan-y;
  }
  img[lazy=loading] {
      width: 40px;
      height: 300px;
      margin: auto;
  }
    .photolist{
     padding: 0 8px;
    }
    .photolist ul{
        list-style: none;
        padding: 0;

    }
    .photolist ul li{
        position: relative;
        margin-bottom: 8px;
        box-shadow: 2px 2px 2px #dddddd;
    }
    .photolist ul li img{
        width: 100%;
    }
    .photolist ul li .photosub{
        background: rgba(0,0,0, .4);
        position: absolute;
        bottom: 0;
        text-align: left;
        color: #f9f9f9;
        padding: 0 4px;
    }
    .photolist ul li .photosub .title{
        font-size: 14px;

    }
    .photolist ul li .photosub .info{
        max-height: 80px;
        font-size: 12px;
    }
</style>