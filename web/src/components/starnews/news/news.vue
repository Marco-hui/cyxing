<template>
    <div class="news">
        <ul class="newsList">
            <li class="mainnew" v-for="(val,idx) in newsDataset" :key="idx" @click="addView(val.id)">
                <router-link :to="'/starnews/newsDetail/'+val.id">
                    <img :src="val.imgurl"/>
                    <div class="content">
                        <p class="title">{{val.title}}/p>
                        <p class="from">{{val.from}}</p>
                        <i class="fa fa-eye"> {{val.see}}</i>
                    </div>
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    import './news.scss';
    import $ from 'jquery';
    import http from '../../../utils/httpClient';
    export default{
        data(){
            return{
                newsDataset:[]
            }
        },
        mounted(){
            http.get('getOneList',{type:'cynews'}).then(res=>{
                this.newsDataset=res.data.data;
            })
        },
        methods:{
            addView(id){
                http.post('addView',{id});
            }
        }
    }
</script>