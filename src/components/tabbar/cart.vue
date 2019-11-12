<template>
    <div>
          <div class="goodslist" v-for="(item,index)  in carlist" :key="item.id">
              <div class="mui-card">
                  <div class="mui-card-content">
                      <div class="mui-card-content-inner">
                       <mt-switch v-model="item.selected" @change="xiugai(item.id)"></mt-switch>
                          <div class="allinfo">
                              <div class="imgs">
                                  <img :src="item.img">
                              </div >

                                <div class="info">
                                    <p class="title">{{item.title}} </p>
                                    <p class="small"><span class="price">￥{{item.price}}</span> <inputcart :number="item.number" @getnumber="getnumber" :id="item.id"></inputcart> <a class="del" @click.prevent="del(item.id,index)">删除</a></p>
                                </div>

                          </div>
                      </div>
                  </div>
              </div>
          </div>



          <div class="mui-card">
              <div class="mui-card-content">
                  <div class="mui-card-content-inner jiesuan">
                        <div class="left">
                            <p class="title">总计(不含运费)</p>
                            <p>已勾选<span class="jian"> {{$store.getters.getNumSum.num}}</span>件,总计:<span class="jia">￥{{$store.getters.getNumSum.sum}}</span></p>
                        </div>
                       <div class="right">
                           <mt-button type="danger" size="large"  >结算</mt-button>
                       </div>
                  </div>
              </div>
          </div>


    </div>
</template>

<script>
    import inputcart from "../public/inputcart.vue";
    export default {
        name: "cart",
        data(){
            return{
               carlist:[],
                num:0,
                sum:0

            }
        },
        created(){
          this.getCarlist()

        },
        updated(){
            this.getCarlist()
        },

        methods:{
            getCarlist(){
                this.carlist=this.$store.state.car

            },
            xiugai(id){

                this.carlist.forEach(item=>{
                        if(item.id==id){
                            item.selected=!item.selected

                           this.$store.commit('selected',item)
                            console.log(this.$store.state.car[0].selected)

                        }
                })


            },
            del(id,index){
                this.carlist.splice(index,1)
                this.carlist.find(item=>{
                   if(item.id==id){
                       console.log(item.id)
                       this.$store.commit('delcarlist',item)


                   }
               })



            },
            getnumber(number){
                 this.number=number

            },

        },
        components:{
            inputcart
        }
    }
</script>

<style scoped>
    .goodslist .mint-switch{
        float: left;
        width: 20%;
    }
   .goodslist .allinfo{
       float: left;
       width: 80%;
   }
    .goodslist .allinfo .imgs{
        float: left;
        width: 25%;
    }
    .goodslist .allinfo .imgs img{
        width: 100%;
        padding:0 5px;
    }
    .goodslist .allinfo .info{
        float: left;
        width: 72%;
    }
    .goodslist .allinfo .info .title{
        font-weight: bold;
        overflow: hidden;
        color: #222222;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:2;
        -webkit-box-orient: vertical;
        font-size: 11px;
        line-height: 13px;
        margin-bottom: 3px;


    }
    .goodslist .allinfo .info .price{
        color: red;
        font-weight: bold;
    }
    .goodslist .allinfo .info .small{
        font-size: 11px;
    }
  .jiesuan{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
    .jiesuan .title{
        color: #222222;
        font-size: 14px;
    }
    .jiesuan p .jian, .jiesuan p .jia{
        color: red;
        font-weight: bold;
        margin: 0 3px;
    }

</style>