<template>
    <div id='personaldynamic'>
        <header>
            <div class='left'><i class='el-icon-arrow-left' @click="back()"></i></div>
            <div class='center'>个人主页</div>
            <div class='right'><i class='el-icon-more' @click='moreshow = !moreshow'></i></div>
        </header>
        <div class='main'>
            <div class='self'>
                <div class='left'><img :src="baseUrl+userMsg.headImg"/></div>
                <div class='right'>
                    <div class='name'>{{userMsg.fullname}}</div>
                    <div class='manifesto'>{{userMsg.manifesto}}</div>
                </div>
            </div>

            <div class='nav'>
                <span @click="show = 1" :class="{active:show == 1}">个人项目</span>
                <span @click="show = 2" :class="{active:show == 2}">个人动态</span>
            </div>
            <project v-if="show == 1" :userid="$route.params.id" ></project>
            <dynamic v-if="show == 2" :userid="$route.params.id"></dynamic>
        </div>
        <div class="more" v-if="moreshow">
            <ul>
                <li @click="moreshow = false"><i class="el-icon-edit-outline"></i><span>设置备注</span></li>
                <li v-if="!isfriend" @click="addFriend"><i class="el-icon-plus"></i><span>加为创友</span></li>
                <li v-else-if="isfriend" @click="delFriend"><i class="el-icon-delete"></i><span>删除创友</span></li>
            </ul>
        </div>
        <div class="friend_hint locate" v-if="friend_show">{{friend_content}}</div>
    </div>
    
</template>

<script type='text/javascript'>
    import './personaldynamic.scss'
    import http from '../../utils/httpClient.js'
    import dynamic from './dynamic/dynamic.vue'
    import project from './project/project.vue'
    export default{
        data : function(){
            return {
                userMsg:{},
                baseUrl:http.base_url,
                show:1,
                isfriend:false,
                moreshow:false,
                userID:null,
                friendID:null,
                friend_show:false,
                friend_content:''
            }
        },
        components:{
            dynamic,
            project
        },
        mounted(){
            this.userID = window.sessionStorage.userID;
            this.friendID = this.$route.params.id;
            //请求当前用户的信息
            http.get('Mgetuser',{id:this.friendID*1}).then((res)=>{  
                this.userMsg = res.data.data[0];
            })
            // 判断当前主页主人是否为创友
            http.get('getAddresslist',{userid:this.userID,friendid:this.$route.params.id}).then(res=>{
                this.isfriend = res.data.status;
            })
        },
        methods:{
            back(){
                history.go(-1);
            },
            addFriend(){
                this.moreshow = false;
                http.post('addFriend',{friendid:this.friendID,userid:this.userID}).then(res=>{
                    this.friend_content = "已成功添加为创友"
                    this.isfriend = true;
                    this.friend_show = true;
                    setTimeout(()=>{
                        this.friend_show = false;
                    }, 1500)
                })
            },
            delFriend(){
                this.moreshow = false;
                http.post('delFriend',{friendid:this.friendID,userid:this.userID}).then(res=>{
                    this.friend_content = "已删除该创友"
                    this.isfriend = false;
                    this.friend_show = true;
                    setTimeout(()=>{
                        this.friend_show = false;
                    }, 1500)
                })
            }
        }
    }
</script>