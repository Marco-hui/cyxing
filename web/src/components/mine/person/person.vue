<template>
    <div id="T-person">
        <div class="T-person-head">
            <h3>
                <i @click="goback" class="fa fa-angle-left"></i>
                基本信息
                <span @click="save" class="saveInfo">保存</span>
            </h3>
        </div>
        <div class="T-person-main">
            <div class="person-photo" v-if="headImg">
                <label>头像：</label>
                <form id="uploadForm">
                    <input  @change="editPhoto" class="upload" type="file" name="head" />
                </form>
                <img :src="baseUrl+headImg" class="locate" />
                <span class="fr">&gt;</span>
            </div>
            <ul>
                <li><label>昵称：</label><input type="text" v-model="nickname"/></li>
                <li>
                    <label>性别：</label>
                    <el-radio v-model="sex" label="男">男</el-radio>
                    <el-radio v-model="sex" label="女">女</el-radio>
                </li>
                <li><label>邮箱：</label><input type="text" v-model="email"></li>
                <li><label>微信号：</label><input type="text" v-model="wechat"></li>
                <li><label>真实名：</label><input type="text" v-model="fullname"></li>
                <li @click="verify_show = true">
                    <label>大学：</label>
                    <span :class={unverify:!school_state}>{{school}}</span>
                    <span class="fr">&gt;</span>
                </li>
                <li><label>手机号：</label>{{account}}</li>
            </ul>
            <div class="manifesto"><label>创业宣言</label><textarea v-model="manifesto"></textarea></div>
        </div>
        <div class="hint locate" v-if="hint_show">保存成功</div>
        <school-verify v-if="verify_show"></school-verify>
    </div>
</template>

<script type="text/javascript">
    
    import './person.scss';
    import $ from 'jquery';
    import http from '../../../utils/httpClient';
    import SchoolVerify from './school-verify/school-verify.vue'

    export default{
        data(){
            return{
                userID:null,
                nickname:'',
                sex:'',
                headImg:'',
                baseUrl:http.base_url,
                manifesto:'',
                account:'',
                email:'',
                wechat:'',
                fullname:'',
                school:'还未进行高校验证',
                school_state:false,
                locate:'',
                updatePhoto:false,
                hint_show:false,
                verify_show:false
            }
        },
        components:{
            SchoolVerify
        },
        methods:{
            goback(){//点击返回时
                history.go(-1);
            },//点击保存时
            save(){
                var school;
                if(!this.school_state){
                    school = null;
                }else{
                    school = this.school;
                }
                this.$store.state.app.index_show = true;
                http.post('MchangeMsg',{nickname:this.nickname,fullname:this.fullname,sex:this.sex,locate:this.locate,school,email:this.email,wechat:this.wechat,manifesto:this.manifesto,headImg:this.headImg,userID:this.userID}).then(res=>{
                    this.$store.state.app.index_show = false;
                    if(res.data.status){
                        this.hint_show = true;
                        setTimeout(()=>{
                            this.hint_show = false;
                            this.$router.push('mine');
                        }, 1000)
                    }
                })
            },
            editPhoto(){
                //修改头像
                var formData = new FormData($( "#uploadForm" )[0]);  
                $.ajax({  
                  url: this.baseUrl+'/Muploadhead',  
                  type: 'POST',  
                  data: formData,  
                  async: false,  
                  cache: false,  
                  contentType: false,  
                  processData: false, 
                  success:(res)=> {
                    if(res.status) this.headImg = res.data;
                  }
                })
            }
        },
        mounted(){
            this.userID =window.sessionStorage.getItem('userID');
            http.get('Mgetuser',{id:this.userID}).then((res)=>{
                var userMsg = res.data.data[0];
                this.nickname=userMsg.nickname;
                this.sex = userMsg.sex;
                this.headImg=userMsg.headImg;
                this.manifesto=userMsg.manifesto;
                this.account=userMsg.username;
                this.email=userMsg.email;
                this.wechat=userMsg.wechat;
                this.fullname=userMsg.fullname;
                if(userMsg.school && userMsg.school != 'null'){
                    this.school=userMsg.school;
                    this.school_state = true;
                }
                this.locate = userMsg.locate;
            })
        }
    }


</script>