const mongoose = require("mongoose");

const followSchema = new mongoose.Schema({
    follower: {
        type: String
    },
    followee: {
        type: String
    },
    status: {
        type: String,
        default: "pending",
        enum: {
            values: ["pending", "accepted", "rejected"],
            message: "status can only be pending, accepted or rejected"
        }
    }
}, { timestamps: true })

const followModel = mongoose.model("follow", followSchema);

module.exports = followModel 