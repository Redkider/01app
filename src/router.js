import VueRouter from 'vue-router'


//导入 tabbar 中相关的路由组件
import home from './components/tabbar/home.vue'
import vip from "./components/tabbar/vip.vue";
import cart from "./components/tabbar/cart.vue"
import search from "./components/tabbar/search.vue";
import newsList from "./components/news/newsList.vue";
import newsInfo from "./components/news/newsInfo.vue";
import photolist from "./components/photo/photolist.vue";
import photoInfo from "./components/photo/photoInfo.vue";
import goodsList from "./components/goods/goodsList.vue";
import goodsInfo from "./components/goods/goodsInfo.vue";
import goodsdesc from "./components/goods/goodsdesc.vue";
import goodscomment from "./components/goods/goodscomment.vue";
import login from './components/login/login.vue';
import reg from './components/login/reg.vue';

// 3. 创建路由对象
var router = new VueRouter({
  mode:'history',
  routes: [ //配置路由规则
    {path:'/',redirect:'/home'},  //路由重定向 指定根组件
    {path:'/home' ,component:home},
    {path: '/vip',component: vip},
    {path:'/cart',component:cart},
    {path:'/search',component:search},
    {path:'/home/newsList',component:newsList},
    {path:'/home/newsInfo/:id',component:newsInfo},
    {path:'/home/photolist',component:photolist},
    {path:'/home/photoInfo/:id',component:photoInfo},
    {path:'/home/goodsList',component:goodsList},
    {path:'/home/goodsInfo/:id',component:goodsInfo},
    {path:'/home/goodsdesc/:id',component:goodsdesc},
    {path:'/home/goodscomment/:id',component:goodscomment},
    {path:'/home/login',component:login},
    {path:'/home/reg',component:reg}
  ],
  linkActiveClass:'mui-active' //覆盖默认的路由高亮类 默认为 router-link-active
})

// 把路由对象暴露出去
export default router