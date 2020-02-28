<template>
    <div id="Lhome">
        <div class="header">
            <div class="erweima iconfont icon-iconfontscan">
            </div>
            <div class="search">
                <i class="el-icon-search"></i>
                <input type="text" class="locate" placeholder="书籍/创业名人/项目" />
            </div>
            <div class="msg iconfont icon-xiazai16" @click="message_show = !message_show"></div>
        </div>
        <div class="main">
            <div>
                <h3>创业星</h3>
                <div class="scl">
                    <span>学校：</span>
                    <span>{{sch}}</span>
                    <div v-if="showLogin"><router-link to="/login">去登录</router-link></div>
                    <div v-if="showInf"><router-link to="/person">去完善</router-link></div>
                </div>
            </div>
            <div class="banner">
                <cycarousel></cycarousel>
            </div>
            <div class="nav">
                <ul>
                    <li><router-link to="/starnews/book/3"><i class="iconfont icon-shuji"></i>推荐书籍</router-link></li>
                    <li><router-link to="/starnews/master/2"><i class="iconfont icon-ren"></i>创业名人</router-link></li>
                    <li><router-link to="/items"><i class="iconfont icon-chuangyebanzhuanqian01"></i>创业项目</router-link></li>
                    <li><router-link to="/itempublish"><i class="iconfont icon-chuangjianv"></i>创建项目</router-link></li>
                    <li><router-link to="/addresslist"><i class="iconfont icon-xiaohuoban"></i>我的创友</router-link></li>

                </ul>
            </div>
            <div class="content">
                <div class="busiStar">
                    <h3>校园创业之星</h3>
                    <ul>
                        <li v-for="(val,idx) in dataset1">
                            <router-link :to="'/starnews/busistar/busistarDetail/'+val.id"><img :src="val.headImg" alt="" /></router-link>
                            <div>
                                <span>姓名:{{val.starname}}</span>
                                <span>性别:{{val.sex}}</span>
                                <span>年龄:{{val.age}}</span>
                                <span>学校:{{val.school}}</span>
                            </div>
                            <p>{{val.manifesto}}</p>
                        </li>
                    </ul>
                    <p><router-link to="/starnews/busistar/1">猛戳查看更多创业之星<i class="fa fa-arrow-circle-o-right"></i></router-link></p>
                </div>
                <div class="master">
                    <h3>创业成功人物</h3>
                    <div>
                        <router-link to="/starnews/master/masterDetail/1"><img :src="baseUrl+'/temp/imgs/master/mayun.jpg'" alt="" /></router-link>
                        <div>
                            <span>阿里巴巴集团创始人</span>
                            <span>马云</span>
                        </div>
                    </div>
                    
                    <ul>
                        <li v-for="(val,idx) in dataset2">
                            <router-link :to="'/starnews/master/masterDetail/'+val.id"><img :src="baseUrl+val.img" alt="" /></router-link>
                            <div>
                                <span>{{val.achievement}}</span>
                                <span>{{val.name}}</span>
                            </div>
                        </li>
                    </ul>
                    <p><router-link to="/starnews/master/2">猛戳查看更多成功人物<i class="fa fa-arrow-circle-o-right"></i></router-link></p>
                </div>
                <div class="book">
                    <h3>推荐书籍</h3>
                    <ul>
                        <li v-for="(val,idx) in dataset3" class="bli">
                            <router-link :to="'/starnews/book/bookDetail/'+val.id">
                                <img :src="baseUrl+val.img" />
                                <div>
                                    <span class="bname">{{val.name}}</span>
                                    <span class="bwriter" style="">{{val.writer}}</span>
                                    <!-- <p>¥{{val.price}}</p> -->
                                </div>
                                <p>¥{{val.price}}</p>
                            </router-link>
                        </li>
                    </ul>
                    <p><router-link to="/starnews/book/3">猛戳查看创业书籍<i class="fa fa-arrow-circle-o-right"></i></router-link></p>
                </div>
                <div class="matchs">
                    <h3>创业大赛</h3>
                    <ul>
                        <li v-for="(val,idx) in dataset4">
                            <img :src="baseUrl+val.imgUrl"></img>
                            <div>
                                <p>
                                    <span>比赛名称：</span>
                                    <span>{{val.cnname}}</span>
                                </p>
                                <p>
                                    <span>举办单位：</span>
                                    <span>{{val.hold_unit}}</span>
                                </p>
                                <h3><router-link :to="'/starnews/matchs/matchsDetail/'+val.id">点击查看详情</router-link></h3>
                            </div>

                        </li>
                    </ul>
                </div>
                <div class="cynews">
                    <h3>创业新闻</h3>
                    <ul>
                        <li v-for="(val,idx) in dataset5">
                            <h4>{{val.title}}</h4>
                            <div>
                                <p>{{val.timestape}}</p>
                                <p>{{val.from}}</p>
                            </div>
                            <router-link :to="'/starnews/newsDetail/'+val.id"><h3>点击查看详情</h3></router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="copyright">
                <p>2018~2020 创业星(大学生创业辅助平台)</p>
                <p>Copyright &copy; 彩色星空信息科技有限公司版权所有</p>
                <p>粤ICP备13061592</p>
            </div>
        </div>
        <div class="message" v-if="message_show">
            <ul>
                <li @click="message_show = false"><i class="el-icon-setting"></i><span>系统消息</span></li>
                <li><i class="fa fa-users"></i><span>创友消息</span></li>
                <li><router-link to="/information"><i class="fa fa-comments"></i><span>项目消息</span><i class="msgQty" v-if="msgQty > 0">{{msgQty}}</i></router-link></li>
            </ul>
        </div>
        <cyfooter></cyfooter>
        <div class="toTop iconfont icon-arrow-top" @click="toTop"></div>
    </div>
