
//引入express模块
const express = require("express");
//定义路由级中间件
const router = express.Router();
//引入数据模型模块
const Model = require("../models/accountSchema");

// var ExpenseCostTypesMd = accountModal.ExpenseCostTypes;

// 查询所有记录
router.get("/recordList", (req, res) => {
  console.log('请求/recordList');
  Model.Records.find({})
    .then(heros => {
      console.log('数据查询');
      console.log(heros);
      res.json(heros);
    })
    .catch(err => {
      console.log(2);
      res.json(err);
    });
});

// 通过ObjectId查询单个英雄信息路由
router.get("/hero/:id", (req, res) => {
  Model.Records.findById(req.params.id)
    .then(hero => {
      res.json(hero);
    })
    .catch(err => {
      res.json(err);
    });
});

// 添加一个英雄信息路由
router.post("/hero", (req, res) => {
  //使用Hero model上的create方法储存数据
  Model.Records.create(req.body, (err, hero) => {
    if (err) {
      res.json(err);
    } else {
      res.json(hero);
    }
  });
});

//更新一条英雄信息数据路由
router.put("/hero/:id", (req, res) => {
  Model.Records.findOneAndUpdate(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        age: req.body.age,
        sex: req.body.sex,
        address: req.body.address,
        dowhat: req.body.dowhat,
        favourite: req.body.favourite,
        explain: req.body.explain
      }
    },
    {
      new: true
    }
  )
    .then(hero => res.json(hero))
    .catch(err => res.json(err));
});

// 添加图片路由
router.put("/addpic/:id", (req, res) => {
  Model.Records.findOneAndUpdate(
    { _id: req.params.id },
    {
      $push: {
        imgArr: req.body.url
      }
    },
    {
      new: true
    }
  )
    .then(hero => res.json(hero))
    .catch(err => res.json(err));
});

//删除一条英雄信息路由
router.delete("/hero/:id", (req, res) => {
  Model.Records.findOneAndRemove({
    _id: req.params.id
  })
    .then(hero => res.send(`${hero.title}删除成功`))
    .catch(err => res.json(err));
});

// 查询消费类型
router.get("/expCostTypes", (req, res) => {
  console.log('请求/recordList');
  Model.ExpenseCostTypes.find({})
    .then(data => {
      console.log('查询消费收入类型');
      console.log(data);
      res.json(data);
    })
    .catch(err => {
      console.log('err');
      res.json(err);
    });
});


router.post("/addexpCostType", (req, res) => {
  Model.ExpenseCostTypes.create(req.body, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      console.log('添加成功！');
      console.log(data);
      res.json(data);
    }
  });
});

module.exports = router;




















