
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();

const accountCtrler = require("../controllers/account");

// 查询所有记录
router.post("/recordList", accountCtrler.recordList);

// 查询用户月消费金额
router.post("/userMonthAccount", accountCtrler.userMonthAccount);

// 查询用户月各消费类型支出
router.post("/userMonthTypeAccount", accountCtrler.userMonthTypeAccount);

// 新增消费记录
router.post("/addRecord", accountCtrler.addRecord);

module.exports = router;




















