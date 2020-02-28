var db = require('../db');
var apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
var async = require('async');

module.exports={
    reg(app){
        // 获取资料库
        app.get('/getSource',(req,res)=>{
            let type = req.query.type;
            let id = req.query.id;
            let page = req.query.page;
            let limit = req.query.limit;
            var sql = 'select SQL_CALC_FOUND_ROWS * from source';
            if(type) sql = `select * from ${type}`;
            if(id) sql += ` where id=${id}`;
            if(page && limit){
                var qty = page*limit;
                sql += ` limit 0,${qty}`;
            }
            sql += "; select FOUND_ROWS() as rowsCount;";
            db.DBHelper.handle(sql,result=>{
                res.send(result);
            })
        })
        // 模糊搜索资料库
        app.get('/searchSource',(req,res)=>{
            let field = req.query.field;
            var sql = `select * from source where concat(title,author,origin,article) like '%${field}%'`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(result.length>0,result));
            })
        })
        // 获取项目
        app.get('/getProject',(req,res)=>{
            let page = req.query.page;
            let limit = req.query.limit;
            let field = req.query.field;
            let order = req.query.order;
            let type = req.query.type;
            let userid = req.query.userid;
            var sql = 'select SQL_CALC_FOUND_ROWS * from project order by publishTime desc';
            if(order == '1') sql = 'select  SQL_CALC_FOUND_ROWS * from project order by publishTime';
            if(field) sql = `select SQL_CALC_FOUND_ROWS * from project where concat(projectName,projectType,description) like '%${field}%'`;
            if(type) sql = `select SQL_CALC_FOUND_ROWS * from project  where projectType='${type}'`;
            if(userid) sql = `select SQL_CALC_FOUND_ROWS * from project where publishMan=${userid}`;
            if(page && limit){
                var qty = page*limit;
                sql += ` limit 0,${qty}`;
            }
            sql += "; select FOUND_ROWS() as rowsCount;";
            db.DBHelper.handle(sql,result=>{
                if(result.data.length>0){
                    async.map(result.data,function(items,cb){
                        var id = items.id;
                        var publishMan = items.publishMan;
                        var sql2 = `select * from users where id=${publishMan}; select * from projectmember where projectID=${id} and status=1; select * from projectcomment where projectID=${id} order by id`;
                        db.DBHelper.compile(sql2,result2=>{
                            items['userMsg']=result2[0][0];
                            items['projectmemberMsg']={count:result2[1].length,data:result2[1]};
                            items['projectcomment']={count:result2[2].length,data:result2[2]};
                            cb(null,items)
                        })
                    },function(err,Result){
                        res.send(apiResult(result.rowsCount>0,{rowsCount:result.rowsCount,data:Result}));
                    })
                }else{
                    res.send(apiResult(false,result))
                }
            })
        })
        // 点赞功能
        app.post('/clickProjectLike',(req,res)=>{
            let id = req.body.id;
            var sql = `update project set likes=likes+1 where id=${id}`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(true));
            })
        })
        // 报名加入项目
        app.post('/joinProject',filter,(req,res)=>{
            let projectID = req.body.projectID;
            let memberID = req.body.memberID;
            var sql = `select * from projectmember where projectID=${projectID} and memberID=${memberID}`;
            db.DBHelper.compile(sql,result=>{
                if(result.length>0){
                    res.send(apiResult(false));
                }else{
                    var sql2 = `insert into projectmember(projectID,memberID) values (${projectID},${memberID})`;
                    db.DBHelper.compile(sql2,result2=>{
                        res.send(apiResult(true));
                    })
                }
            })
        })
        // 审核项目加入请求
        app.post('/auditProject',(req,res)=>{
            let projectID = req.body.projectID;
            let memberID = req.body.memberID;
            let status = req.body.status*1;
            if(status == 1) var sql = `update projectmember set status=1 where projectID=${projectID} and memberID=${memberID}`;
            if(status == 0) var sql = `delete from projectmember where projectID=${projectID} and memberID=${memberID}`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(true));
            })
        })
        // 评论项目
        app.post('/commentProject',filter,(req,res)=>{
            let commentText = req.body.commentText;
            let commentUserid = req.body.commentUserid; 
            let commentUserNickname = req.body.commentUserNickname; 
            let projectID = req.body.projectID; 
            let commentObj = req.body.commentObj;
            if(commentObj == 'null'){
                commentObj = null;
            }
            var sql = `insert into projectcomment(commentText,commentUserid,commentUserNickname,projectID,commentObj) values ('${commentText}',${commentUserid},'${commentUserNickname}',${projectID},${commentObj})`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(true));
            })
        })
        // 发布项目
        app.post('/publishProject',filter,(req,res)=>{
            let Project = req.body;
            var sql = `insert into project(publishMan,projectName,projectType,description,teamNumber) values (${Project.publishMan},'${Project.projectName}','${Project.projectType}','${Project.description}',${Project.teamNumber})`;
            db.DBHelper.compile(sql,result=>{
                var sql2 = `insert into projectmember(projectID,memberID,status) values (${result.insertId},${Project.publishMan},1)`;
                db.DBHelper.compile(sql2,result2=>{
                    res.send(apiResult(true));
                })
            })
        })
        // 取消项目
        app.post('/cancleProject',(req,res)=>{
            let id = req.body.id;
            var sql = `delete from project where id=${id};delete from projectmember where projectID=${id};delete from projectcomment where projectID=${id}`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(true));
            })
        })
    }
}