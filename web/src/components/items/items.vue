<template>
    <div id="M-items">
        <div class="header">
            <router-link to="/items/source" class="source">资料库</router-link>
            <div class="search"><input type="text" placeholder="创业星" v-model="ProjectsFiled" @input="searchProjects"/><i class="el-icon-search"></i></div>
            <router-link to="/itempublish"><i class="fa fa-pencil-square-o"></i></router-link>
        </div>
        <div class="nav">
            <ul class="nav_1">
                <li>
                    <span @click="sortStatus = !sortStatus">排序</span><i class="el-icon-caret-bottom"></i>
                    <ul class="nav_2 sort" v-show="sortStatus" @click="filterPro">
                        <li class="sort">默认</li>
                        <li class="sort">按发布时间升序</li>
                        <li class="sort">按发布时间降序</li>
                    </ul>
                </li>
                <li>
                    <span @click="typeStatus = !typeStatus">类型</span><i class="el-icon-caret-bottom"></i>
                    <ul class="nav_2 type" v-show="typeStatus" @click="filterPro">
                        <li v-for="(val,idx) in proTypeArr" :key='idx' class="type">{{val}}</li>
                    </ul>
                </li>
                <li>
                    <span @click="schoolStatus = !schoolStatus">大学</span><i class="el-icon-caret-bottom"></i>
                    <div class="nav_2 school" v-show="schoolStatus">
                        此功能由于技术复杂，程序员还在努力开发中...
                    </div>
                </li>
            </ul>
        </div>
        <div class="main">
            <ul>
                <li v-for="(obj,idx) in dataset" :key="idx">
                    <div class="top clfix">
                        <span class="proName fl"><router-link :to="'/items/proDetail/'+obj.id">{{obj.projectName}}</router-link></span>
                        <span v-if="obj.publishMan == userID" class="join fr" @click="cancleProject(obj.id)">取消项目</span>
                        <span v-else class="join fr" @click="joinProject(obj.id,obj.projectmemberMsg.count,obj.teamNumber)">报名加入</span>
                    </div>
                    <div class="mid clfix">
                        <div class="left fl">
                            <router-link :to="'/personaldynamic/'+obj.publishMan">
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
            <p class="hint">加载更多...</p>
        </div>
        <div class="tip locate"></div>
        <cyfooter/>
        <router-view></router-view>
    </div>
</template>

