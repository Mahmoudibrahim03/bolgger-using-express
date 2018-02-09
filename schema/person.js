const mongoose = require("mongoose");
const schema = mongoose.Schema;

var person = new schema({
    name: {
        type:String,
    },
    job: {
        type: String,
    },
});
var user = mongoose.model('user', person);
module.exports = user