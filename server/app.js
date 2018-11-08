const express = require('express');
const router = require('./router/index');
const mongoose = require("mongoose");

const bodyParser = require("body-parser")




//这一句是连接上数据库
 var db = mongoose.connect('mongodb://localhost:27017/accountBook', function (err) {
    if (err) {
      console.log('连接数据库失败');
    } else{
      console.log('连接数据库成功');
    }
 });

//这里的myDbs是数据库的名字，不是表的名字

const app = express()

// 设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', router);

app.listen(3000,() => {
    console.log('app listening on port 3000.')
});