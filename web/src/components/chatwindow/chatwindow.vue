<template>
    <div id='chatwindow'>
        
        
        <div class='header'>
            <div class='left'>
                <i class='el-icon-arrow-left' @click="back()"></i>
            </div>
            <div class='center'>
                <p class='intheinput' ref='intheinput'>{{guest.fullname}}</p>
            </div>
            <div class='right' @click="personaldynamic()">
                <span class='fa fa-user-circle-o'></span>
            </div>
        </div>
        <div class='body'>
            <ul>
                <li v-for='(obj,key) in chatrecord'>
                    <div :class="{user: master.id == obj.speakerid}">
                        <img :src="master.id !== obj.speakerid ? baseurl + guest.headImg : baseurl +master.headImg" @click="master.id !== obj.speakerid ?  personaldynamic():mine()"/>
                        <div v-html="obj.content"></div>
                    </div>
                </li>
            </ul>
        </div>
        <div class='footer'>
            <div class='left'>
                <span class='fa fa-smile-o' @click="showexpress()"></span>
                <span class='el-icon-picture'></span>
                <span class='fa fa-volume-up'></span>
            </div>
            <div class='right'>
                <div ref='msg' contenteditable="true" class='msg' @click="getpos()"></div>
                <button @click="commit()">发送</button>
            </div>
            <div class='expressionpackage' ref='expressionpackage' v-if='expressswitch'>
                <section class="for_tieba" @click="sendexpression($event)">
                <a  class="_img"><img src="src/assets/img/tieba/1.jpg" alt="" data-alias="hehe" title="呵呵"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/2.jpg" alt="" data-alias="haha" title="哈哈"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/3.jpg" alt="" data-alias="tushe" title="吐舌"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/4.jpg" alt="" data-alias="a" title="啊"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/5.jpg" alt="" data-alias="ku" title="酷"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/6.jpg" alt="" data-alias="lu" title="怒"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/7.jpg" alt="" data-alias="kaixin" title="开心"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/8.jpg" alt="" data-alias="han" title="汗"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/9.jpg" alt="" data-alias="lei" title="泪"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/10.jpg" alt="" data-alias="heixian" title="黑线"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/11.jpg" alt="" data-alias="bishi" title="鄙视"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/12.jpg" alt="" data-alias="bugaoxing" title="不高兴"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/13.jpg" alt="" data-alias="zhenbang" title="真棒"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/14.jpg" alt="" data-alias="qian" title="钱"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/15.jpg" alt="" data-alias="yiwen" title="疑问"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/16.jpg" alt="" data-alias="yinxian" title="阴脸"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/17.jpg" alt="" data-alias="tu" title="吐"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/18.jpg" alt="" data-alias="yi" title="咦"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/19.jpg" alt="" data-alias="weiqu" title="委屈"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/20.jpg" alt="" data-alias="huaxin" title="花心"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/21.jpg" alt="" data-alias="hu" title="呼~"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/22.jpg" alt="" data-alias="xiaonian" title="笑脸"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/23.jpg" alt="" data-alias="neng" title="冷"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/24.jpg" alt="" data-alias="taikaixin" title="太开心"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/25.jpg" alt="" data-alias="huaji" title="滑稽"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/26.jpg" alt="" data-alias="mianqiang" title="勉强"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/27.jpg" alt="" data-alias="kuanghan" title="狂汗"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/28.jpg" alt="" data-alias="guai" title="乖"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/29.jpg" alt="" data-alias="shuijiao" title="睡觉"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/30.jpg" alt="" data-alias="jinku" title="惊哭"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/31.jpg" alt="" data-alias="shengqi" title="生气"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/32.jpg" alt="" data-alias="jinya" title="惊讶"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/33.jpg" alt="" data-alias="pen" title="喷"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/34.jpg" alt="" data-alias="aixin" title="爱心"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/35.jpg" alt="" data-alias="xinsui" title="心碎"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/36.jpg" alt="" data-alias="meigui" title="玫瑰"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/37.jpg" alt="" data-alias="liwu" title="礼物"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/38.jpg" alt="" data-alias="caihong" title="彩虹"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/39.jpg" alt="" data-alias="xxyl" title="星星月亮"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/40.jpg" alt="" data-alias="taiyang" title="太阳"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/41.jpg" alt="" data-alias="qianbi" title="钱币"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/42.jpg" alt="" data-alias="dnegpao" title="灯泡"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/43.jpg" alt="" data-alias="chabei" title="茶杯"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/44.jpg" alt="" data-alias="dangao" title="蛋糕"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/45.jpg" alt="" data-alias="yinyue" title="音乐"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/46.jpg" alt="" data-alias="haha2" title="haha"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/47.jpg" alt="" data-alias="shenli" title="胜利"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/48.jpg" alt="" data-alias="damuzhi" title="大拇指"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/49.jpg" alt="" data-alias="ruo" title="弱"/></a>
                <a  class="_img"><img src="src/assets/img/tieba/50.jpg" alt="" data-alias="OK" title="OK"/></a>
                </section>
            </div>
        </div>
    </div>
