
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

/********************  user  *********************/

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
  var makeUserAccount = function (uid) {
    var monthCollectionPara = {
      uid: uid,
      totalIncome : 0,  // 收入
	    totalCost: 0, // 支出
	    totalBalance : 0, // 结余
    };
    Model.UserAccount.create(monthCollectionPara, (err, data) => {
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

  /**
   * 生成统计账户
   * @param {string} uid 
   */
  var makeUserExpCostType = function (uid) {
    var defaultTypes = [
      {
        name: "生活",
        type: 2,
        uid: uid
      },
      {
        name: "吃饭",
        type: 2,
        uid: uid
      },
      {
        name: "旅游",
        type: 2,
        uid: uid
      },
      {
        name: "还钱",
        type: 1,
        uid: uid
      },
    ];

    defaultTypes.forEach(ditem => {
      Model.ExpenseCostTypes.create(ditem, (err, data) => {
        if (err) {
          res.json({
            state: 0,
            err: err
          });
        } else {
          console.log('生成类型成功');
        }
      });
    });
  }

  var registerDb = function () {
    Model.User.create({
      username,
      password,
      tel: '',
      realname: ''
    }, (err, data) => {
      if (err) {
        res.json({
          state: 0,
          err: err
        });
      } else {
        // 创建月账户
        makeUserAccount(data._id);
        // 生成支出收入类型
        makeUserExpCostType(data._id);

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

/**
 * 查询用户信息
 * @param  {string} username
 * @param  {string} password
 */
router.post("/getUserInfo", (req, res) => {
  var uid = req.body.uid;
  if (!uid) {
    res.json({
      state: 2,
      msg: '缺少uid',
    });
    return;
  }
  Model.User.findOne({ _id: mongoose.Types.ObjectId(uid) }, (err, doc) => {
    if (err) {
      handError(err, data);
    } else {
      res.json({
        state: 1,
        msg: '查询成功！',
        data: {
          username: doc.username,
          sex: doc.sex,
          tel: doc.tel,
          realname: doc.realname
        }
      });
    }
  });
});

/********************  user end *********************/

module.exports = router;




















