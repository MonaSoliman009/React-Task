const express = require("express");

var router = express.Router();
const { findWords } = require("../controllers/words");

router.get("/", (req, res, next) => {
  var words = findWords();
  console.log(words);
  res.json(words);
});

module.exports = router;
