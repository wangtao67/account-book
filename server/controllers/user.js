const Model = require("../models");
const JwtUtil = require('../utils/jwt');
const log4js = require('../log/logConfig');
const logger = log4js.getLogger() //根据需要获取logger
const errlogger = log4js.getLogger('err')
const mongoose = require("mongoose");


	
/**
 * 登录
 */
exports.login = async function (req, res) {
	var username = req.body.username;
	var password = req.body.password;
	if (!username) {
		res.json({
			state: 0,
			msg: '缺少username',
		});
	}
	if (!password) {
		res.json({
			state: 0,
			msg: '缺少password',
		});
	}
	try {
		Model.User.findOne({
			username
		}, (err, data) => {
			if (err) {
				res.json({
					state: 0,
					err: err
				});
			} else {
				if (data) {
					if (data.password === password) {
						let uid = data._id;
						let jwt = new JwtUtil();
						let token = jwt.generateToken({
							uid,
							username
						});
						logger.info('"/login" >> 登录成功, token: ', token);
						res.json({
							state: 1,
							msg: '登录成功！',
							user: username,
							uid: uid,
							token: token
						});
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
	} catch(err) {
		errlogger('user.login --> 查询失败！', err);
		res.json({
			state: 0,
			err: err
		});
	}
}


/**
 * 创建月账户
 * @param {objectId} uid 用户id
 * @param {string} username 用户名
 */
async function makeUserAccount (uid) {
	var monthCollectionPara = {
		uid: uid,
		totalIncome: 0, // 收入
		totalCost: 0, // 支出
		totalBalance: 0, // 结余
	};
	Model.UserAccount.create(monthCollectionPara, (err, data) => {
		if (err) {
			// res.json({
			// 	state: 0,
			// 	err: err
			// });
			throw Error(err);

		} else {
			console.log('创建账户成功！');
		}
	});
}

/**
 * 生成消费类型
 * @param {string} uid 
 */
async function makeUserExpCostType (uid) {
	var defaultTypes = [{
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
				// res.json({
				// 	state: 0,
				// 	err: err
				// });
				throw Error(err);
			} else {
				console.log('生成类型成功！');
			}
		});
	});
}

/**
 * 注册
 * @param {*} req 
 * @param {*} res 
 */
exports.register = async function (req, res) {
	var me = this;
	var username = req.body.username;
	var password = req.body.password;
	if (!username) {
		res.json({
			state: 0,
			msg: '缺少username',
		});
	}
	if (!password) {
		res.json({
			state: 0,
			msg: '缺少password',
		});
	}
	

	
	async function registerDb () {
		return Model.User.create({
			username,
			password,
			tel: '',
			realname: ''
		}).then((data) => {
			console.log('注册成功！');
			return data;
		}).catch((ex) => {
			throw Error(err);
		});
	}

	Model.User.find({
		username
	}, async (err, data) => {
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
				try {
					var creatData = await registerDb();

					console.log(creatData);
					// 创建月账户
					await makeUserAccount(creatData._id);
					// 生成支出收入类型
					await makeUserExpCostType(creatData._id);

					res.json({
						data: creatData,
						state: 1,
						msg: '注册成功',
						user: username
					});
				} catch (ex) {
					errlogger.info('/register >> Error: ', ex.message);
					res.json({
						state: 0,
						err: '内部错误'
					});
				}
			}
		}
	});
}

exports.getUserInfo = function (req, res) {
	var uid = req.uid;
	if (!uid) {
		res.json({
			state: 2,
			msg: '缺少uid',
		});
		return;
	}
	Model.User.findOne({
		_id: mongoose.Types.ObjectId(uid)
	}, (err, doc) => {
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
}

/**
 * 删除用户
 * query: {
 * 		username: String
 * }
 * 
 */
exports.deleteUser = async function (req, res) {
	Model.User.findOneAndRemove({
		username: req.body.username
	}, (err, doc) => {
		if (err) {
			res.json({
				state: 0,
				msg: '失败',
			});
		} else {
			console.log(doc);
			if (doc) {
				res.json({
					state: 1,
					msg: '删除成功！',
					data: doc
				});
			} else {
				res.json({
					state: 0,
					msg: '无相关用户！'
				});
			}
			
		}
	});
}
