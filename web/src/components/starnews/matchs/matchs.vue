<template>
    <div class="M-matchs">
        <ul class="matchsList">
            <li v-for="(val,idx) in matchsDataset" :key="idx">
                <router-link :to="'/starnews/matchs/matchsDetail/'+val.id" class="clfix">
                    <img :src="baseUrl+val.imgUrl" class="fl" />
                    <div class="content fl">
                        <p class="name">{{val.cnname}}</p>
                        <p>举办单位：</p>
                        <p class="hold_unit">{{val.hold_unit}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
        <router-view/>
    </div>
</template>

<script>
    import './matchs.scss';
    import $ from 'jquery';
    import http from '../../../utils/httpClient';
    export default{
        data(){
            return{
                matchsDataset:[],
                baseUrl:http.base_url
            }
        },
        mounted(){
            http.get('getOneList',{type:'matchs'}).then(res=>{
                this.matchsDataset = res.data.data;
            })
        }
    }
</script>