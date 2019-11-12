<template>
    <div class="account">
        <div class="accountinfo">
            <div class="userphoto">
                <img src="/src/images/icon/logo.jpg">
            </div>
            <div class="login_reg">
                <a>登录/注册></a>
            </div>
            <div class="jilu">
                <ul>
                    <li>
                        <p >0</p>
                        <p>商品关注</p>
                    </li>
                    <li>
                        <p>0</p>
                        <p>店铺关注</p>

                    </li>
                    <li>
                        <p>0</p>
                        <p>浏览记录</p>
                    </li>
                    <li>
                        <P>0</P>
                        <P>我的收藏</P>
                    </li>
                </ul>
            </div>
        </div>



        <div class="mui-card">
            <div class="mui-card-header">我的订单    <a class="allorder">查看全部订单></a></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="shopinfp">
                        <ul>
                            <li>
                                <P></P>
                                <p>待付款</p>
                            </li>
                            <li>
                                <P></P>
                                <p>待收货</p>
                            </li>
                            <li>
                                <p></p>
                                <p>待评价</p>
                            </li>
                            <li>
                                <p></p>
                                <p>退换/售后</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
    export default {
        name: "vip"
    }
</script>

<style scoped>
.account {}
.account .accountinfo{
    background: red;
    padding: 50px 20px;
}
.account .accountinfo .userphoto{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    float: left;
}
    .account .accountinfo .userphoto img{
        width: 100%;
    }
    .account .accountinfo .login_reg{
        float: left;
        margin-left: 10px;


    }
    .account .accountinfo .login_reg a{
        color: white;
    }
.account .accountinfo .jilu{
    
}
</style>