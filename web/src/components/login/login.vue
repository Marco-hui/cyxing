<template>
    <div id="login">
        <div class="header">
            <i class="fh" v-on:click="gouser">&lt;返回</i>
            <router-link to="/" class="fa fa-home"></router-link>
        </div>
        <div class="head">
            <h5>欢迎登录!</h5>
            <img src="../../assets/img/logo/cyxing_logo.jpg" height="130" width="392"/>
        </div>
        <p v-show="showTishi" class="showtishi">{{tishi}}</p>
        <div class="phone">
            <input type="number" class="username" placeholder="填写手机号" v-model="username" v-on:input="shuru" />
        </div>
        <div class="pwd">
            <input type="password" class="password" placeholder="填写密码" v-model="password" />
        </div>
        <input type="button" value="登录" class="btnlogin" v-on:click="login" />
        <div class="tips">
            <span class="reg" v-on:click="goreg">快速注册</span>
        </div>
    </div>
</template>

<script>
    import './login.scss'
    // import axios from 'axios'
    import http from '../../utils/httpClient.js'
    // import bottoms from '../bottomnav/bottomnav.vue'
    export default{
        data(){
            return{
                showTishi: false,
                tishi: '',
                username: '',
                password: ''
            }
        },
        components:{

        },
        mounted(){
            // if(localStorage.hasOwnProperty('data')){
            //     this.$router.push('/User')
            // }
        },
        methods:{
            login(){
                var username = this.username;
                var password = this.password;
                if(username == '' || password == ''){  
                    this.tishi = '账号或密码不能为空'
                    this.showTishi = true;
                    return;  
                }
                this.$store.state.app.index_show = true;
                http.post('Mlogin',{username:username,password:password}).then((res)=>{
                    this.$store.state.app.index_show = false;
                    if(res.data.status){
                        window.sessionStorage.setItem('xxtoken',res.data.data.token);
                        window.sessionStorage.setItem('userID',res.data.data.id);
                        this.$router.push('/mine');
                        return;
                    }else{
                        this.tishi = '账号或密码错误！';
                        this.showTishi = true;
                    }
                })
            },
            gouser(){
                // this.$router.push('/User');
                history.go(-1);
            },
            goreg(){
                 this.$router.push('/Register');
            },
            shuru(){
                document.getElementsByClassName('btnlogin')[0].style.backgroundColor = "#0ff";
            }
        }
    }
</script>