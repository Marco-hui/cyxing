<template>
    <div class="book">
        <ul class="bookList">
            <li v-for="(val,idx) in bookDataset" :key="idx">
                <router-link :to="'/starnews/book/bookDetail/'+val.id">
                    <div class="img"><img :src="baseUrl+val.img"/></div>
                    <div class="content">
                        <p class="name">{{val.name}}</p>
                        <p class="author"><i class="fa fa-address-book-o"></i> 作者：{{val.writer}}</p>
                        <p class="press"><i class="fa fa-newspaper-o"></i> 出版社：{{val.press}}</p>
                    </div>
                </router-link>
            </li>
        </ul>
        <router-view></router-view>
    </div>
</template>

<script>
    import './book.scss';
    import $ from 'jquery';
    import http from '../../../utils/httpClient';
    export default{
        data(){
            return{
                bookDataset:[],
                baseUrl:http.base_url
            }
        },
        mounted(){
            http.get('getOneList',{type:'book'}).then(res=>{
                this.bookDataset = res.data.data;
            })
        }
    }
</script>