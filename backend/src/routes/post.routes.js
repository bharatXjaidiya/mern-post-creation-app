const express = require("express")
const postRouter = express.Router();
const upload = require("../middleware/multer.middleware")
const {createPostController,getAllPostsController, getPostController,getPostDetailController, likePostController, commentPostController, deletePostController, getAllLikesController, getAllCommentsController, deleteCommentController} = require("../controllers/post.controller")
const authMiddleware = require("../middleware/auth.middleware");

postRouter.post("/create",authMiddleware,upload.single("imageUrl"),createPostController);
postRouter.get("/",authMiddleware,getAllPostsController);
postRouter.get("/getPosts",authMiddleware,getPostController)
postRouter.get("/detail/:postId",authMiddleware,getPostDetailController)
postRouter.get("/like/:postId",authMiddleware,likePostController)
postRouter.get("/getAllLikes/:postId",authMiddleware,getAllLikesController)
postRouter.post("/comment/:postId",authMiddleware,commentPostController)
postRouter.delete("/comment/:commentId",authMiddleware,deleteCommentController)
postRouter.get("/getAllComments/:postId",authMiddleware,getAllCommentsController)
postRouter.delete("/delete/:postId",authMiddleware,deletePostController)

module.exports = postRouter