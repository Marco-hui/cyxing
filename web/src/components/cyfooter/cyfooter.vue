<template>
    <div class="cyfooter">
        <ul>
            <li><router-link to="/"><i class="fa fa-star"></i><span>创业星</span></router-link></li>
            <li><router-link to="/items"><i class="fa fa-file-text-o"></i><span>项目</span></router-link></li>
            <li><router-link to="/circle"><i class="fa fa-users"></i><span>创业圈</span></router-link></li>
            <li v-if="$store.state.app.starnews_stage.stage == 0"><router-link :to="'/starnews/0'"><i class="fa fa-newspaper-o"></i><span>星闻</span></router-link></li>
            <li v-else><router-link :to="'/starnews/'+$store.state.app.starnews_stage.type+'/'+$store.state.app.starnews_stage.stage"><i class="fa fa-newspaper-o"></i><span>星闻</span></router-link></li>
            <li><router-link to="/mine"><i class="fa fa-user"></i><span>我的</span></router-link></li>
        </ul>
    </div>
</template>
<script>
    import './cyfooter.scss'
    export default{
    }
</script>