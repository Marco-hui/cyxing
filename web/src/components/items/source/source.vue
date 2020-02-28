<template>
    <div id="Msource">
        <div class="header">
            <i class="fa fa-reply" @click="goToBack"></i>
            <h4>资料库</h4>
            <i class="fa fa-upload "></i>
        </div>
        <div class="search">
            <div class="locate"><i class="el-icon-search"></i><input type="search" placeholder="搜索创业资料" @input="searchSource" v-model="sourceField"/></div>
        </div>
        <div class="main">
            <ul>
                <li v-for="(val,idx) in dataset" :data-type="val.type" :key="idx">
                    <p><router-link :to="'/items/source/detail/'+val.id">{{val.title}}</router-link></p>
                    <p><span>作者：{{val.author}}</span><span>来源：{{val.origin}}</span><span><i class="fa fa-eye"></i> {{val.clickqty}}</span></p>
                </li>
            </ul>
            <p class="empty" v-if="dataset.length == 0">无查询结果</p>
            <p class="hint">加载更多...</p>
        </div>
        <router-view></router-view>
    </div>
</template>

<script type="text/javascript">
    import './source.scss'
    import http from '../../../utils/httpClient'
    import $ from 'jquery'
    export default{
        data(){
            return{
                dataset:[],
                page:1,
                limit:10,
                count:0,
                status:true,
                sourceField:'',
                sourcetimer:null
            }
        },
        methods:{
            goToBack(){
                history.go(-1);
            },
            loadData(){
                http.get('getSource',{page:this.page,limit:this.limit}).then(res=>{
                    this.$store.state.app.index_show=false;
                    this.dataset=res.data.data;
                    this.count = res.data.rowsCount;
                    this.status = true;
                })
            },
            searchSource(){
                clearInterval(this.sourcetimer);
                this.sourcetimer = setTimeout(()=>{
                    if(this.sourceField){
                        http.get('searchSource',{field:this.sourceField}).then(res=>{
                            this.dataset=res.data.data;
                        })
                    }else{
                        this.loadData();
                    }

                },1000)
            }
        },
        mounted(){
            this.$store.state.app.index_show=true;
            this.loadData();
            
            $('#Msource .main').scroll(()=>{
                var mainH=$('#Msource .main').outerHeight();
                var ulH=$('#Msource .main').find('ul').outerHeight();
                var scrollH=$('#Msource .main').scrollTop();
                if(scrollH>=ulH-mainH && this.status){
                    this.page++;
                    this.status = false;
                    if(this.page > Math.ceil(this.count/this.limit)){
                        $('#Msource .main .hint').text('没有更多内容了')
                        return;
                    }
                    this.$store.state.app.index_show=true;
                    this.loadData();
                }
            })
        }
    }
</script>