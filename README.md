##制作APP首页组件
1.完成Header区域,使用的是Mint-UI中的header组件
2.制作底部TabBar区域,使用MUI的 Tabbar.html
  购物车图标--拷贝扩展图标 icon-extra.css,拷贝扩展字体mui-icons-extra.ttf到项目中
  为购物车添加相应的样式  mui-inco-extra mui-inco-extra-cart
  
3.在中间放置一个router-view组件来显示我们匹配的组件


##改造tabbar为router-link ,设置路由高亮
 
##点击tabbar中路由链接,展示对应的组件
1.添加一个components文件夹存放组件
2.在componnets中创建一个一个文件夹存放 tabbar组件
3.创建 home,vip,cart,search四个组件
4.把创建的路由组件导入到 router.js中
5.编写路由规则 {path:'/home',component:home}
6.在App组件中添加router-view 占位符


##首页轮播图
使用 mint-UI中swipe组件
1.main.js导入相关组件
2.在相应组件中插入swipe (home.vue)
3.获取相关数据  使用vue-resource
4.安装vue-resource  npm i vue-resource -S
5.在main.js中导入vue-resource

6.使用vue-resource中的 this.$http.get(url).then(result=>{
   result.body
}) 获取到数据

把数据绑定给 data

7.使用v-for渲染每个item


##九宫格
用mui中的 grid 

##组件切换动画
用<transition>
 </transition>直接包裹<router-view>
 然后在style中写两组类
 .v-enter ,.v-leave-to{
 opcity:0;
 transform:translateX(100%);
 }
 
 .v-enter-active, .v-leave-active{
 transition:all 0.5s ease;
 }
 
 
 ##新闻咨询
 1.给六宫格加添加路由链接  在router.js中添加相关配置项
 2.使用mui中media-list制作新闻列表  设置样式
 3.获取数据 vue-resource
 4.v-for遍历新闻列表
 5.设置时间过滤器  使用moment插件 (安装此插件 npm i moment -S)  导入moment  improt moment from moment
 6.在设置的全局过滤器中调用moment().format()方法
 
 ##新闻详情
 获取数据
 
 
 ##怎么把一个组件放到另一个组件中?
 1.先创建一个子组件
 2.在需要使用的页面导入组件 import comment from '/components/public/comment.vue'
 3.在父组件中使用components属性将导入的组件注册为自己的子组件   components: {comment},
 4.把注册的子组件以标签方式写入页面中 <comment></comment>
 
 
 ##获取评论数据显示到页面中
 
 1.需要用到父子组件传值获取到当前的id    ( 在负组件中插入的子组件上添加属性得到父组件的data数据    具体为:<comment :id="this.id"></comment>)
 2.在子组件中添加属性 props:["id"]   评论页数 绑定在 子组件comment的data 中
 
 ##加载更多
 1.给按钮添加点击事件,请求下一页的数据  getmore(){}
 2.修改data里的页数+1 再次调用 获取评论的函数 getComment()       
         getmore(){
          this.index=this.index+1
          getComment()
          
 }
 
 ##发表评论  
 为文本框textarea 双向绑定数据
 为发表按钮添加事件
 校验评论内容是否为空 如果为空 Toast题诗用户
 通过vue-resource 提交数据 重新刷新列表 查看最新评论
如果调用getcomments方法 ,可能只能获取到最后一页数据,所以换一种实现方法
当评论成功后 手动拼接一个评论对象,然后用数组的unshift方法把最新评论追加到 data中的commentlist的第一个位置

##图片列表制作
 #切换标题
1.使用mui的 pullrefresh
bug:
  1.显示在页面的最顶部 解决方法 把样式中的mui-fullscreen 去掉即可\
  2.标题不能滑动  解决办法 若使用区域滚动组件，需手动初始化scroll控件
  3.初始化scroll控件：
    需要先导入 mui.js
    mui('.mui-scroll-wrapper').scroll({
    	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
   4.在初始化scroll的时候又出现新的问题
   ypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode
   分析:为webpack 严格模式下'caller', 'callee', and 'arguments' 不被允许  
   解决方案: 关掉webpack 严格模式
   webpack 移除严格模式时，需要使用 babel 插件
   remove "use strict" directive
   
   $ npm install babel-plugin-transform-remove-strict-mode
   
   如果使用babelrc
   .babelrc 文件添加配置
   
   {
       "plugins": ["transform-remove-strict-mode"]
   }
   2.如果使用的是 CLI
   
   $ babel --plugins transform-remove-strict-mode script.js
   
   
   4.底部tabbar 失效   
     分析原因:  样式名重复 在标题和tabbar中 修改 .mui-tab-item为 .mui-tab-item-lib

  
2.获取标题数据  vue-resource

制作图片列表区域

使用 mint-ui的懒加载

在main,js加入 Lazyload  组件
import { Lazyload } from 'mint-ui';

Vue.use(Lazyload);


##图片详情页面的点击展示大图
使用插件 Vue preview Plugin 
1.安装 npm i vue-preview -S
2.img标签上的class不能去掉