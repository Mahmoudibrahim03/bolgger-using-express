var bodyParser = require("body-parser");
var person = require("./schema/person");
var post = require("./schema/posts");
var mongoose = require("mongoose");
var express = require("express");
var multer = require("multer");
var path = require('path');
var ejs = require("ejs");
var fs = require("fs");
var app = express();

// intialize data base information 
var db = "mongodb://localhost/blog";
mongoose.connect(db, { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);
//Static files and engine ⛔⛔⛔
app.set("view engine", "ejs");
app.use("/assets", express.static("assets"));
// Body-paraser setup 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
// Set storage engine .. 
const storage = multer.diskStorage({
    destination: "./assets/uploads/",
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

var upload = multer({
    storage,
    fileFilter: function (req, file, cb) {
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
    post.find({}).limit(20).exec((err, more) => {
        res.render('index', {
            pageTitle: 'Home',
            data: more
        })
    })
})

app.get("/posts", (req, res) => {
    res.render("posts")
})

app.post("/posts", (req, res) => {
    upload(req, res, (err) => {
        if (err || req.file == undefined) {
            res.send(`<h1> err via uploading the file <span style="color:red"> Err </span></h1>`)
        } else {
            new post({
                title: req.body.title,
                description: req.body.description,
                img: req.file.path
            }).save()
            res.redirect("/")
        }
    })
})
app.get("/remove", (req, res) => {
    post.find({}).limit(20).exec((err, more) => {
        if (err) {
            res.send(`there's an err ${err}`)
        } else {
            res.render("remove", {
                data: more
            })
        }
    })
})
app.post("/remove", (req, res) => {
    console.log(req.body.title)
    post.findOne({
        title: req.body.title
    }, function (err, data) {
        if (err) {
            res.send(err);
        } else {
            post.deleteOne({
                title: req.body.title
            }, (err) => {
                if (err) {
                    res.send(err);
                } else {
                    fs.unlink(data.img,(err) => {
                        if (err) throw err;
                        res.redirect("/");
                      });
                }
            })
        }
    })
})
app.listen(2020, () => {
    console.log("server work in port 2020");
});