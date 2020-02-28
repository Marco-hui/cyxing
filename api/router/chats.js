var db = require('../db');
var apiResult = require('../utils/apiResult');
var filter = require('../utils/filter');
var async = require('async');

module.exports= {
    reg(app){
        // 获取通讯录
        app.get('/getAddresslist',filter,(req,res)=>{
            let userid = req.query.userid;
            let friendid = req.query.friendid;
            var sql = `select * from addresslist where userid=${userid}`;
            if(friendid) sql += ` and friendid=${friendid}`;
            db.DBHelper.compile(sql,result=>{
                if(result.length>0){
                    var sql2 = 'select * from users where 1=2';
                    result.forEach(items=>{
                        sql2 += ` or id=${items.friendid}`;
                    })
                    db.DBHelper.compile(sql2,result2=>{
                        res.send(apiResult(result2.length>0,result2));
                    })
                }else{
                    res.send(apiResult(false))
                }
            })
        })
        // 添加创友
        app.post('/addFriend',(req,res)=>{
            let friendid = req.body.friendid;
            let userid = req.body.userid;
            let sql = `insert into addresslist(friendid,userid) values (${friendid},${userid}),(${userid},${friendid})`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(true));
            })
        })
        // 删除创友
        app.post('/delFriend',(req,res)=>{
            let friendid = req.body.friendid;
            let userid = req.body.userid;
            let sql = `DELETE from addresslist where (friendid=${friendid} and userid=${userid}) or (friendid=${userid} and userid=${friendid})`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(true));
            })
        })
        // 获取聊天信息
        app.get('/getChatMsg',filter,(req,res)=>{
            let speakerid = req.query.speakerid;
            let listenerid = req.query.listenerid;
            var sql = `select * from users where id=${speakerid}`;
            sql += ` ;select * from users where id=${listenerid}`;
            sql += ` ;select * from chatrecord where (speakerid=${speakerid} and listenerid=${listenerid}) or (speakerid=${listenerid} and listenerid=${speakerid})  order by id`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(result.length>0,result));
            })
        })
        // 添加聊天信息（聊天发送消息）
        app.post('/sendChatMsg',(req,res)=>{
            let speakerid = req.body.speakerid;
            let listenerid = req.body.listenerid;
            let content = req.body.content;
            var sql = `insert into chatrecord(speakerid,listenerid,content) values (${speakerid},${listenerid},'${content}')`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(true));
            })
        })
    }
}