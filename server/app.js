const express = require('express');
const router = require('./router/index');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const md5 = require('md5-node');
const session = require("express-session");
const cookieParser = require('cookie-parser');

const app = express();

// 连接数据库
var db = mongoose.connect('mongodb://localhost:27017/accountBook', function (err) {
    if (err) {
      console.log('连接数据库失败');
    } else{
      console.log('连接数据库成功');
    }
});

app.use(cookieParser());
// 配置中间件  
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 5000
    },
    rolling: true
}));

// 设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "x-requested-with, uid, Content-Type, ");
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    console.log(req.session);
    console.log('req.session');
    next();
})

router(app);

app.listen(3000,() => {
    console.log('app listening on port 3000.')
});