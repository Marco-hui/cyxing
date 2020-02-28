<template>
    <div id="information">
        <div class="header">
            <i class="fa fa-angle-left" @click="goback"></i>
            <h4>项目消息</h4>
            <i></i>
        </div>
        <div class="main">
            <ul v-if="dataset.length>0">
                <li v-for="(val,idx) in dataset" class="clfix">
                    <img :src="baseUrl+val.memberHeadImg" class="fl" />
                    <div class="fl">
                        <p class="member">{{val.memberFullName || val.memberNickname}}</p>
                        <p>申请加入您的项目：</p>
                        <p class="project">{{val.projectName}}</p>
                        <button class="agree" @click="auditProject(val.projectID,val.memberID,1)">同意</button>
                        <button class="reject" @click="auditProject(val.projectID,val.memberID,0)">拒绝</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './information.scss'
    import http from '../../../utils/httpClient'
    export default{
        data(){
            return{
                userID:null,
                dataset:[],
                baseUrl:http.base_url
            }
        },
        mounted(){
            this.userID = window.sessionStorage.userID;
            if(!this.userID){
                this.$router.push('login');
            }else{
                this.getProhectRequest();
            }
        },
        methods:{
            goback(){
                history.go(-1);
            },
            getProhectRequest(){
                this.$store.state.app.index_show = true;
                http.get('getProhectRequest',{id:this.userID}).then(res=>{
                    this.$store.state.app.index_show = false;
                    if(res.data.status){
                        this.dataset=res.data.data;
                    }else{
                        this.dataset=[];
                    }
                })
            },
            auditProject(projectID,memberID,status){
                http.post('auditProject',{projectID,memberID,status}).then(res=>{
                    this.getProhectRequest();
                })
            }
        }
    }
</script>