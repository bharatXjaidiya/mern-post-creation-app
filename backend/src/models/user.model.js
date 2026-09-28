const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true , select :false},
    bio: { type: String, default: "user bio's" },
    profilePic: { type: String, default: "https://xsgames.co/randomusers/assets/images/favicon.png" },
    banner : {type : String , default : "https://images.unsplash.com/photo-1506765515384-028b60a970df?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
    profilePicFileId : {type:String},
    bannerFileId : {type:String}
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;


