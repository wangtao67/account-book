const express = require('express');
const router = require('./router/index');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const md5 = require('md5-node');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const log4js = require('./log/logConfig');
const logger = log4js.getLogger();
const dbCfg = require('./config/dbCfg');
const JwtUtil = require('./utils/jwt');
const appCfg = require('./config');


const app = express();

// 连接数据库
var db = mongoose.connect(dbCfg.url, function (err) {
    if (err) {
      console.log('连接数据库失败');
    } else{
      console.log('连接数据库成功');
    }
});

log4js.useLogger(app, logger)  // 把每次请求的信息写入日志

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

let jwt2 = new JwtUtil();
let result;
const tokenWhiteList = ['/api/user/login', '/api/user/register'];
app.all('*', function(req, res, next) {
    // 设置跨域访问
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "x-requested-with, token, Content-Type, ");
    // if (req.method == "OPTIONS") res.sendStatus(200);/*让options请求快速返回*/
    // if (req.method !== 'OPTIONS') {
    //     var infoArr = [
    //         'method: ' + req.method, 
    //         'url: ' + req.url, 
    //         'params: ' + JSON.stringify(req.body),
    //         'referer: ' + req.headers.referer,
    //     ];
    //     logger.info('request >> ', infoArr.join(' '));
    // } 
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
        return;
    }
    if (tokenWhiteList.includes(req.url)) {
        next();
    } else {
        let token = req.headers.token || '';
        logger.info('app.all >> get token:  ', token);
        result = jwt2.verifyToken(token); 
        logger.info('app.all >> token result:  ', result);
        if (result.uid) {
            req.uid = result.uid;
            next();
        } else if (result === 'expired') {
            res.send({ state: 403, msg: '登录已过期,请重新登录'} );
        } else {
            res.send({ state: 401, msg: '身份验证失败'} );   
        }    
    }
});

// app.use(function (req, res, next) {
//     next();
// })

router(app);

app.listen(appCfg.port, () => {
    console.log(`app listening on port ${appCfg.port}.`)
});
