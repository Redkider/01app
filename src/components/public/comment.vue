<template>
    <div class="comment">
        <textarea class="commentcontent"  placeholder="请输入评论内容..."maxlength="120" v-model="this.commentcontents"></textarea>
        <mt-button type="primary" size="large" >提交评论</mt-button>
        <div class="commentlist">
            <div class="commentitem " v-for="(item,i) in commentlist" :key="item.time">
                <div class="commentitemtitle">
                    第{{i+1}}楼&nbsp;&nbsp;&nbsp;&nbsp;用户:{{item.name}}&nbsp;&nbsp;&nbsp;&nbsp;发表日期:{{item.time|modifyTime('YYYY-MM-DD')}}
                </div>
                <div class="commentitemcontent">
                   {{item.content}}
                </div>
            </div>



        </div>
        <mt-button type="danger" size="large" plain  @click="getMore">加载更多</mt-button>
    </div>

</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        data(){
            return{
                commentlist:[

                ],
                indexpage:1,
                commentcontents:''
            }
        },
        created(){
            this.getCommentList(this.id,this.indexpage)
        },
        methods:{
          getCommentList(id,page){
                this.axios.get('/src/data/comment.json').then(result=>{
                    var length=id.length
                    var fl=parseInt(id.slice(0,1))
                    var mid=parseInt(id.slice(2,length))

                    if(result.data.status===0){

                    var getfl= result.data.message.find(
                            function (item) {
                               return item.id==fl
                            }
                        )

                    var getid=getfl.newsid.find(function (item) {

                             return item.id==mid
                    })
                      console.log(getid)
                        this.commentlist=this.commentlist.concat(getid.page[page-1].content)

                    }else{
                        Toast("获取评论列表失败")
                    }
                })
            },
            getMore(){
                this.indexpage++
                this.getCommentList(this.id,this.indexpage)
            },
            submitComment(){
               if( this.commentcontents.trim().length===0){
                   this.axios.post('/src/data/comment.json',).then(result=>{
                       if(result.body.status===0){
                        var newcomment={

                            "name":"匿名用户",
                            "time":Date.now(),
                            "content":this.commentcontent.trim()
                        }
                           console.log(this.commentcontent)
                           this.commentcontent.unshift(newcomment)
                           this.commentcontent=''
                           console.log(this.commentcontent)
                       }

                   })
               }else {
                   Toast('写点什么吧')
               }

            }

        },
        props:["id"]
    }
</script>

<style scoped>
    .comment{
        padding: 0 4px;
    }
    .comment .commentcontent{
        height: 100px;
        margin-bottom:5px ;
    }
    .comment .mint-button{
        margin-bottom: 5px;
    }
    .comment .commentlist{

        margin: 5px 0;
    }
    .comment .commentlist .commentitem{
        background:#f9f9f9;
        border:1px solid #dddddd;
        border-radius: 7px;
        margin-bottom:3px ;
    }
    .comment .commentlist .commentitem .commentitemtitle{
        background:rgba(0,0,0, .3);
        height: 32px;
        line-height: 32px;
        color: #f9f9f9;
        font-size: 16px;
        margin-bottom: 3px;
        padding-left: 5px;

    }
    .comment .commentlist .commentitem .commentitemcontent{
        padding: 5px;
    }
</style>