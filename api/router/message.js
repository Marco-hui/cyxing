var db = require('../db');
var apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
var async = require('async');

var express=require('express');
var multer=require('multer');
var path=require('path');
var fs=require('fs');
// 设置上传目录
var uploadpath=path.join(path.resolve(__dirname,'../'),'temp/imgs/message');
var upload=multer({ dest: uploadpath});

module.exports={
    reg(app){
        // 多图上传
        app.post('/uploadcircleImg',upload.array('msgImg',3),(req,res)=>{
            var files=req.files;
            var imgUrls=[];
            for(var i=0;i<files.length;i++){
                fs.rename(files[i].path,files[i].path+files[i].originalname);
                imgUrls.push("/temp/imgs/message/"+files[i].filename+files[i].originalname);
            }
            res.send(apiResult(true,imgUrls));
        })
        // 发表创业圈消息
        app.post('/sendMessage',(req,res)=>{
            var userid = req.body.userid;
            var content = req.body.content;
            var imgs = req.body.imgs;
            var sql = ""
            if(imgs){
                sql = `insert into message(userid,content,imgs) values(${userid},'${content}','${imgs}')`;
            }else{
                sql = `insert into message(userid,content) values(${userid},'${content}')`;
            }
            db.DBHelper.compile(sql,result=>{
                res.send(true);
            })
        })
        // 获取创业圈消息
        app.get('/getMessage',(req,res)=>{
            let page = req.query.page;
            let limit = req.query.limit;
            let userid = req.query.userid;
            // 获取所有
            var sql = "select * from message";
            if(userid) sql += ` where userid=${userid}`;
            sql += ' order by sendtime desc';
            if(page && limit){
               var qty = page*limit;
                sql += ` limit 0,${qty}`
            }
            db.DBHelper.compile(sql,result=>{
                if(result.length>0){
                    async.map(result,function(items,cb){
                        var userid = items.userid;
                        var id = items.id;
                        var sql2 = `select nickname,fullname,school,locate,headImg from users where id=${userid}; select * from comment where msgid=${id}`;
                        db.DBHelper.compile(sql2,result2=>{
                            items['userMsg']=result2[0][0];
                            items['comment']={count:result2[1].length,data:result2[1]}
                            cb(null,items)
                        })
                    },function(err,Result){
                        res.send(Result);
                    })
                }else{
                    res.send(apiResult(false,result))
                }
            })
        })
        // 点赞功能
        app.post('/callLike',(req,res)=>{
            let id = req.body.id;
            if(id){
                var sql = `UPDATE message set likes=likes+1 where id=${id};`
                db.DBHelper.compile(sql,result=>{
                    res.send(true);
                })
            }else{
                res.send(false);
            }
        })
        // 评论功能
        app.post('/sendComment',(req,res)=>{
            let commentText = req.body.commentText;
            let commentUserid = req.body.commentUserid;
            let commentUserNickname = req.body.commentUserNickname;
            let msgid = req.body.msgid;
            var sql =`insert into comment(commentText,commentUserid,commentUserNickname,msgid) values('${commentText}',${commentUserid},'${commentUserNickname}',${msgid})`;
            db.DBHelper.compile(sql,result=>{
                res.send(true);
            })
        })
    }
}