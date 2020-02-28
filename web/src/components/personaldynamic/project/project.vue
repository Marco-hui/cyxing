<template>
    <div id="project">
        <ul>
            <li v-for="(obj,idx) in dataset" :key="idx">
                <div class="top clfix">
                    <span class="proName fl"><router-link :to="'/items/proDetail/'+obj.id">{{obj.projectName}}</router-link></span>
                    <span v-if="obj.publishMan == userID" class="join fr" @click="cancleProject(obj.id)">取消项目</span>
                    <span v-else class="join fr" @click="joinProject(obj.id,obj.projectmemberMsg.count,obj.teamNumber)">报名加入</span>
                </div>
                <div class="mid clfix">
                    <div class="left fl">
                        <router-link :to="'/mine/homepage/'+obj.publishMan">
                            <img :src="baseUrl+obj.userMsg.headImg"/>
                            <p><i class="fa fa-user-circle-o"></i><span>{{obj.userMsg.fullname}}</span></p>
                            <p><i class="fa fa-graduation-cap"></i>{{obj.userMsg.school}}</p>
                        </router-link>
                    </div>
                    <div class="right fr">
                        <div class="r_type clfix">
                            <p class="fl"><i class="fa fa-sitemap"></i>类型：<span>{{obj.projectType}}</span></p>
                            <p class="fr"><i class="fa fa-users"></i><span>{{obj.projectmemberMsg.count}}</span> / <span class="memberTotal">{{obj.teamNumber}}</span></p>
                        </div>
                        <div class="r_brief">
                            <p>{{obj.description}}</p>
                        </div>
                    </div>
                </div>
                <div class="bot">
                    <div class="clfix">
                        <span class="fl">{{obj.publishTime}}</span>
                        <span class="fr"><i class="fa fa-commenting-o"  @click="showComment(null,$event)"></i>{{obj.projectcomment.count}}</span>
                        <span class="fr"><i class="fa fa-thumbs-o-up" @click="clickLike(obj.id)"></i>{{obj.likes}}</span>
                    </div>
                    <div class="input">
                        <i class="fa fa-microphone "></i><textarea></textarea><i class="fa fa-smile-o"></i><button @click="sendComment(obj.id,$event)">发送</button>
                    </div>
                </div>
                <div class="comment" v-if="obj.projectcomment.count > 0">
                    <p v-for="(val,index) in obj.projectcomment.data" :key="index">
                        <i class="name" @click="showComment(val.commentUserid,$event)">{{val.commentUserNickname}}</i>
                        <span v-if="val.commentObj">回复 <i class="name">{{JSON.parse(JSON.stringify(val)).commentObjNick}}</i></span> : {{val.commentText}}
                    </p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/javascript">
    import './project.scss';
    import $ from "jquery";
    
    import http from '../../../utils/httpClient';
    
    export default{
        data(){
            return{
                dataset:[],
                baseUrl:http.base_url,
                userID:null
            }
        },
        methods:{
        },
        props:["userid"],
        mounted(){
            this.userID = window.sessionStorage.userID;
            http.get('getProject',{userid:this.userid}).then((res)=>{
                this.dataset = res.data.data.data;
            })
            
        }
    }
</script>