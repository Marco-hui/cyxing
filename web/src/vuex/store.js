import Vue from "vue"
import Vuex from "vuex"
import app from "../app"

// gu
import circle from "../components/circle/circle";
import release from "../components/circle/release/release";

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        app,
        circle,
        release
    }
})