import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

import homeComponent from "../components/home/home.vue"
import informationComponent from '../components/home/information/information.vue'

// Marco添加
import itemsComponent from '../components/items/items.vue'

//len添加
import addresslistComponent from "../components/addresslist/addresslist.vue"
import chatwindowComponent from "../components/chatwindow/chatwindow.vue"
import personaldynamicComponent from "../components/personaldynamic/personaldynamic.vue"
import projectComponent from "../components/personaldynamic/project/project.vue"
import dynamicComponent from "../components/personaldynamic/dynamic/dynamic.vue"


import sourceComponent from '../components/items/source/source.vue'
import sourceDetail from '../components/items/source/sourceDetail/sourceDetail.vue'
import itemPublishComponent from '../components/items/itemPublish/itemPublish.vue'
//光源add
import MineComponent from '../components/mine/mine.vue'
import PersonComponent from '../components/mine/person/person.vue'
import LoginComponent from '../components/login/login.vue'
import RegisterComponent from '../components/register/register.vue'
import SetComponent from '../components/mine/set/set.vue'

//zfc添加
import starnewsComponent from '../components/starnews/starnew.vue'
import newsComponent from '../components/starnews/news/news.vue'
import newsDetailComponent from '../components/starnews/news/newsDetail/newsDetail.vue'
import busistarComponent from '../components/starnews/busistar/busistar.vue'
import busistarDetailComponent from '../components/starnews/busistar/busistarDetail/busistarDetail.vue'
import masterConponent from '../components/starnews/master/master.vue'
import masterDetailConponent from '../components/starnews/master/masterDetail/masterDetail.vue'
import bookConponent from '../components/starnews/book/book.vue'
import bookDetailConponent from '../components/starnews/book/bookDetail/bookDetail.vue'
import matchsConponent from '../components/starnews/matchs/matchs.vue'
import matchsDetailConponent from '../components/starnews/matchs/matchsDetail/matchsDetail.vue'

//gu
import circleComponent from "../components/circle/circle.vue";
import releaseComponent from "../components/circle/release/release.vue";

const router = new VueRouter({
    routes:[
        {path:"/",name:"home",component:homeComponent},
        {path:"/information",name:"information",component:informationComponent},
     	{path:"/starnews",name:"starnews",component:starnewsComponent,children:[
            {path:'/starnews/:stage',name:"",component:newsComponent,children:[
                {path:'/starnews/newsDetail/:id',name:'newsDetail',component:newsDetailComponent}
            ]},
            {path:'/starnews/busistar/:stage',name:"busistar",component:busistarComponent,children:[
                {path:'/starnews/busistar/busistarDetail/:id',name:'busistarDetail',component:busistarDetailComponent}
            ]},
            {path:'/starnews/master/:stage',name:"master",component:masterConponent,children:[
                {path:'/starnews/master/masterDetail/:id',name:'masterDetail',component:masterDetailConponent}
            ]},
            {path:'/starnews/book/:stage',name:"book",component:bookConponent,children:[
                {path:'/starnews/book/bookDetail/:id',name:'bookDetail',component:bookDetailConponent}
            ]},
            {path:'/starnews/matchs/:stage',name:"matchs",component:matchsConponent,children:[
                {path:'/starnews/matchs/matchsDetail/:id',name:'matchsDetail',component:matchsDetailConponent}
            ]}
        ]},

        {path:"/addresslist",name:"addresslist",component:addresslistComponent},
        {path:"/chatwindow/:guest",name:"chatwindow",component:chatwindowComponent},
        {path:"/personaldynamic/:id",name:"personaldynamic",component:personaldynamicComponent},
        {path:"/circle",name:"circle",component:circleComponent},
        {path:"/releas",name:"releas",component:releaseComponent},
        {path:"/items",name:"items",component:itemsComponent,children:[
            {path:"/items/source",name:"source",component:sourceComponent,children:[
                {path:"/items/source/detail/:id",name:'sourceDetail',component:sourceDetail}
            ]}
        ]},
        {path:"/itempublish",name:"itempublish",component:itemPublishComponent},
        {path:"/mine",name:"mine",component:MineComponent},
        {path:"/person",name:"person",component:PersonComponent},
        {path:"/login",name:"login",component:LoginComponent},
        {path:"/register",name:"register",component:RegisterComponent},
        {path:"/set",name:"set",component:SetComponent}

    ]
})

export default router;