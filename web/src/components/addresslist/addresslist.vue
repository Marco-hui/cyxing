<template>
    <div id="addresslist">
        <header>
            <div class='left'><i class='el-icon-arrow-left' @click='back()'></i></div>
            <div class='center'>通讯录</div>
            <div class='right'><i class='el-icon-search'></i></div>
        </header>
        <div class='self'>
            <div class='left'><img :src="baseurl+currentusermsg.headImg"/></div>
            <div class='right'>
                <div class='name'>{{currentusermsg.fullname}}</div>
                <div class='manifesto'>{{currentusermsg.manifesto}}</div>
            </div>
        </div>
        <div class='friends' v-for="(obj,key) in dataset" :name='obj.id' @click='startchat(obj.id)'>
            <ul>
                <li>
                    <div class='left'>
                        <div class='left'><img :src="baseurl+obj.headImg"/></div>
                        <div class='right'>
                            <div class='name'>{{obj.fullname}}</div>
                            <div class='leaveword'>{{obj.manifesto}}</div>
                        </div>
                    </div>
                    <div class='right'>
                        <span class='el-icon-arrow-right'></span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script type='text/javascript'>
    import './addresslist.scss'
    import http from '../../utils/httpClient.js' 
    export default{
        data : function(){
            return {
                userid:null,
                dataset:[],
                currentusermsg:{},
                baseurl:http.base_url
            }
        },
        mounted : function(){
                    
            new Promise((resolve,reject)=>{
                
                //reject();此处用reject()不能改变状态
                this.userid = window.sessionStorage.getItem('userID');
                resolve();
            }).then(()=>{
               http.get('Mgetuser',{id:this.userid}).then((res)=>{  
                   this.currentusermsg = res.data.data[0];
               })
            }).then(()=>{
               //请求当前用户的通讯录
               http.get('getAddresslist',{userid:this.userid}).then((res)=>{
                   this.dataset = res.data.data;
               })

            })            
        },
        methods : {
            //点击好友进入聊天窗
            startchat(id,e){
                this.$router.push({ name: 'chatwindow', params: { guest:id }})
            },
            //回退
            back(){
                this.$router.push({path:'/mine'})
            },
        }
    }
</script>