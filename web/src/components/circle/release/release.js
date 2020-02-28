import http from "../../../utils/httpClient.js";
import $ from "jquery";

var state = {
    baseUrl:http.base_url,
    dataset:[]
}

var mutations = {
    uploadfile(state){
        var formData = new FormData($( "#uploadForm" )[0]);  
        $.ajax({  
              url: state.baseUrl+'/uploadcircleImg',  
              type: 'POST',  
              data: formData,  
              async: false,  
              cache: false,  
              contentType: false,  
              processData: false, 
              success: (res)=> {  
                  // console.log(res)
                  state.dataset = res.data;
              }
        })
    },
    push(state, x){
        var $commentText = $("textarea").val();
        if($commentText){
            http.post("sendMessage", {content:$commentText, userid:window.sessionStorage.getItem("userID"), imgs:state.dataset}).then((res)=>{
                console.log(this);
                x.$router.push({path:"/circle"});
            })
        }
    }
}

var actions = {
    uploadfile(context){
        context.commit("uploadfile");
    },
    push(context, x){
        context.commit("push", x);
    }
}

export default {
    actions,
    mutations,
    state
}