<script type="text/javascript">
    import './items.scss';
    import $ from "jquery";
    import cyfooter from '../cyfooter/cyfooter.vue';
    import http from '../../utils/httpClient';
    import format from '../../utils/dateFormat';
    export default{
        data(){
            return{
                dataset:[],
                userID:null,
                userNickname:'',
                page:1,
                limit:10,
                count:0,
                status:true,
                baseUrl:http.base_url,
                commentObj:null,
                ProjectsFiled:'',
                ProjectTimer:null,
                proTypeArr:['全部','工具软件','社交','互联网','餐饮','社区服务','电子商务','新农业','物联网','生活消费','企业服务','其他'],
                schools:[],
                sortStatus:false,
                typeStatus:false,
                schoolStatus:false
            }
        },
        components:{
            cyfooter
        },
        methods:{
            loadProjects(){
                http.get('getProject',{page:this.page,limit:this.limit}).then(res=>{
                    this.$store.state.app.index_show=false;
                    this.count = res.data.data.rowsCount;
                    this.status = true;
                    res.data.data.data.forEach(item=>{
                        item.publishTime = format.set(new Date(item.publishTime),'MM-DD hh:mm')
                    })
                    res.data.data.data.forEach(items=>{
                        items.projectcomment.data.forEach((item,idx)=>{
                            if(item.commentObj){
                                http.get('Mgetuser',{id:item.commentObj}).then(res2=>{
                                    item['commentObjNick']=res2.data.data[0].nickname;
                                })
                            }
                            if(idx == items.projectcomment.data.length-1){
                                this.dataset = res.data.data.data;
                            }
                        })
                    })
                })
            },
            searchProjects(){
                clearInterval(this.ProjectTimer);
                this.ProjectTimer = setTimeout(()=>{
                    if(this.ProjectsFiled){
                        http.get('getProject',{field:this.ProjectsFiled}).then(res=>{
                            res.data.data.data.forEach(item=>{
                                item.publishTime = format.set(new Date(item.publishTime),'MM-DD hh:mm')
                            })
                            res.data.data.data.forEach(items=>{
                                items.projectcomment.data.forEach((item,idx)=>{
                                    if(item.commentObj){
                                        http.get('Mgetuser',{id:item.commentObj}).then(res2=>{
                                            item['commentObjNick']=res2.data.data[0].nickname;
                                        })
                                    }
                                    if(idx == items.projectcomment.data.length-1){
                                        this.dataset = res.data.data.data;
                                    }
                                })
                            })
                        })
                    }else{
                        this.loadProjects();
                    }

                },1000)
            },
            clickLike(id){
                http.post('clickProjectLike',{id}).then(res=>{
                    if(res.status){
                        this.loadProjects();
                    }
                })
            },
            joinProject(projectID,m,n){
                if(m == n){
                    $('#M-items .tip').text('该团队人数已达上限！').fadeIn();
                    setTimeout(function(){
                        $('#M-items .tip').fadeOut('slow');
                    },1500)
                    return;
                }
                http.post('joinProject',{projectID,memberID:this.userID}).then(res=>{
                    if(res.data.status){
                        this.loadProjects();
                        $('#M-items .tip').text('报名成功,请等待审核！').fadeIn();
                        setTimeout(function(){
                            $('#M-items .tip').fadeOut('slow');
                        },1500)
                    }else{
                        $('#M-items .tip').text('您已报名！').fadeIn();
                        setTimeout(function(){
                            $('#M-items .tip').fadeOut('slow');
                        },1500)
                    }
                })
            },
            cancleProject(id){
                var cancle = window.confirm('您确定要取消该项目？');
                if(cancle){
                    http.post('cancleProject',{id}).then(res=>{
                        $('#M-items .tip').text('取消成功！').fadeIn();
                        setTimeout(()=>{
                            $('#M-items .tip').fadeOut('slow');
                            this.loadProjects();
                        },1500)
                    })
                }
            },
            showComment(objid,e){
                if(objid && objid!=this.userID){
                    this.commentObj = objid;
                    if($(e.target).closest('li').find('.bot .input').hasClass('show')){
                        this.commentObj = null;
                    }
                    $(e.target).closest('li').find('.bot .input').toggleClass('show');
                }else{
                    this.commentObj = null;
                    $(e.target).closest('.bot').find('.input').toggleClass('show');
                }
            },
            sendComment(id,e){
                var commentText = $(e.target).siblings('textarea').val();
                var commentUserid = this.userID;
                var commentUserNickname = this.userNickname;
                var projectID = id;
                var commentObj = this.commentObj;
                http.post('commentProject',{commentText,commentUserid,commentUserNickname,projectID,commentObj}).then(res=>{
                    this.loadProjects();
                })
                $(e.target).closest('.input').removeClass('show').find('textarea').val('');
            },
            filterPro(e){
                if(e.target.className == 'sort'){
                    var order = e.target.innerText;
                    if(order == '默认' || order == '按发布时间降序'){
                        order = 0;
                    }else{
                        order =1 ;
                    }
                    http.get('getProject',{order}).then(res=>{
                        res.data.data.data.forEach(item=>{
                            item.publishTime = format.set(new Date(item.publishTime),'MM-DD hh:mm')
                        })
                        res.data.data.data.forEach(items=>{
                            items.projectcomment.data.forEach((item,idx)=>{
                                if(item.commentObj){
                                    http.get('Mgetuser',{id:item.commentObj}).then(res2=>{
                                        item['commentObjNick']=res2.data.data[0].nickname;
                                    })
                                }
                                if(idx == items.projectcomment.data.length-1){
                                    this.dataset = res.data.data.data;
                                }
                            })
                        })
                    })
                    this.sortStatus = false;
                }else if(e.target.className == 'type'){
                    var type = e.target.innerText;
                    if(type == '全部'){
                        this.loadProjects();
                    }else{
                        http.get('getProject',{type}).then(res=>{
                            res.data.data.data.forEach(item=>{
                                item.publishTime = format.set(new Date(item.publishTime),'MM-DD hh:mm')
                            })
                            res.data.data.data.forEach(items=>{
                                items.projectcomment.data.forEach((item,idx)=>{
                                    if(item.commentObj){
                                        http.get('Mgetuser',{id:item.commentObj}).then(res2=>{
                                            item['commentObjNick']=res2.data.data[0].nickname;
                                        })
                                    }
                                    if(idx == items.projectcomment.data.length-1){
                                        this.dataset = res.data.data.data;
                                    }
                                })
                            })
                        })
                    }
                    this.typeStatus = false;
                }
            }
        },
        mounted(){
            this.userID = window.sessionStorage.getItem('userID');
            $('.cyfooter ul li').eq(1).addClass('active');
            this.$store.state.app.index_show=true;
            this.loadProjects();
            $('#M-items .main').scroll(()=>{
                var mainH=$('#M-items .main').outerHeight();
                var ulH=$('#M-items .main').find('ul').outerHeight();
                var scrollH=$('#M-items .main').scrollTop();
                if(scrollH>=ulH-mainH && this.status){
                    this.page++;
                    this.status = false;
                    if(this.page > Math.ceil(this.count/this.limit)){
                        $('#M-items .main .hint').text('没有更多内容了')
                        return;
                    }
                    this.$store.state.app.index_show=true;
                    this.loadProjects();
                }
            })
            if(this.userID){
                http.get('Mgetuser',{id:this.userID}).then(res=>{
                    this.userNickname = res.data.data[0].nickname;
                })
            }
        }
    }
</script>