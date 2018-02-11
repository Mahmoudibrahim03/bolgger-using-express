var bodyParser = require("body-parser");
var person = require("./schema/person");
var post = require("./schema/posts");
var mongoose = require("mongoose");
var express = require("express");
var multer = require("multer");
var path = require('path');
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
// Set storage engine .. 
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

var upload = multer({
    storage,
    fileFilter : function (req, file, cb) {
        // accept image only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
}).single("img")
// Dynamic controller GET,POST 📧📧📧
// Home page.
app.get("/", (req, res) => {
    post.find({}).exec((err, more) => {
        res.send(more)
    })
})
app.get("/posts", (req, res) => {
    res.render("posts")
})
app.post("/posts", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.send(`<h1> err via uploading the file <span style="color:red">${err.code}</span></h1>`)
        } else {
            var artical = new post({
                title:req.body.title,
                description:req.body.description,
                img:req.file.path
            }).save()
            res.redirect("/")
        }
    })
})
app.get("/blog", (req, res) => {
    res.render("blog");
})
app.post("/blog", (req, res, next) => {
    post.create(req.body, (err, more) => {
        if (err) {
            console.log('err' + err)
        } else {
            console.log(more)
        }
    })
})
app.listen(2020, () => {
    console.log("server work in port 2020");
});