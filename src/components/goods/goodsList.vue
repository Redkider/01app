<template>
    <div>
        <div class="goods">
            <router-link tag="div" :to="'/home/goodsInfo/'+item.id" class="goods-item" v-for="item in goodlist" :key="item.id">
                <img class="goodsphoto" :src="item.img[0].img"/>
                <h3 class="goodstitle">{{item.title}}</h3>
                <div class="goodsinfo">
                    <P class="price"><span class="new">￥{{ item.nowprice}}</span><span class="old">￥{{ item.oldprice}}</span> </P>
                    <p class="sell"><span class="hot">热卖中</span> <span class="stock">剩{{item.inventory}}件</span></p>
                </div>
            </router-link>



        </div>

    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "goodList",
        data(){
            return{
                goodlist:[]
            }
        },
        created(){
          this.getGoodList()
        },
        methods:{
            getGoodList(){
                this.axios.get('/src/data/shop.json').then(result=>{
                    if(result.data.status===0){
                       this.goodlist=result.data.message
                    }else{
                        Toast("获取商品列表失败")
                    }

                })
            }

        }
    }
</script>

<style scoped>
    .goods{
       display: flex;
        flex-wrap: wrap;
        padding:  5px;
        justify-content: space-between;
    }
    .goods .goods-item{
        width: 49%;
        border: #c8c7cc 1px solid;
        margin-bottom: 5px;
        box-shadow: #ccc 0 0 8px;
        padding: 2px;


    }
    .goods .goods-item img{
      width: 100%;
    }
    .goods .goods-item .goodstitle{
        font-size: 13px;
        padding-left: 3px;

    }
    .goods .goods-item .goodsinfo{
        background:#cccccc;
        padding: 5px ;


    }
    .goods .goods-item .goodsinfo .price{


    }
    .goods .goods-item p{
        padding: 0;
        margin: 0;
    }
    .goods .goods-item .goodsinfo .price .new{

        color: red;
        font-size: 14px;
    }
    .goods .goods-item .goodsinfo .price .old{
        margin-left: 10px;
        text-decoration: line-through;
        font-size: 12px;
    }
    .goods .goods-item .goodsinfo .sell{
        display: flex;
        justify-content: space-between;
        font-size: 12px;

    }

</style>