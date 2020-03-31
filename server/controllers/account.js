
//引入数据模型模块
const Model = require("../models");

const log4js = require('../log/logConfig');
const logger = log4js.getLogger() //根据需要获取logger
const errlogger = log4js.getLogger('err')
const othlogger = log4js.getLogger('oth')

const handError = function (err, res) {
	res.json({
		state: 0,
		err: err
	});
}

/**
 * 获取记录列表
 */
exports.recordList = function (req, res) {
	var uid = req.uid;
	// logger.info('查询所有记录', req.url);
	// logger.info('查询所有记录 token uid', req.uid);
	// errlogger.error('出错了, 没有姓名', req.query);
	// othlogger.info('其他日志信息');

	var searchMonth = req.body.searchMonth || '';
	if (!uid) {
		res.json({
			state: 2,
			msg: '缺少uid',
			data: req
		});
		return;
	}
	var dateReg = new RegExp(searchMonth);
	// 根据date查询该月份数据，并按日期排序
	Model.Records.find({
		uid,
		'date': dateReg
	}).sort({
		'date': -1
	}).exec(function (err, doc) {
		if (err) {
			res.json({
				state: 0,
				err: err
			});
		} else {
			var dateObj = {};
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
}

exports.userMonthAccount = function (req, res) {
  var uid = req.uid;
  var month = req.body.month;
  if (!uid) {
    res.json({
      state: 2,
      msg: '缺少uid',
    });
    return;
  }

  var dateReg = new RegExp(month); 
  // 根据date查询该月份数据，并按日期排序
  Model.Records.find({ uid, 'date': dateReg }).exec(function(err, doc){
    if (err) {
      res.json({
        state: 0,
        err: err
      });
    } else {
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
}


exports.userMonthTypeAccount = function (req, res) {
  var uid = req.uid;
  var month = req.body.month;
  var type = req.body.type || 2; // 1 - income, 2 - cost
  
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
}

/**
 * 新增消费记录
 * @param  {string} id 
 * @param  {number} date 
 * @param  {number} amount 
 * @param  {string} type
 * @param  {string} memo 
 */
exports.addRecord = function (req, res) {
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
}