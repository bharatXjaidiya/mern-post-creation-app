const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        require: [true, "name is required"],
        unique: [true, "name must be unique"]
    },
    email: {
        type: String,
        require: [true, "email is required"],
        unique: [true, "email must be unique"]
    },
    password: {
        type: String,
        require: [true, "password is required"]
    },
    bio: {
        type: String,
        default: ""
    },
    profilePicture: {
        type: String,
        default: "https://ik.imagekit.io/03dmk4az7/gray-picture-person-with-gray-background_1197690-22.avif"
    },
})

const userModel = mongoose.model("users", userSchema)

module.exports = userModel