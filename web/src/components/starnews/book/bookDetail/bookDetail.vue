<template>
    <div id="bookDetail">
        <div class="header">
            <i class="fa fa-reply" @click="goToBack"></i>
            <h4>{{bookDetailData.name}}</h4>
            <i></i>
        </div>
        <div class="DetailMian">
            <div class="img"><img :src="baseUrl+bookDetailData.img" /></div>
            <div class="detail1">
                <h4 class="name">{{bookDetailData.name}}</h4>
                <p class="describe">{{bookDetailData.describe}}</p>
                <p class="price">￥{{bookDetailData.price}}</p>
            </div>
            <ul class="msg">
                <li class="writer"><span>作者</span>{{bookDetailData.writer}}</li>
                <li class="press"><span>出版</span>{{bookDetailData.press}}</li>
                <li class="title"><span>分类</span>{{bookDetailData.title}}</li>
            </ul>
            <div class="shops">
                <div class="top clfix">
                    <span class="shopname fl">{{bookDetailData.shops}}</span>
                    <i class="el-icon-arrow-right fr"></i>
                </div>
                <div class="bot">
                    <button>关注店铺</button>
                    <button>进店逛逛</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import './bookDetail.scss'
    import http from '../../../../utils/httpClient'
    import $ from 'jquery'
    export default{
        data(){
            return{
                bookDetailData:{},
                baseUrl:http.base_url
            }
        },
        methods:{
            goToBack(){
                history.go(-1);
            }
        },
        mounted(){
            var id = this.$route.params.id;
            this.$store.state.app.index_show=true;
            http.get('getOneList',{type:'book',id}).then(res=>{
                this.$store.state.app.index_show=false;
                this.bookDetailData=res.data.data[0];
            })
        }
    }
</script>