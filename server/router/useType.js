
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Model = require("../models");

var mongoose = require('mongoose'); 

const handError = function (err, res) {
  res.json({
    state: 0,
    err: err
  });
}

/************************ useType  *************/

// 查询消费类型
router.get("/expCostTypes", (req, res) => {
  console.log('请求/recordList');
  console.log(req.query.uid);
  let uid = req.query.uid;
  if (!uid) {
    res.json({
      state: 4,
      msg: '缺少uid',
      list: data
    });
  }
  Model.ExpenseCostTypes.find(
  {
    uid
  }).then(data => {
      res.json({
        state: 1,
        msg: '查询消费类型成功',
        list: data
      });
    })
    .catch(err => {
      res.json({
        state: 0,
        msg: '查询失败',
        err: err
      });
    });
});

/**
 * 新增消费类型
 * @param  {number} type 类型：1-收入，2-支出
 * @param  {string} name 名称
 */
router.post("/addexpCostType", (req, res) => {
  Model.ExpenseCostTypes.create(req.body, (err, data) => {
    if (err) {
      res.json({
        state: 0,
        err: err
      });
    } else {
      res.json({
        state: 1,
        msg: '添加成功！',
        data: data
      });
    }
  });
});

/************************ useType  end*************/

module.exports = router;




















