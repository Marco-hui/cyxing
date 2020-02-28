<template>
    <div id="T-updateword">
        <div class="T-header">
            <i class="fa fa-angle-left" @click="goback"></i>
            <h3>设置</h3>
        </div>
        <div class="T-Umain">
            <div id="updatePass">
                
                <div class="update_body">
                    <ul>
                        <li><label htmlFor="oldpass">旧密码</label><input type="password" id="oldpass" placeholder="请输入旧密码" /></li>
                        <li><label htmlFor="newpass">新密码</label><input type="password" id="newpass" placeholder="6-20位数字或字母" /></li>
                        <li><label htmlFor="repass">确认密码</label><input type="password" id="repass" placeholder="请再次输入新密码"/></li>
                    </ul>
                </div>
                <button class="submit" @click="Osubmit">提交</button>
                <span class="hint locate" id="hint"></span>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import $ from "jquery";
    import http from '../../../../utils/httpClient.js'
    import './updatepass.scss'
    export default{
        data(){
            return{
                dataset:[],
                baseUrl:http.base_url,
                Oimg:'/src/assets/img/logo/timg.gif',
                Uid:''
            }
        },
        components:{
        },
        mounted(){
            let x =window.sessionStorage.getItem('userID');
            this.Uid = x;
        },
        methods:{//点击时改变修改密码组件状态
            goback(){
                this.$parent.pass_show=false;
            },
            disapperHint(cb){
                var count = 2;
                var timer=setInterval(function(){
                    count--;
                    if(count<=0){
                        $('#hint').hide();
                        clearInterval(timer);
                        if(cb) cb();
                    }
                },1000)
            },
            Osubmit(){
                var oldpass = $('#oldpass').val();
                var newpass = $('#newpass').val();
                var repass = $('#repass').val();
                var regexp = new RegExp('^[\\w]{6,20}$')
                if(!regexp.test(oldpass)){
                    $('#hint').show().text('旧密码格式错误!');
                    this.disapperHint();
                }else if(!regexp.test(newpass)){
                    $('#hint').show().text('新密码格式错误!');
                    this.disapperHint();
                }else if(newpass == oldpass){
                    $('#hint').show().text('新密码与旧密码一致!');
                    this.disapperHint();
                }else if(repass != newpass){
                    $('#hint').show().text('两次密码输入不一致!');
                    this.disapperHint();
                }else{
                    http.post('vPsss',{id:this.Uid,password:oldpass,newpass}).then(res=>{
                        if(res.data.status){
                            $('#hint').show().text('修改成功,请重新登录');
                            window.sessionStorage.removeItem('xxtoken');
                            window.sessionStorage.removeItem('userID');
                            this.disapperHint(()=>{
                                this.$router.push('/login');
                            });
                        }else{
                            $('#hint').show().text('旧密码不正确!');
                            this.disapperHint();
                        }
                    })
                }
            }
        }
    }
</script>