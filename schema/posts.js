const mongoose = require("mongoose");
const schema = mongoose.Schema;

var postSchema = new schema({
    title: {
        type:String,
        trim:true,
        required:true
    },
    description: {
        type: String,
        trim:true,     
        required:true
    },
    date: {
        type:Date,
        default:Date.now,
    }
});
var post = mongoose.model('post', postSchema);
module.exports = post