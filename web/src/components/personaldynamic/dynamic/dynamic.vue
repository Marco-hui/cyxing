<template>
    <div id="dynamic" v-if="dataset.length>0">
        <div v-for="(obj, idx) in dataset" :key="idx">
            <div class="user">
                <img :src="baseUrl+'/'+obj.userMsg.headImg"/>
                <p class="username">{{obj.userMsg.fullname ? obj.userMsg.fullname : obj.userMsg.nickname}}</p>
            </div>
            <div class="content">
                {{obj.content}}
                <div v-if="obj.imgs">
                    <img v-for="(obj, idx) in obj.imgs.split(',')" :src="baseUrl+obj" />
                </div>
            </div>
            <div class="comment" v-if="obj.comment.data.length">
                <p v-for="(obj, idx) in obj.comment.data"><span class="name">{{obj.commentUserNickname}}：</span>{{obj.commentText}}</p>
            </div>
            <div class="message">
                <div class="left">
                    <p class="time">{{obj.sendtime}}</p>
                    <p class="area">来自{{obj.userMsg.school ? obj.userMsg.school : obj.userMsg.locate}}</p>
                </div>
                <div class="right">
                    <p><i class="fa fa-thumbs-o-up" @click="praise(obj.id, $event)"></i><span class="add">{{obj.likes}}</span></p>
                    <p class="comment1"><i class="fa fa-commenting-o" @click="show($event)"></i><span>{{obj.comment.count}}</span></p>
                </div>
            </div>
            <div class="edit">  
                <input type="text" />
                <button @click="send($event, obj.id)">发送</button>
            </div>
        </div>
    </div>
</template>

<script>
    import "./dynamic.scss";
    import http from "../../../utils/httpClient.js";
    import $ from "jquery";
    export default {
        data(){
            return {
                master:{},          
                baseUrl:http.base_url,
                dataset:[],
            }
        },
        props:["userid"],
        mounted(){
            http.get("getMessage",{userid:this.userid}).then((res)=>{
                this.dataset = res.data;
            })
            
        },
        methods:{
            
        }
    }


</script>