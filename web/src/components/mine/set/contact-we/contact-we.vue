<template>
    <div id="M-contact">
        <div class="header">
            <i class="fa fa-angle-left" @click="$parent.contact_show = false"></i>
            <h4>联系我们</h4>
            <i></i>
        </div>
        <div class="mian">
            <div class="logo"><img src="src/assets/img/logo/cyxing_logo.jpg"/></div>
            <ul class="contact1">
                <li><i class="fa fa-phone"></i><span>客服电话</span><span>13413611594</span></li>
                <li><i class="fa fa-qq"></i><span>客服QQ</span><span>1057104138</span></li>
            </ul>
            <ul class="contact2 clfix">
                <li class="wechat-private fl"><i></i><span>微信客服</span></li>
                <li class="wechat-Official fl"><i></i><span>微信公众号</span></li>
            </ul>
            <div class="copyright">
                <p>2018~2020 创业星(大学生创业辅助平台)</p>
                <p>Copyright &copy; 彩色星空信息科技有限公司版权所有</p>
                <p>粤ICP备13061592</p>
            </div>
        </div>
    </div>
</template>

<script>
    import './contact-we.scss'
    export default{}
</script>