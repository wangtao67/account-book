
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Model = require("../models");

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
  console.log('/userMonthAccount');
  console.log('uid', uid);
  if (!uid) {
    res.json({
      state: 2,
      msg: '缺少uid',
    });
  }
  Model.UserMonthAccount.findOne({ uid }, (err, doc) => {
    if (err) {
      res.json({
        state: 0,
        err: err
      });
    } else {
      res.json({
        state: 1,
        msg: '查询成功！',
        list: doc
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

  var monthRecordFn = function () {
    

    var addMonthRecord = function () {
      var cost = 0, income = 0, total = 0;
      if (params.type === 1) {
        income += params.amount;
      } else {
        cost += params.amount;
      }
      total
      var monthCollectionPara = {
        uid: params.uid,
        month: params.date,
        cost: cost,
        income: income,
        
  
      };
      Model.UserMonthAccount.create(params, (err, data) => {
        if (err) {
          res.json({
            state: 0,
            err: err
          });
        } else {
          
          
        }
      });
    }

    var updateMonthRecord = function () {

    }

    Model.userMonthAccount.findOne({ uid }, (err, doc) => {
      if (err) {
        res.json({
          state: 0,
          err: err
        });
      } else {
        if (doc.length > 0) {

        } else {
          addMonthRecord();
        }
        res.json({
          state: 1,
          msg: '查询成功！',
          list: doc
        });
      }
    });



    
  }

  Model.Records.create(params, (err, data) => {
    if (err) {
      res.json({
        state: 0,
        err: err
      });
    } else {

      res.json({ state: 1, msg: '添加记录成功！', data: data });
    }
  });


});


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

/**
 * 登录
 * @param  {number} type 类型：1-收入，2-支出
 * @param  {string} name 名称
 */
router.post("/login", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (!username) {
    res.json({
      state: 0,
      msg: '请输入username',
    });
  }
  if (!password) {
    res.json({
      state: 0,
      msg: '请输入password',
    });
  }
  Model.User.find({ username }, (err, data) => {
    if (err) {
      res.json({
        state: 0,
        err: err
      });
    } else {
      console.log('查找user');
      console.log(data);
      if (data.length > 0) {
        if (data[0].password === password) {
          req.session.token = username + '_' + redomToken();;
          console.log('登录token: ', req.session);
          res.json({
            state: 1,
            msg: '登录成功！',
            user: username,
            id: data[0]._id
          }); 

          function redomToken(len) {
            var len = len || 32;
            var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxpos = chars.length;
            var str = '';

            for (var i = 0; i < len; i++) {
                str += chars.charAt(Math.floor(Math.random() * maxpos))
            }

            return str;
          }
        } else {
          res.json({
            state: 3,
            msg: '密码错误！',
          }); 
        }
      } else {
        res.json({
          state: 2,
          msg: '用户名不存在',
        });  
      }
      
    }
  });
});

/**
 * 注册
 * @param  {string} username
 * @param  {string} password
 */
router.post("/register", (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  if (!username) {
    res.json({
      state: 0,
      msg: '请输入username',
    });
  }
  if (!password) {
    res.json({
      state: 0,
      msg: '请输入password',
    });
  }
  /**
   * 创建月账户
   * @param {objectId} uid 用户id
   * @param {string} username 用户名
   */
  var makeUserMonthAccountCollection = function (uid, username) {
    var monthCollectionPara = {
      uid: uid,
      username: username,
      monthRecord: [],
      totalIncome : 0,  // 收入
	    totalExpenses: 0, // 支出
	    totalBalance : 0, // 结余
    };
    Model.UserMonthAccount.create(monthCollectionPara, (err, data) => {
      if (err) {
        res.json({
          state: 0,
          err: err
        });
      } else {
        console.log('创建账户成功！');
      }
    });
  }

  var registerDb = function () {
    Model.User.create({
      username,
      password
    }, (err, data) => {
      if (err) {
        res.json({
          state: 0,
          err: err
        });
      } else {
        // 创建月账户
        makeUserMonthAccountCollection(data._id, data.username);
        res.json({
          data: data,
          state: 1,
          msg: '注册成功！',
          user: username
        });
      }
    });
  }

  
  Model.User.find({ username }, (err, data) => {
    if (err) {
      res.json({
        state: 0,
        err: err
      });
    } else {
      if (data.length > 0) {
        res.json({
          state: 2,
          msg: '用户已存在'
        });
      } else {
        registerDb();
      }
      
    }
  });
});

module.exports = router;




















