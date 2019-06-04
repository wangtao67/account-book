
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();

const userCtrler = require("../controllers/user");


router.post("/login", userCtrler.login);

router.post("/register", userCtrler.register);

router.post("/getUserInfo", userCtrler.getUserInfo);

module.exports = router;




















