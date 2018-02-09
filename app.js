var bodyParser = require("body-parser");
var data = require("./models/schema");
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
    data.find({}).exec((err, more) => {
        res.send(more)
    })
})

app.get("/signup", (req, res) => {
    res.render("signup.ejs", {
        pageTitle: "Join US"
    })
})

app.post("/signup", (req, res) => {
    data.create(req.body, (err, more) => {
        if (err) {
            console.log(err + 'in post sign up');
            return err
        } else {
            console.log(more);
            res.send(more)
        }
    })
})

app.get("/signin", (req, res) => {
    res.render("signin", {
        pageTitle: "please knock knock"
    })
})

app.post("/signin", (req, res) => {
    data.find({
            name: req.body.name
        })
        .exec(err,(docs)=>{
            if(err){
                return err;
            }else{
                console.log("found" + docs);                
                res.send(docs);
            }
        })
})
app.listen(2020, () => {
    console.log("server work in port 2020");
});