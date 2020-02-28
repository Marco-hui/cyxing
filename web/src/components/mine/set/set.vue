<template>
    <div id="T-set" v-loading="loading">
        <div class="T-header">
            <router-link to="/mine">
                <i class="fa fa-angle-left"></i>
            </router-link>
            <h3>设置</h3>
        </div>
        <div class="T-main">
            <ul>
                <li @click="pass_show = true">修改密码<i class="fa fa-pencil-square-o"></i></li>
                <li @click="contact_show = true">联系我们<i class="fa fa-phone"></i></li>
                <li @click="versionsTest">版本检测<i class="fa fa-search"></i></li>
            </ul>
            <ul>
                <li @click="feedback_show = true">我要反馈<i class="fa fa-send-o"></i></li>
                <li @click="about_show = true">关于创业星<i class="fa fa-star-o"></i></li>
            </ul>
            <div class="quit" @click="out">退出登录</div>
        </div>
        <div class="versions_hint locate" v-if="versions_show">已是最新版本</div>
        <updatepass v-if="pass_show"></updatepass>
        <contact-we v-if="contact_show"></contact-we>
        <feedback v-if="feedback_show"></feedback>
        <about v-if="about_show"></about>
    </div>
</template>

<script type="text/javascript">
    import $ from "jquery";
    import http from '../../../utils/httpClient.js'
    import updatepass from './udatepass/updatepass.vue'
    import ContactWe from './contact-we/contact-we.vue'
    import feedback from './feedback/feedback.vue'
    import about from './about/about.vue'
    import './set.scss'
    export default{
        data(){
            return{
                dataset:[],
                pass_show:false,
                contact_show:false,
                versions_show:false,
                loading:false,
                feedback_show:false,
                about_show:false
            }
        },
        components:{
            updatepass,
            ContactWe,
            feedback,
            about
        },
        methods:{
            out(){//点击退出时
                window.sessionStorage.removeItem('xxtoken');
                window.sessionStorage.removeItem('userID');
                this.$router.push('/login');
            },
            versionsTest(){
                this.loading = true;
                setTimeout(()=>{
                    this.loading = false;
                    this.versions_show = true;
                    setTimeout(()=>{
                        this.versions_show = false;
                    },1500)
                },1500)
            }
        },
        mounted(){
            
        }
    }
</script>