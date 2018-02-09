const mongoose = require("mongoose");
const schema = mongoose.Schema;

var person = new schema({
    name: String,
    job: String,
    password: String,
});
var user = mongoose.model('user', person);
module.exports = user