</template>

<script type="text/javascript">
    import "./home.scss"
    import $ from "jquery"
    import cyfooter from "../cyfooter/cyfooter.vue"
    import cycarousel from '../carousel/carousel.vue'

    import http from '../../utils/httpClient'

    export default {
        components:{
            cyfooter,
            cycarousel
        },
        data(){
            return {
                dataset1:[],
                dataset2:[],
                dataset3:[],
                dataset4:[],
                dataset5:[],
                dataset6:[],
                baseUrl:http.base_url,

                sch:'',
                showInf:false,
                showLogin:false,
                timer:null,
                message_show:false,
                msgQty:0
            }
        },
        methods:{
            toTop(){
                this.timer = setInterval(()=>{
                // 滚动过的距离越大，返回越快
                    var scrollTop = $("#Lhome .main").scrollTop();

                    // 计算速度
                    var speed = Math.floor(scrollTop/10);


                    if(scrollTop<=10 || speed === 0){
                        clearInterval(this.timer);
                    }
                    $("#Lhome .main")[0].scrollBy(0,-speed);
                },15);
            }
        },
        mounted(){
            var userID = window.sessionStorage.userID;
            $('.cyfooter ul li').first().addClass('active')

            http.get('getAllList').then((res)=>{
                this.dataset1 = res.data.data.busiStar.slice(6,10);
                this.dataset2 = res.data.data.master.slice(3,7);
                this.dataset3 = res.data.data.book.slice(0,4);
                this.dataset4 = res.data.data.matchs.slice(0,3);
                this.dataset5 = res.data.data.cynews.slice(0,4);
            })

            $("#Lhome .main").scroll((e)=>{
                var scrollTop = e.target.scrollTop;
                if(scrollTop>1000){
                    $('#Lhome .toTop').fadeIn();
                }else{
                    $('#Lhome .toTop').fadeOut('slow');
                }
            })            
            
            let id = window.sessionStorage.getItem('userID');
            if(!id){
                this.sch="您尚未登录！";
                this.showLogin = true;
            }else{
                http.get('Mgetuser',{id}).then((res)=>{
                    let userDataset = res.data.data[0];
                    if(!userDataset.school){
                        this.sch = '您尚未完善信息';
                        this.showInf = true;
                    }else{
                        this.sch = userDataset.school;
                        this.showInf = false;
                        this.showLogin = false;
                    }
                })
            }
            // 轮播部分
            var mySwiper = new Swiper('.swiper-container',{

                direction:'horizontal',

                autoplay:2000,

                loop:true,

                pagination:'.swiper-pagination',

                paginationClickable:true,

                nextButton:'.swiper-button-next',
                prevButton:'.swiper-button-prev',

                autoplayDisableOnInteraction:false,
            })
            // 获取项目消息数量
            if(userID){
                http.get('getProhectRequest',{id:userID}).then(res=>{
                    if(res.data.status) this.msgQty=res.data.data.length;
                })
            }
        }
        
    }
</script>