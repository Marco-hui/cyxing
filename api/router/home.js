var db = require('../db');
var apiResult = require('../utils/apiResult');
var filter = require('../utils/filter');
var async = require('async');

module.exports={
    reg(app){
        // 获取单个模块列表
        app.get('/getOneList',(req,res)=>{
            let type = req.query.type;
            let limit = req.query.limit;
            let id = req.query.id;

            var sql =`select * from ${type}`;
            if(id) sql += ` where id=${id}`;
            if(limit) sql += ` limit 0,${limit}`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(result.length>0,result));
            })
        })
        // 获取所有模块列表
        app.get('/getAllList',(req,res)=>{
            var sql = `select * from busiStar; select * from master; select * from book; select * from matchs; select * from cynews;`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(result.length>0,{busiStar:result[0],master:result[1],book:result[2],matchs:result[3],cynews:result[4]}));
            })
        })
        // 获取项目加入请求消息
        app.get('/getProhectRequest',(req,res)=>{
            var id = req.query.id;
            var sql = `select * from project where publishMan=${id}`;
            db.DBHelper.compile(sql,result=>{
                if(result.length>0){
                    var sql2 = `select * from projectmember where 1=2`;
                    for(var i=0;i<result.length;i++){
                        sql2 += ` or (projectID=${result[i].id} and status=0)`
                    }
                    db.DBHelper.compile(sql2,result2=>{
                        if(result2.length>0){
                            async.map(result2,function(items,cb){
                                var memberID = items.memberID;
                                var sql3 = `select id,nickname,fullname,headImg from users where id=${memberID}`;
                                db.DBHelper.compile(sql3,result3=>{
                                    for(var j=0;j<result.length;j++){
                                        if(result[j].id == items.projectID) items['projectName']=result[j].projectName;
                                    }
                                    items['memberNickname']=result3[0].nickname;
                                    items['memberFullName']=result3[0].fullname;
                                    items['memberHeadImg']=result3[0].headImg;
                                    cb(null,items)
                                })
                            },function(err,Result){
                                res.send(apiResult(Result.length>0,Result));
                            })
                        }else{
                            res.send(apiResult(false))
                        }
                    })
                }else{
                    res.send(apiResult(false,result))
                }
            })
        })
    }
}