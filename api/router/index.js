const express = require('express');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);
const bp = require('body-parser');
const path = require('path');

let users = require('./users');
let message = require('./message');
let home = require('./home');
let student = require('./student');
let items = require('./items');
let chats = require('./chats');
let starnews = require('./starnews')

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    if(req.method=="OPTIONS") {
      res.send(200);/*让options请求快速返回*/
    } else{
      next();
    }
});

app.use(bp.urlencoded({extended:false}));
app.use(express.static(path.join(path.resolve(__dirname,'../'),'/')));
module.exports={
    start(_port){
        users.reg(app);
        message.reg(app);
        home.reg(app);
        student.reg(app);
        items.reg(app);
        chats.reg(app);
        starnews.reg(app);
        http.listen(_port || 1010);
    }
}