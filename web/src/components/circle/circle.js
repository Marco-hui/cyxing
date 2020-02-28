import $ from "jquery";
import http from "../../utils/httpClient.js";

var state = {
    dataset:[]
}

var mutations = {
    start(state,xxx){
        $('.cyfooter ul li').eq(2).addClass('active');
        http.get("getMessage").then((res)=>{
            state.dataset = res.data;
            xxx.$store.state.app.index_show = false;
        })
    },
    show(a,e){
        $(e.target).parent().parent().parent().siblings('.edit').css({display:"flex"});
    },
    praise(state, params){
        http.post("callLike", {id:params.params})
        params.e.target.nextElementSibling.innerHTML++;
    },
    send(state, params){
        var $comm = $(params.e.target).prev().val();
        var userid = window.sessionStorage.getItem("userID");
        // 写入数据库
        http.get("Mgetuser", {id:userid}).then((res)=>{
            var nickname = res.data.data[0].nickname;

            var $xx = $(params.e.target).parent().siblings(".message").children(".right").children(".comment1").children("span");
            $xx.text($xx.text()*1+1);
            //如果没有输入任何内容，则不允许写入结构
            if($comm){
                if($(params.e.target).parent().siblings('.comment').length==0){
                    $("<div class='comment'><p><span class='name'>"+nickname+"：</span>"+$comm+"</p></div>").insertBefore($(params.e.target).parent().siblings(".message"));
                }else{
                    $("<p><span class='name'>"+nickname+"：</span>"+$comm+"</p>").appendTo($(params.e.target).parent().siblings(".comment"));
                };
                // 提交到数据库
                http.post("sendComment", {commentText:$comm, commentUserid:userid, msgid:params._id, commentUserNickname:nickname}).then((res)=>{
                    $(".edit").css({display:"none"});
                });
            }
        });
    }
}

var actions = {
    start(context,x){
        context.commit("start",x);
    },
    show(context,e){
        context.commit("show",e);
    },
    praise(context,params){
        context.commit("praise",params);
    },
    send(context, params){
        context.commit("send", params);
    }
}


export default {
    state,
    mutations,
    actions
}