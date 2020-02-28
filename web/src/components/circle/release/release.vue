<template>
    <div class="release">
        <div class="head">
            <p @click="back">
                <i class="fa fa-angle-left"></i>
                <span>发布动态</span>
            </p>
            <p class="push" @click="push()">发布</p>
        </div>
        <textarea placeholder="说点新鲜事吧......">
        </textarea>
        <form id= "uploadForm"> 
            <div class="picture">
                <img v-for="(obj, idx) in $store.state.release.dataset" :src="$store.state.release.baseUrl+obj"/>
            </div>
            <div class="model">
                +
                <input type="file" name="msgImg" multiple @change="uploadfile"/>
            </div>
        </form> 
    </div>  
</template>


<script>
    import "./release.scss";
    import $ from "jquery";
    import http from "../../../utils/httpClient.js";
    export default {
        data(){
            return {
                // dataset:[]
                // baseUrl:http.base_url
            }
        },
        methods:{
            back:function(){
                history.back();
            },
            uploadfile:function(){
                 this.$store.dispatch("uploadfile");
            },
            push:function(){
                // var $commentText = $("textarea").val();
                // if($commentText){
                //   http.post("sendMessage", {content:$commentText, userid:window.sessionStorage.getItem("userID"), imgs:this.dataset}).then((res)=>{
                //     this.$router.push({path:"/circle"});
                //   })
                // }
                this.$store.dispatch("push", this);
                console.log(this);
            }
        }
    }
</script>