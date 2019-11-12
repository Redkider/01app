<template>
    <div class="goodsinfo">
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="item in imglist" :key="item.id"><img :src="item.img" title=""> </mt-swipe-item>

                    </mt-swipe>
                </div>
            </div>
        </div>
         <transition
         @before-enter="beforeEnter"
         @enter="enter"
         @after-enter="afterEnter"> <div class="ball" v-show="ballflag"></div>  </transition>
        <div class="mui-card">
            <div class="mui-card-header">{{shopInfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div ><p class="price">市场价:￥<span class="old">{{ shopInfo.oldprice}}</span>促销价:￥<span class="now">{{ shopInfo.nowprice}}</span> </p></div>
                    <div ><p class="shopnum">购买数量: <inputnum @getcount="getinputnum" :maxnum="shopInfo.inventory" ></inputnum></p></div>
                    <div> <mt-button type="primary" size="small"  >立即购买</mt-button><mt-button type="danger" size="small" @click="changeballflag">加入购物车</mt-button></div>
                </div>
            </div>

        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="shopid">商品货号:{{ shopInfo.code}}</p>
                    <p class="kucun">库存数量:{{shopInfo.inventory}}件 </p>
                    <p class="time">上架时间:{{shopInfo.time}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <div> <mt-button plain type="primary" size="large" @click="getdesc" >图文介绍</mt-button></div>

               <div><mt-button type="danger" plain size="large" @click="getcomment">商品评论</mt-button></div></div>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
   import inputnum from "../public/inputnum.vue";
    export default {
        name: "goodsInfo",
        data(){
            return{
                shopInfo:{},
                imglist:[],
                id:this.$route.params.id,
                ballflag:false,
                number:1, //输入框商品数量
            }
        },
        created(){
            this.getShopInfo(this.id)
        },

        methods:{
            getShopInfo(id){
                this.axios.get('/src/data/shop.json').then(result=>{
                    if(result.data.status===0){

                      var shop=  result.data.message.find(function (item) {

                            return item.id==id

                        })
                        this.shopInfo=shop

                        this.imglist=shop.img
                    }else {
                        Toast("获取商品详情失败")
                    }


                })
            },
            getdesc(){
                this.$router.push('/home/goodsdesc/'+this.id)
            },
            getcomment(){
                this.$router.push('/home/goodscomment/'+this.id)
            },
            changeballflag(){
                this.ballflag=!this.ballflag
                //拼接出一个要保存到storez中的购物车信息对象
                console.log(this.shopInfo.img[0])
                 var goodsitem={id:this.id,number:parseInt(this.number),price:this.shopInfo.nowprice,title:this.shopInfo.title,selected:true,img:this.shopInfo.img[0].img}
                 //调用store中调用mutations中 addcar方法把商品信息添加进取
                  this.$store.commit('addcar',goodsitem)

                 },

            beforeEnter(el){
                el.style.transform ="translate(0,0)"
            },
            enter(el,done){


                el.offsetWidth;

                const  ballPosition=this.$refs.ball.getBoundingClientRect(); //获取小球的坐标
                const  badgePosition=document.getElementById("badge").getBoundingClientRect();//获取购物车的位置
                const xdist=badgePosition.left- ballPosition.left;
                const ydist=badgePosition.top - ballPosition.top;
                el.style.transform = "translate(${xdist}px ,${ydist}px)"
                el.style.transition='all 1s ease'
                done()
            },
            afterEnter(el){
                this.ballflag=!this.ballflag
            },
            getinputnum(num){
                  this.number=num
                console.log('---'+this.number)
            }
        },
        components:{

         inputnum
        }
    }
</script>

<style scoped>
    .mint-swipe{
        height: 345px;
    }
    .price{

    }
    .price .old{
        text-decoration: line-through;
        margin-right: 20px;
    }
    .price .now{
        font-size: 15px;
        color: red;
        font-weight: bold;
    }


    .mint-button{
        margin-right: 10px;
    }
    .mui-card-footer{
        display: block;
    }
    .mui-card-footer .mint-button{
        margin: 5px auto;
    }
    .goodsinfo{
        position: relative;
    }
    .goodsinfo .ball{
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: red;
        z-index:999;
        top:500px;
        left:150px;

    }

</style>