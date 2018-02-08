var fs = require("fs");
var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var app = express();

//Static files and engine ⛔⛔⛔
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
//body parser initialization
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
  extended: false
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());







app.listen(2020, () => {
    console.log("server work in port 2020");
  });