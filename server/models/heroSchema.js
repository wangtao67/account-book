const mongoose = require('mongoose')

const recordSchema = mongoose.Schema({
  date :String,
  amount : Number,
  type : String
}, { collection: 'record'})
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const Hero = module.exports = mongoose.model('Hero', recordSchema);
