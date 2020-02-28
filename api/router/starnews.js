var db = require('../db');
var apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
var async = require('async');

module.exports={
    reg(app){
        // 增加浏览量
        app.post('/addView',(req,res)=>{
            let id = req.body.id;
            var sql = `update cynews set see=see+1 where id=${id}`;
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(true));
            })
        })
        // 根据id获取项目
        app.get('/MgetOneBusistar',(req,res)=>{
            var id= req.query.id;
            var sql = `select * from busistar where id=${id}`;
            db.DBHelper.compile(sql,result=>{
                var sql2 = `select * from project where id=${result[0].mainproject}`;
                db.DBHelper.compile(sql2,result2=>{
                    result[0]['mainpro_msg']=result2[0];
                    res.send(apiResult(true,result));
                })
            })
        })
    }
}