
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();

const User = require("../controllers/user");


router.post("/login", User.login);

router.post("/register", User.register);

router.post("/getUserInfo", User.getUserInfo);

router.post("/deleteUser", User.deleteUser);


module.exports = router;




















