<template>
    <div id="itemPublish">
        <div class="header">
            <i class="fa fa-reply" @click="goToBack"></i>
            <h4>项目发布</h4>
            <i class="publish" @click="publishPro">发布</i>
        </div>
        <div class="main">
            <p class="proPublishName">
                <label for="proPublishName">请输入项目名：</label>
                <input type="text" id="proPublishName" v-model="proPublishName"/>
            </p>
            <p class="proPublishDepict">
                <label for="proPublishDepict">对你的项目想法进行描述：</label>
                <textarea id="proPublishDepict" v-model="proPublishDepict"></textarea>
            </p>
            <p class="ProType">
                <label>请选择项目类型：</label>
                <el-select v-model="ProType" clearable placeholder="请选择">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
            </p>
            <p class="ProTeamNumber clfix">
                <label for="ProTeamNumber" class="fl">团队人数上限：</label>
                <input type="number" class="fl" v-model="ProTeamNumber" id="ProTeamNumber"/>
            </p>
        </div>
        <div class="tips locate"></div>
    </div>
</template>

<script>
    import './itemPublish.scss';
    import http from '../../../utils/httpClient';
    import $ from "jquery";
    export default{
        data(){
            return{
                options: [{
                  value: '电子商务',
                  label: '电子商务'
                }, {
                  value: '企业服务',
                  label: '企业服务'
                }, {
                  value: 'ARVR',
                  label: 'ARVR'
                }, {
                  value: '生活消费',
                  label: '生活消费'
                }, {
                  value: '内容产业',
                  label: '内容产业'
                },{
                  value: '金融支付',
                  label: '金融支付'
                },{
                  value: '游戏动漫',
                  label: '游戏动漫'
                },{
                  value: '互联网',
                  label: '互联网'
                },{
                  value: '社交',
                  label: '社交'
                },{
                  value: '硬件',
                  label: '硬件'
                },{
                  value: '教育',
                  label: '教育'
                },{
                  value: '交通出行',
                  label: '交通出行'
                },{
                  value: '医疗健康',
                  label: '医疗健康'
                },{
                  value: '旅游户外',
                  label: '旅游户外'
                },{
                  value: '工具软件',
                  label: '工具软件'
                },{
                  value: '房产',
                  label: '房产'
                },{
                  value: '营销广告',
                  label: '营销广告'
                },{
                  value: '新农业',
                  label: '新农业'
                },{
                  value: '物联网',
                  label: '物联网'
                },{
                  value: '人工智能',
                  label: '人工智能'
                },{
                  value: '餐饮',
                  label: '餐饮'
                },{
                  value: '社区服务',
                  label: '社区服务'
                },{
                  value: '其他',
                  label: '其他'
                }],
                userID:null,
                proPublishName:'',
                ProType: '',
                proPublishDepict:'',
                ProTeamNumber:1
            }
        },
        methods:{
            goToBack(){
                history.go(-1);
            },
            publishPro(){
                if(this.proPublishName == ''){
                    $('#proPublishName').focus();
                    $('#itemPublish .tips').fadeIn().text('请输入项目名！');
                    setTimeout(function(){
                        $('#itemPublish .tips').fadeOut('slow');
                    },1000)
                }else if(this.proPublishDepict == ''){
                    $('#proPublishDepict').focus();
                    $('#itemPublish .tips').fadeIn().text('请对您的项目进行描述');
                    setTimeout(function(){
                        $('#itemPublish .tips').fadeOut('slow');
                    },1000)
                }else if(this.ProType == ''){
                    $('#itemPublish .tips').fadeIn().text('请选择项目类型！');
                    setTimeout(function(){
                        $('#itemPublish .tips').fadeOut('slow');
                    },1000)
                }else if(this.ProTeamNumber <= 1){
                    $('#ProTeamNumber').focus();
                    $('#itemPublish .tips').fadeIn().text('团队人数需大于1人！');
                    setTimeout(function(){
                        $('#itemPublish .tips').fadeOut('slow');
                    },1000)
                }else{
                    http.get('Mgetuser',{id:this.userID}).then(res=>{
                        console.log(res.data)
                        if(!res.data.data[0].school){
                          $('#itemPublish .tips').fadeIn().text('您尚未完善学校信息，请前往个人中心完善！');
                          setTimeout(()=>{
                              $('#itemPublish .tips').fadeOut('slow');
                          },2000)
                        }else{
                          this.$store.state.app.index_show=true;
                          http.post('publishProject',{publishMan:this.userID,projectName:this.proPublishName,projectType:this.ProType,description:this.proPublishDepict,teamNumber:this.ProTeamNumber}).then(res=>{
                              this.$store.state.app.index_show=false;
                              $('#itemPublish .tips').fadeIn().text('发布成功！');
                              setTimeout(()=>{
                                  $('#itemPublish .tips').fadeOut('slow');
                                  this.$router.push('items');
                              },1000)
                          })
                        }
                    })
                }
            }
        },
        mounted(){
            this.userID = window.sessionStorage.getItem('userID');
        }
    }
</script>