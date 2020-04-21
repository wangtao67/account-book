const mongoose = require('mongoose')

const Schema = mongoose.Schema;

var schemaObj = {
	// 用户列表
	User: Schema({
		username: String,
		password: String,
		sex: String,
		tel: String,
		realname: String,
		memo: String
	}, {
		collection: 'user'
	}),

	// 账户统计表
	UserAccount: Schema({
		uid: String, // 用户id
		totalIncome: Number, // 收入
		totalCost: Number, // 支出
		totalBalance: Number, // 结余
	}, {
		collection: 'userAccount'
	}),

	// 记录列表
	Records: Schema({
		uid: String, // 用户id
		date: String, // 格式：2018-02-23
		createDate: {
			type: Date,
			default: Date.now
		},
		amount: Number,
		useTypeId: String, // 消费（收入）类型id
		useTypeName: String, // 消费（收入）类型
		type: Number, // 消费or收入 1/2
		memo: String
	}, {
		collection: 'record'
	}),

	// 支出/收入类型
	ExpenseCostTypes: Schema({
		uid: String,
		name: String,
		type: Number,
		date: {
			type: Date,
			default: Date.now
		}
	}, {
		collection: 'expenseTypes'
	}),
}

var models = {};

// 遍历schema生成model
for (let i in schemaObj) {
	if (schemaObj.hasOwnProperty(i)) {
		models[i] = mongoose.model(i, schemaObj[i]);
	}
}

module.exports = models;