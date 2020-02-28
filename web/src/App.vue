<template>
    <div id="app">
        <router-view/>
        <spinner v-show="$store.state.app.index_show"></spinner>
    </div>
</template>

<script>
    import spinner from "./components/spinner/spinner.vue"
    export default {
        components:{
            spinner
        },
        mounted(){
            this.$store.dispatch('refresh');
        }
    }
</script>

<style lang="scss">
  #app {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: #fff
  }
</style>