<template>
    <div id="sourceDetail">
        <div class="header">
            <i class="fa fa-reply" @click="goToBack"></i>
            <h4>{{dataset.title}}</h4>
            <i class="fa fa-download "></i>
        </div>
        <div class="DetailMian">
            <h2>{{dataset.title}}</h2>
            <p><span>作者：{{dataset.author}}</span><span>来源：{{dataset.origin}}</span><span><i class="fa fa-eye"></i> {{dataset.clickqty}}</span></p>
            <div class="article" v-html="dataset.article"></div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import './sourceDetail.scss'
    import http from '../../../../utils/httpClient'
    import $ from 'jquery'
    export default{
        data(){
            return{
                dataset:{},
                id:null,
            }
        },
        methods:{
            goToBack(){
                history.go(-1);
            }
        },
        mounted(){
            this.id = this.$route.params.id;
            this.$store.state.app.index_show=true;
            http.get('getSource',{id:this.id}).then(res=>{
                this.$store.state.app.index_show=false;
                this.dataset=res.data.data[0];
            })
        }
    }
</script>