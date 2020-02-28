<template>
    <div class="busistar">
        <ul class="busistarList">
            <li v-for="(val,idx) in busistarDataset" :key="idx">
                <router-link :to="'/starnews/busistar/busistarDetail/'+val.id">
                    <div class="img"><img :src="val.headImg"/></div>
                    <div class="content">
                        <p><span class="name">{{val.starname}}</span><span class="sex">{{val.sex}}</span><span class="age">{{val.age}}岁</span></p>
                        <p class="school">{{val.school}}</p>
                        <p class="manifesto">创业宣言：{{val.manifesto}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    import './busistar.scss';
    import $ from 'jquery';
    import http from '../../../utils/httpClient';
    export default{
        data(){
            return{
                busistarDataset:[]
            }
        },
        mounted(){
            http.get('getOneList',{type:'busistar'}).then(res=>{
                this.busistarDataset=res.data.data;
            })
        }
    }
</script>