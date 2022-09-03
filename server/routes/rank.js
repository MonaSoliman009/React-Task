const express=require('express');

var router =express.Router();
const {calcRank}=require('../controllers/rank')

router.post("/", (req, res, next) => {
  //extract final score from request
    const finalScore=req.body.finalScore;
    var rank = calcRank(finalScore);
    res.json({rank});
  });

  module.exports=router;  