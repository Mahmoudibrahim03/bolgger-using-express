var bodyParser = require("body-parser");
var person = require("./schema/person");
var post = require("./schema/posts");
var mongoose = require("mongoose");
var express = require("express");
var ejs = require("ejs");
var app = express();

// intialize data base information 
var db = "mongodb://localhost/blog";
mongoose.connect(db);
//Static files and engine ⛔⛔⛔
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
// Body-paraser setup 
var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({
    extended: false
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Dynamic controller GET,POST 📧📧📧
// Home page.
app.get("/", (req, res) => {
    post.find({}).exec((err, more) => {
        res.send(more)
    })
})

app.get("/blog", (req, res) => {
    res.render("blog");
})
app.post("/blog", (req, res,next) => {
    post.create(req.body, (err, more) => {
        if (err) {
            console.log('err'+ err)
        }else{
            next();
            console.log(more)
        }
    })
})
app.listen(2020, () => {
    console.log("server work in port 2020");
});