</template>

<script type='text/javascript'>
    import './chatwindow.scss'
    import http from '../../utils/httpClient.js'
    export default{
        data : function(){
            return {
                master:{},
                guest:{},
                expressswitch:false,
                sendmsg:'',
                chatrecord:[],
                baseurl:http.base_url
            }
        },
        mounted:function(){
            //获取用户信息，用户聊天记录
            new Promise((resolve,reject)=>{
                
                //reject();此处用reject()不能改变状态
                http.get( 'Mgetuser',{ id:window.sessionStorage.getItem('userID') } ).then((res)=>{
                    this.master = res.data.data[0];
                    resolve();
                })
            }).then(()=>{
               http.get('Mgetuser',{id:this.$route.params.guest*1}).then((res)=>{  
                   this.guest = res.data.data[0];
                   http.get('getChatMsg',{speakerid:this.master.id,listenerid:this.guest.id}).then((res)=>{
                       this.chatrecord = res.data.data[2];
                   })
               })

            })  
        },
        methods : {
            //显隐表情面板
            showexpress(){
                if(this.expressswitch == true){
                    this.expressswitch = false;
                }else{
                    this.expressswitch = true;
                }
            },
            //点击表情发送
            sendexpression(e){
                
                var alias = ["[hehe]","[haha]","[tushe]","[a]","[ku]","[lu]","[kaixin]","[han]","[lei]","[heixian]","[bishi]","[bugaoxing]","[zhenbang]","[qian]","[yiwen]","[yinxian]","[tu]","[yi]","[weiqu]","[huaxin]","[hu]","[xiaonian]","[neng]","[taikaixin]","[huaji]","[mianqiang]","[kuanghan]","[guai]","[shuijiao]","[jinku]","[shengqi]","[jinya]","[pen]","[aixin]","[xinsui]","[meigui]","[liwu]","[caihong]","[xxyl]","[taiyang]","[qianbi]","[dnegpao]","[chabei]","[dangao]","[yinyue]","[haha2]","[shenli]","[damuzhi]","[ruo]","[OK]"]
                var expresscode = "[" + e.target.dataset.alias + "]";

                var expressimg = document.createElement('img');

                expressimg.src = `src/assets/img/tieba/${alias.indexOf(expresscode)+1}.jpg`;
                //找到焦点位置
                var range = window.getSelection().getRangeAt(0);
               
                if(range.commonAncestorContainer.parentElement.className== 'msg' || range.commonAncestorContainer.parentElement.className== 'right'){
                    range.insertNode(expressimg);
                }
                
                
            },
            //获取光标位置
            getpos(){
                var range = window.getSelection().getRangeAt(0);
            },
            //发送消息
            commit(){
                
                var content = document.getElementsByClassName('msg')[0].innerHTML;
                if(content != ''){
                    http.post('sendChatMsg',{speakerid:this.master.id,listenerid:this.guest.id,content:content}).then((res)=>{
                            http.get('getChatMsg',{speakerid:this.master.id,listenerid:this.guest.id}).then((res)=>{
                                document.getElementsByClassName('msg')[0].innerHTML = '';
                                this.chatrecord = res.data.data[2];
                            })
                    })
                }
            },
            //回退
            back(){
                this.$router.push('/addresslist')
            },
            //跳转到个人页面
            personaldynamic(){
                this.$router.push({ name: 'personaldynamic', params: {id:this.guest.id }})
            },
            //跳转到自己的个人主页
            mine(){
                this.$router.push({ name: 'personaldynamic', params: {id:this.master.id}})
            }
        }
    }
</script>