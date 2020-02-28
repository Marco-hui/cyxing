<template>
    <div id="register">
        <i class="fh" v-on:click="gouser">&lt;返回</i>
        <div class="head">
            <h5>欢迎注册!</h5>
             <img src="../../assets/img/logo/cyxing_logo.jpg" height="130" width="392"/>
        </div>
        <p v-show="showTishi" class="showtishi">{{tishi}}</p>
        <div class="phone">
            <input type="number" class="username" placeholder="填写手机号" v-model="username" v-on:input="shuru" v-on:blur="phonetest" />
        </div>
        <div class="pwd">
            <input type="password" class="password" placeholder="填写密码" v-model="password" />
        </div>
        <div class="vcode clfix">
            <input type="text" class="fl" placeholder="填写验证码" v-model="vCode"/>
            <span class="showCode fl" @click="changeCode"></span>
        </div>
        <input type="button" value="注册" class="btnreg" v-on:click="register" />
        <div class="tips">
            <span class="login" v-on:click="gologin">快速登录</span>
        </div>
        <spinner v-if="show"></spinner>
    </div>
</template>

<script>
    import './register.scss'
    import http from '../../utils/httpClient.js'
    import spinner from '../spinner/spinner.vue'
    import $ from "jquery"
    export default{
        data(){
            return{
                showTishi: false,
                show:false,
                tishi: '',
                username: '',
                password: '',
                vCode:'',
                username_status:false
            }
        },
        components:{
            spinner
        },
        methods:{
            phonetest(){
                var reg = /^1[34578]\d{9}$/i;
                if(!reg.test(this.username)){
                    this.tishi = '手机号码格式不正确';
                    this.showTishi = true;
                    return false;
                }

                http.post('Mlogin',{username:this.username}).then((res)=>{
                    let ts = document.querySelector('.showtishi');
                    if(res.data.status){
                        this.tishi = '此手机号码已注册，请直接登录';
                        this.showtishi = true;
                        this.username_status = false
                        ts.style.display='block';
                        document.getElementsByClassName('btnreg')[0].style.backgroundColor = "#ccc";
                        return false;
                    }else if(!res.data.status){
                        document.getElementsByClassName('btnreg')[0].disabled = false;
                        this.username_status = true;
                    }
                })
            },
            register(){
                var username = this.username;
                var password = this.password;
                var vCode = this.vCode;
                if(username == '' || password == '' ){  
                    this.tishi = '账号或密码不能为空'
                    this.showTishi = true
                    return;  
                }
                if(this.vCode.trim().toLowerCase() != $('.vcode .showCode').text().toLowerCase()){
                    this.tishi = '验证码输入错误！'
                    this.showTishi = true;
                    return;
                }
                if(this.username_status){
                    this.show = true;
                    http.post('Mreg',{username:username,password:password}).then((res)=>{
                        if(res.data.status){
                            alert('注册成功');
                            this.show = false;
                            this.$router.push('/Login');
                        }
                    })
                }
            },
            gouser(){
                history.go(-1);
            },
            gologin(){
                this.$router.push('/Login');
            },
            shuru(){
                document.getElementsByClassName('btnreg')[0].style.backgroundColor = "#0ff";
            },
            createCode(){
                var arr = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
                var vcode='';
                for(var i=0;i<4;i++){
                    vcode += arr[parseInt(Math.random()*arr.length)]
                }
                return vcode;
            },
            changeCode(){
                $('.vcode .showCode').text(this.createCode);
            }
        },
        mounted(){
            $('.vcode .showCode').text(this.createCode);
        }
    }
</script>