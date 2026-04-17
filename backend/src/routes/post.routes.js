const express = require("express");
const multer  = require('multer');
const upload = multer({storage : multer.memoryStorage()})
const postRoute = express.Router();
const { createPostController, getPostController , getPostDetailController, likePostController } = require("../controllers/post.controller");
const authMiddleware = require("../middlewares/auth.middleware")

postRoute.post("/",authMiddleware,upload.single("imgURL"),createPostController)
postRoute.get("/",authMiddleware,getPostController)
postRoute.get("/detail/:postId",authMiddleware,getPostDetailController)
postRoute.get("/like/:postId",authMiddleware,likePostController)

module.exports = postRoute;