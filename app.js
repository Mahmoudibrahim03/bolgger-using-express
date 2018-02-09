var mongoose = require("mongoose");
var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var data = require("./models/schema");
var app = express();

var db = "mongodb://localhost/blog";
mongoose.connect(db);
//Static files and engine ⛔⛔⛔
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Dynamic controller GET,POST 📧📧📧
// Home page .
app.get("/", (req, res) => {
    data.find({}).exec((err,more)=>{
        res.send(more)
    })
})

app.get("/signup", (req, res) => {
    res.render("signup.ejs",{
        pageTitle:"Join US"
    })
})

app.post("/signup", (req, res) => {
    data.create(req.body,(err,more)=>{
        if(err){
            console.log(err +'in post sign up');
            return err
        }else{
            console.log(more);
            res.send(more)
        }
    })
})

app.listen(2020, () => {
    console.log("server work in port 2020");
});