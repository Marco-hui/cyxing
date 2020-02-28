var state={
    index_show:false,
    starnews_stage:{type:'',stage:0}
}

var mutations={
    refresh(){
        // state.index_show=true;
    }
}

var actions={
    refresh(context){
        context.commit('refresh');
    }
}

export default{
    state,
    mutations,
    actions
}