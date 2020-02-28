var db = require('../db');
var apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
var async = require('async');

var express=require('express');
var multer=require('multer');
var path=require('path');
var fs=require('fs');
// 设置上传目录
var uploadpath=path.join(path.resolve(__dirname,'../'),'temp/imgs/student');
var upload=multer({ dest: uploadpath});

module.exports={
    reg(app){
        // 上传身份证和学生证照片
        // app.post('/uploadStudentImg',upload.array('studentImg',2),(req,res)=>{
        //     var files=req.files;
        //     var imgUrls=[];
        //     for(var i=0;i<files.length;i++){
        //         fs.rename(files[i].path,files[i].path+files[i].originalname);
        //         imgUrls.push("/temp/imgs/student/"+files[i].filename+files[i].originalname);
        //     }
        //     res.send(apiResult(true,imgUrls));
        // })
        app.post('/uploadStudentImg',(req,res)=>{
            res.send(true);
        })
        // 学生身份认证(填写真实姓名和所在学校)
        app.post('/identifyID',(req,res)=>{
            let fullname = req.body.fullname;
            let school = req.body.school;
            let id = req.body.id;
            var sql = `update users set fullname='${fullname}',school='${school}' where id=${id}`
            db.DBHelper.compile(sql,result=>{
                res.send(apiResult(true,result))
            })
        })
    }
}