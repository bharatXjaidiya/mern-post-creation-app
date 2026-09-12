const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { followController, unFollowController , getAllUsersController , getUserProfileController} = require("../controllers/user.controller");

const userRouter = express();

userRouter.get("/getAllUsers",authMiddleware,getAllUsersController);
userRouter.get("/:userId",authMiddleware,getUserProfileController);
userRouter.post("/follow/:followeeId", authMiddleware, followController);
userRouter.delete("/unfollow/:followeeId", authMiddleware, unFollowController);

module.exports = userRouter;