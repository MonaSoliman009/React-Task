const fs = require("fs");

function calcRank(finalScore) {
  //read scoreList from file
  var data = JSON.parse(
    fs.readFileSync("./TestData.json", { encoding: "utf-8" })
  );
  var scores = data.scoresList;
  var numOfStudents = 0;
  //count num of students that have score less than final score
  for (var i = 0; i < scores.length; i++) {
    if (scores[i] < finalScore) {
      numOfStudents++;
    }
  }
//calculate rank value
  var rankValue = (numOfStudents / 30) * 100;
  return parseFloat(rankValue.toFixed(2));
}
module.exports = { calcRank };
