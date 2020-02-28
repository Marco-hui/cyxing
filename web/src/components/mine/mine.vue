<template>
    <div id="T-mine">
        <div class="T-header">
            <h3>个人中心<a @click="MySet">设置</a></h3>
        </div>
        <div class="T-main">
            <div class="T-headPhoto">
                <a @click="myinfo">
                    <img :src="baseUrl+uimg" />
                    <div class="middle">
                        <p class="nickname">{{uname}}</p>
                        <p class="credits">积分：{{credits}}</p>
                    </div>
                    <i class="fa fa-angle-right" aria-hidden="true"></i>
                </a>
            </div>
            <div class="main-class">
                <ul>
                    <li><i class="fa fa-star"></i><br />大众</li>
                    <li><i class="fa fa-star"></i><br />创新</li>
                    <li><i class="fa fa-star"></i><br />万众</li>
                    <li><i class="fa fa-star"></i><br />创业</li> 
                </ul>
            </div>
            <ul>
                <li class="T-li"><router-link :to="'/personaldynamic/'+userID">我的主页<i class="fa fa-user-circle"></i></router-link></li>
                <li class="T-li"><router-link to="/addresslist">我的创友<i class="fa fa-address-book-o"></i></router-link></li>
                <li class="T-li"><router-link to="#">项目收藏<i class="fa fa-star-o"></i></router-link></li>
                <li class="T-li"><router-link :to="'/personaldynamic/'+userID">我的项目<i class="fa fa-folder-o"></i></router-link></li>
                <li class="T-li"><router-link to="#">分享APP<i class="fa fa-paper-plane-o"></i></router-link></li>
            </ul>
        </div>
        <cyfooter/>
    </div>
</template>

<script type="text/javascript">

import './mine.scss'
import $ from 'jquery';
import cyfooter from '../cyfooter/cyfooter.vue';
import http from '../../utils/httpClient.js'

    export default{
        data(){
            return {
                uname:'您还没有登录哦！',
                uimg:'/temp/default_unlogin.jpg',
                credits:0,
                baseUrl:http.base_url,
                Oimg:'/src/assets/img/logo/timg.gif',
                userID:null
            }
        },
        components:{
            cyfooter
        },
        methods:{//点击个人中心时判断
            myinfo(){
                if(this.uname=='您还没有登录哦！'){
                    this.$router.push('/login');// router.go('/login');
                }else{
                    this.$router.push('/person');
                }
            },//点击设置时
            MySet(){
                if(this.uname=='您还没有登录哦！'){
                    this.$router.push('/login');// router.go('/login');
                }else{
                    this.$router.push('/set');
                }
            }
        },
        mounted(){
            $('.cyfooter ul li').eq(4).addClass('active');
            this.userID =window.sessionStorage.getItem('userID');
            if(this.userID){ //初始化判断  登录与否  登录了则发起请求拿数据
                http.get('Mgetuser',{id:this.userID}).then((res)=>{
                    if(res.data.status){
                        this.uname=res.data.data[0].nickname;
                        this.uimg=res.data.data[0].headImg;
                        this.credits=res.data.data[0].credits;
                    }
                })
            }
        }
    }
</script>
