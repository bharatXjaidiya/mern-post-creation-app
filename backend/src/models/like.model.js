const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    postId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "posts",
        required : [true , "post id is required to like a post"]
    },
    userName : {
        type : String,
        required : [true , "user name is required to like a post"]
    }
},{timestamps : true})

const likeModel = mongoose.model("like",likeSchema);

likeSchema.index({postId : 1 , userName : 1},{unique : true})

module.exports = likeModel 