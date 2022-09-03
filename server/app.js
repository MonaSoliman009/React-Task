const express = require("express");
var app = express();
const cors = require("cors");
const wordsRoutes=require("./routes/words")
const rankRoutes=require("./routes/rank")
app.use(cors());

app.use(express.json());
//routes
app.use("/words",wordsRoutes);
app.use("/rank",rankRoutes);

app.listen(3333, () => {

});
