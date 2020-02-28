<template>
    <div class="master">
        <ul class="masterList">
            <li v-for="(val,idx) in masterDataset" :key="idx">
                <router-link :to="'/starnews/master/masterDetail/'+val.id">
                    <div class="img"><img :src="baseUrl+val.img"/></div>
                    <div class="content">
                        <p class="name">{{val.name}}</p>
                        <p class="achievement">身份：{{val.achievement}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    import './master.scss';
    import $ from 'jquery';
    import http from '../../../utils/httpClient';
    export default{
        data(){
            return{
                masterDataset:[],
                baseUrl:http.base_url
            }
        },
        mounted(){
            http.get('getOneList',{type:'master'}).then(res=>{
                this.masterDataset = res.data.data;
            })
        }
    }
</script>