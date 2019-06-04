exports.login = function (req, res) {
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
	Model.User.find({
		username
	}, (err, data) => {
		if (err) {
			res.json({
				state: 0,
				err: err
			});
		} else {
			if (data.length > 0) {
				if (data[0].password === password) {
					let uid = data[0]._id;
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
}

exports.register = function (req, res) {
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
			totalIncome: 0, // 收入
			totalCost: 0, // 支出
			totalBalance: 0, // 结余
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

	Model.User.find({
		username
	}, (err, data) => {
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