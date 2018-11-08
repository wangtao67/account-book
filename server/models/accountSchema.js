const mongoose = require('mongoose')

// 记录列表
const recordsSchema = mongoose.Schema({
  date :String,
  amount : Number,
  useTypeId: String,
  type : String,
  memo: String
}, { collection: 'record' })

// 支出/收入类型
const expenseCostTypesSchema = mongoose.Schema({
  name : String,
  type: Number
}, { collection: 'expenseTypes' })

const models = {
  Records: mongoose.model('Records', recordsSchema),
  ExpenseCostTypes: mongoose.model('ExpenseCostTypes', expenseCostTypesSchema)
}

module.exports = models;

