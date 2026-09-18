const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { followController, unFollowController , getAllUsersController , getUserProfileController , getFollowListController, editController} = require("../controllers/user.controller");
const upload = require("../middleware/multer.middleware")

const userRouter = express();

userRouter.get("/getAllUsers",authMiddleware,getAllUsersController);
userRouter.get("/:userId",authMiddleware,getUserProfileController);
userRouter.post("/follow/:followeeId", authMiddleware, followController);
userRouter.delete("/unfollow/:followeeId", authMiddleware, unFollowController);
userRouter.get("/getFollowList/:userId",authMiddleware,getFollowListController);
userRouter.patch("/edit/:userId",authMiddleware,upload.fields([{name : "profilePic"}, {name : "banner"}]),editController)

module.exports = userRouter;