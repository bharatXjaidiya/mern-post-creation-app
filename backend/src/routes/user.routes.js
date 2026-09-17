const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { followController, unFollowController , getAllUsersController , getUserProfileController , getFollowListController} = require("../controllers/user.controller");

const userRouter = express();

userRouter.get("/getAllUsers",authMiddleware,getAllUsersController);
userRouter.get("/:userId",authMiddleware,getUserProfileController);
userRouter.post("/follow/:followeeId", authMiddleware, followController);
userRouter.delete("/unfollow/:followeeId", authMiddleware, unFollowController);
userRouter.get("/getFollowList/:userId",authMiddleware,getFollowListController);

module.exports = userRouter;