
/*************导入VUE*******************/
import  Vue from 'vue';
/******************导入vue-router*****************/
import  VueRouter from 'vue-router'
Vue.use(VueRouter)//安装路由
import  router from  './router.js' //导入本地router

/******************导入vue-axios*****************/
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

Vue.prototype.$axios = axios;



/***************导入Mint-ui header组件,导入 Mint-UI 中的 swipe组件 实现轮播图**********************/
import {Header,Swipe, SwipeItem, Button ,Lazyload,Switch} from 'mint-ui';
Vue.component(Header.name, Header)  ; //header组件
Vue.component(Swipe.name, Swipe);

Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.component(Switch.name, Switch);
Vue.use(Lazyload);

/*************导入vue-preview插件*********************/
//引入veu-preview
import VuePreview from 'vue-preview';
//使用vue-preview
Vue.use(VuePreview);

/******************MUI 相关包******************/
import './lib/mui/css/mui.min.css'  //引入mui的样式包
import './lib/mui/css/icons-extra.css'  //引入mui 图标扩展样式包
import './lib/mui/fonts/mui-icons-extra.ttf'  //引入mui 字体的样式包


//导入vuex
import vuex from 'vuex'
Vue.use(vuex)
var car=JSON.parse(localStorage.getItem('car')||'[]')
const store= new vuex.Store({
    state:{
        car:car,//购物车商品数据{ id,title,count,price,selected}
        num:0,
        sum:0.
    },
    mutations:{
        addcar(state,goodsitem){ //加入购物车,把商品信息保存到store,  如果之前有此商品 只更新数量,如果没有则把信息添加进数组car中
            var flag=false  //假设在car中没有当前商品信息
            state.car.some(function (item) {
                if(item.id==goodsitem.id) {

                    item.number+=parseInt(goodsitem.number)
                    flag=true
                    return true

                }
            })
            if(!flag){
                state.car.push(goodsitem)
            }
            //把car的数据保存到localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))


        },
        changecount(state,goodsitem){
            state.car.find(item=>{

                if(item.id==goodsitem.id){
                    console.log(item.selected)
                    item.number=goodsitem.number
                    console.log(item.number)
                    console.log(item.selected)
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        delcarlist(state,goodsitem){
          state.car.find((item,index,arr)=>{
                if(item.id==goodsitem.id){
                  state.car.splice(index,1)
                    return true
                }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        },
        selected(state,goodsitem){
            state.car.find(item=>{
               if( item.id==goodsitem.id){
                   item.selected=!item.selected
                   console.log(item.id)
                   console.log(item.selected)


               }
            })
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
       getAllCount(state){
           var c=0;
           state.car.forEach(item=>{
               c+=item.number
           })
           return c
           localStorage.setItem('car',JSON.stringify(state.car))
       },
        getNumSum(state){
            var o={ num:0,sum:0}

            state.car.forEach(item=>{
                if (item.selected==true){
                    o.num+=item.number
                    o.sum+=parseInt(item.number)*parseInt(item.price)
                }
            })
            return o
        }
    }

})


/**********************导入时间过滤器插件*******************/
import  moment from 'moment'
/****************导入APP 组件*****************/
import app from './App.vue'


Vue.filter('modifyTime',function (time,pattern="YYYY-MM-DD HH:mm:ss") {
  return moment(time).format(pattern)
})
var vm=new Vue({
    el:'#app',
    data:{},
    render:function (creatElements) {
        return creatElements(app)
    },
    router,
    store
})