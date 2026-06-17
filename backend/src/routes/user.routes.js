const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const { followController, unFollowController , getAllUsersController} = require("../controllers/user.controller");

const userRouter = express();

userRouter.post("/follow/:followeeId", authMiddleware, followController);
userRouter.delete("/unfollow/:followeeId", authMiddleware, unFollowController);
userRouter.get("/getAllUsers",authMiddleware,getAllUsersController);

module.exports = userRouter;