
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

/************** record  ****************/

// 查询所有记录
router.post("/recordList", (req, res) => {
  var uid = req.body.uid;
  var searchMonth = req.body.searchMonth || '';

  console.log('==============');
  console.log(req.session);
  console.log('接口：/recordList');
  console.log('uid', uid);
  console.log('searchMonth', searchMonth);
  console.log('==============');
  
  if (!uid) {
    res.json({
      state: 2,
      msg: '缺少uid',
      data: req
    });
    return;
  }
  var dateReg =new RegExp(searchMonth); 
  // 根据date查询该月份数据，并按日期排序
  Model.Records.find({ uid, 'date': dateReg }).sort({'date': -1}).exec(function(err,doc){
    if (err) {
      res.json({
        state: 0,
        err: err
      });
    } else {
      var dateObj = {};
      var totalIncome = 0, totalCost = 0;
      doc.forEach(item => {
        if (!dateObj[item.date]) {
          dateObj[item.date] = {};
          dateObj[item.date]['date'] = item.date;
          dateObj[item.date]['total'] = 0;
          dateObj[item.date]['totalIncome'] = 0;
          dateObj[item.date]['totalCost'] = 0;
          dateObj[item.date]['records'] = [];
        }

        if (item.type === 1) {
          dateObj[item.date]['totalIncome'] += item.amount; // 总收入
        } else {
          dateObj[item.date]['totalCost'] += item.amount; // 总消费
        }

        dateObj[item.date].records.push(item); // 单条记录插入
        dateObj[item.date]['total'] = item.type === 1 ? item.amount : -item.amount; // 合计
      });

      var resArr = [];
      for (let i in dateObj) {
        resArr.push(dateObj[i]);
      }
      res.json({
        state: 1,
        msg: '查询成功！',
        list: resArr
      });
    }
  })
});

// 查询用户月消费金额
router.post("/userMonthAccount", (req, res) => {
  var uid = req.body.uid;
  var month = req.body.month;

  console.log('/userMonthAccount');
  console.log('uid', uid);

  if (!uid) {
    res.json({
      state: 2,
      msg: '缺少uid',
    });
    return;
  }

  var dateReg =new RegExp(month); 
  // 根据date查询该月份数据，并按日期排序
  Model.Records.find({ uid, 'date': dateReg }).exec(function(err, doc){
    if (err) {
      res.json({
        state: 0,
        err: err
      });
    } else {
      console.log('doc: =====================');
      console.log(doc);

      var userCost = 0, userIncome = 0, userBalance = 0;
      doc.forEach(item => {
        if (item.type === 1) {
          userIncome += item.amount;
        } else {
          userCost += item.amount;
        }
      });
      userBalance = userIncome - userCost;
      res.json({
        state: 1,
        msg: '查询成功！',
        data: {
          userIncome,
          userCost,
          userBalance,
        }
      });
    }
  });
});

// 查询用户月各消费类型支出
router.post("/userMonthTypeAccount", (req, res) => {
  var uid = req.body.uid;
  var month = req.body.month;
  var type = req.body.type || 2; // 1 - income, 2 - cost
  

  console.log('/userMonthTypeAccount');
  console.log('uid', uid);

  if (!uid) {
    res.json({
      state: 2,
      msg: '缺少uid',
    });
    return;
  }

  var dateReg = new RegExp(month); 
  // 根据date查询该月份数据，并按日期排序
  Model.Records.find({ uid, type, 'date': dateReg }).exec(function(err, doc){
    if (err) {
      res.json({
        state: 0,
        err: err
      });
    } else {
      console.log('doc: =====================');
      console.log(doc);

      var category = {}, total = 0;
      doc.forEach(item => {
        total += item.amount;
        if (category.hasOwnProperty(item.useTypeName)) {
          category[item.useTypeName] += item.amount;
        } else  {
          category[item.useTypeName] = item.amount;
        }
      });

      var categorys = [];
      for (let key in category) {
        let percent = (category[key]/total).toFixed(2);
        categorys.push({
          name: key,
          value: category[key],
          percent: percent
        });
      }
      
      res.json({
        state: 1,
        msg: '查询成功！',
        data: {
          type,
          categorys
        }
      });
    }
  });
});



/**
 * 新增消费记录
 * @param  {string} id 
 * @param  {number} date 
 * @param  {number} amount 
 * @param  {string} type
 * @param  {string} memo 
 */
router.post("/addRecord", (req, res) => {
  var params = req.body;
  if (!params.uid) {
    res.json({
      state: 2,
      msg: '缺少uid',
    });
  } else if (!params.date || !params.amount || !params.memo || !params.useTypeId || !params.useTypeName || !params.type) {
    res.json({ state: 3, msg: '缺少字段', data: params });
    return;
  } 

  var recordObj = {
    uid: params.uid, // 用户id
		date: params.date, // 格式：2018-02-23
	  amount: params.amount,
	  useTypeId: params.useTypeId, // 消费（收入）类型id
	  useTypeName: params.useTypeName, // 消费（收入）类型
	  type : params.type, // 消费or收入 1/2
	  memo: params.memo
  };
  // 生成明细记录
  Model.Records.create(recordObj, (err, data) => {
    if (err) {
      handError(err);
    } else {
      console.log('记录明细成功！');
      var signedAmount, income = 0, cost = 0;
      if (params.type === 1) {
        income = params.amount;
        signedAmount = params.amount;
      } else {
        cost = params.amount;
        signedAmount = -params.amount;
      }
      // 操作个人账户
      Model.UserAccount.update({ uid: params.uid }, { $inc: {totalIncome: income, totalCost: cost, totalBalance: signedAmount }}, {}, function (err, doc) {
        if (err) {
          handError(err, res);
        } else {
          console.log('记录账户成功！');
          console.log(doc);
          res.json({ state: 1, msg: '记录成功！', data: data });
        }
      });
    }
  });
});


module.exports = router;




















