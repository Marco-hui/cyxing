<template>
    <div id="M-feedback">
        <div class="header">
            <i class="fa fa-angle-left" @click="$parent.feedback_show = false"></i>
            <h4>我要反馈</h4>
            <i></i>
        </div>
        <div class="main">
            <textarea placeholder="请输入您的宝贵意见，我们将以最快速度处理并将处理结果反馈给您。" v-model="content"></textarea>
            <button class="btn" @click="submit">提交</button>
        </div>
        <div class="hint locate" v-if="hint_show">{{hint_content}}</div>
    </div>
</template>

<script type="text/javascript">
    import './feedback.scss'
    import http from '../../../../utils/httpClient'
    export default {
        data(){
            return {
                content:'',
                hint_show:false,
                hint_content:""
            }
        },
        methods:{
            submit(){
                let userid = window.sessionStorage.userID;
                if(this.content == ""){
                    this.hint_content = '请输入反馈内容！';
                    this.hint_show = true;
                    setTimeout(()=>{
                        this.hint_show = false;
                    },1500)
                    return;
                }
                if(userid){
                    this.$store.state.app.index_show = true;
                    http.post('Mfeedback',{userid,content:this.content}).then(res=>{
                        this.$store.state.app.index_show = false;
                        if(res.data){
                            this.hint_content = '提交成功！';
                            this.hint_show = true;
                            setTimeout(()=>{
                                this.hint_show = false;
                                this.content = '';
                            },1500)
                        }
                    })
                }
            }
        }
    }
</script>