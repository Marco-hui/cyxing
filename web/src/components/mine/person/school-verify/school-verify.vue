<template>
    <div id="school-verify">
        <div class="header">
            <i class="fa fa-angle-left" @click="$parent.verify_show = false"></i>
            <h4>高校验证</h4>
            <i></i>
        </div>
        <div class="main">
            <div class="sel">
                <p><label>真实名：</label><input type="text" placeholder="请输入姓名" v-model="fullname"/></p>
                <p><label>高校名：</label><input type="text" placeholder="请输入学校名" v-model="school" @input="getSchool"/></p>
                <p><label>所在城市：</label><input type="text" disabled v-model="locate"/></p>
                <ul v-if="datashow">
                    <li v-for="(obj,idx) in dataset" :key="idx" class="clfix" @click="selectSchool(obj)">
                        <span class="schoolname fl">{{obj.name}}</span>
                        <span class="schoolcity fr">{{obj.city}}</span>
                    </li>
                </ul>
            </div>
            <div class="upload_idcard">
                <p>请上传身份证（正反两面）：</p>
                <el-upload
                  :action="baseUrl+'/uploadStudentImg'"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <div class="upload_idcard">
                <p>请上传学生证：</p>
                <el-upload
                  :action="baseUrl+'/uploadStudentImg'"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </div>
            <button @click="open">提交资料</button>
            <div class="school_hint" v-if="school_hint">{{hitn_content}} <span v-if="time_status">{{time}}s</span></div>   
        </div>
    </div>
</template>

<script type="text/javascript">
    import './school-verify.scss'
    import $ from 'jquery'
    import http from '../../../../utils/httpClient'
    export default{
        data() {
            return {
                fullname:'',
                school:'',
                locate:'',
                dialogImageUrl: '',
                dialogVisible: false,
                baseUrl:http.base_url,
                school_hint:false,
                hitn_content:"资料已成功提交至创业星后台，请等待审核...",
                time:5,
                time_status:false,
                schoolTimer:null,
                dataset:[],
                datashow:false
            };
        },
        methods: {
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            getSchool(){
                clearTimeout(this.schoolTimer);
                this.schoolTimer = setTimeout(()=>{
                    if(this.school.trim() != ''){
                        http.get('http://119.29.166.254:9090/api/university/getByUniversityName',{name:this.school.trim()}).then(res=>{
                            if(res.data.length>0){
                                this.dataset=res.data;
                                this.datashow = true;
                            }
                        })
                    }else{
                        this.datashow = false;
                        this.locate = '';
                    }
                },500)
            },
            selectSchool(obj){
                this.school = obj.name;
                this.locate = obj.city;
                this.datashow = false;
            },
            open() {
                this.$alert('资料上传成功，正在审核...', '创业星提醒您', {
                  confirmButtonText: '确定',
                  callback: action => {
                    this.school_hint = true;
                    this.time_status = true;
                    var timer = setInterval(()=>{
                        if(this.time<=1){
                            clearInterval(timer)
                            this.time_status = false;
                            this.hitn_content = "审核成功！";
                            setTimeout(()=>{
                                this.school_hint = false;
                                this.$parent.verify_show = false;
                                this.$parent.fullname = this.fullname;
                                this.$parent.school = this.school;
                                this.$parent.school_state = true;
                                this.$parent.locate = this.locate;
                            }, 1500)
                        }
                        this.time--
                    }, 1000)
                  }
                });
            }
        }
    }
</script>