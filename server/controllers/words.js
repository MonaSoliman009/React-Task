const fs = require("fs");

function findWords() {
  //read words from json file
  var data = JSON.parse(
    fs.readFileSync("./TestData.json", { encoding: "utf-8" })
  );
  var words = data.wordList;
  var randomWords = [],
    counter = 0,
    result = [],
    pos = ["adverb", "noun", "adjective", "verb"];
    //to make sure that array contain the  4 pos
  function shallowEqual(object1, key) {
    if (object1["pos"] !== key) {
      return false;
    }
    return true;
  }

  //generate array of words without duplication and should include ["adverb", "noun", "adjective", "verb"]
  do {
    result = [];
    randomWords = [];
    counter = 0;
    while (counter < 10) {
      let rand = words[Math.round(Math.random() * 10)];
      if (!randomWords.some((an) => an === rand)) {
        randomWords.push(rand);
        counter++;
      }
    }

    for (var k = 0; k < 4; k++) {
      result.push(randomWords.some((item) => shallowEqual(item, pos[k])));
    }
  } while (result.includes(false));

  return randomWords;
}
module.exports = { findWords };
