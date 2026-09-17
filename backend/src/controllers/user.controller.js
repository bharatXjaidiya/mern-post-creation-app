const postModel = require("../models/post.model")
const userModel = require("../models/user.model")
const followModel = require("../models/follow.model")

const getUserProfileController = async (req, res) => {
    const userId = req.params.userId;
    const userProfile = await userModel.findById(userId).lean();


    if (!userProfile) {
        return res.status(404).json({ message: 'User does not exist.' });
    }
    res.status(201).json({ message: "User profile fetch succesfully.", userProfile })
}

const followController = async (req, res) => {

    try {
        const followerId = req.userId;
        const followeeId = req.params.followeeId;

        if (followerId === followeeId) {
            return res.status(400).json({ message: "You can't follow yourself." })
        }

        const followee = await userModel.findById(followeeId);
        if (!followee) {
            return res.status(404).json({
                message: "The followee does not found."
            })
        }

        const followRecord = await followModel.create({
            followerId,
            followeeId
        })

        res.status(201).json({ message: "successfully following " + followee.name, followRecord })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const unFollowController = async (req, res) => {
    const followerId = req.userId;
    const followeeId = req.params.followeeId;

    if (followerId === followeeId) {
        return res.status(400).json({ message: "You can't unfollow yourself." })
    }

    const followee = await userModel.findById(followeeId);
    if (!followee) {
        return res.status(404).json({
            message: "The followee does not found."
        })
    }

    const followRecord = await followModel.findOne({ followerId, followeeId })
    console.log(followeeId,followerId)

    if (!followRecord) {
        return res.status(400).json({ message: "You are not following " + followee.name })
    }

    await followRecord.deleteOne()

    res.status(200).json({ message: "Successfully unfollowed " + followee.name })
}

const getAllUsersController = async (req, res) => {
    const allUsers = await userModel.find().select("-password");
    res.status(201).json({ message: "All users fetched successfully", users: allUsers })

}

const getFollowListController = async (req, res) => {
    const userId = req.params.userId;

    const followList = await followModel.find({
        $or: [{ followeeId: userId }, { followerId: userId }]
    }).populate("followerId").populate("followeeId");

    if(followList.length <= 0){
        return res.status(404).json({message : "user doesn't follow someone and no one follow him/her"})
    }

    res.status(200).json({message : "followList fetched successfully." , followList})


}

module.exports = { getUserProfileController, followController, unFollowController, getAllUsersController , getFollowListController }