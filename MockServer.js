
var express = require("express");
var app = express();

app.use(express.static("."));

app.listen(9898, function(){
  console.log("MockServer listening on 9898!");
});
