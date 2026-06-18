const postModel = require("../models/post.model")
const likeModel = require("../models/like.model")
const jwt = require("jsonwebtoken");
const ImageKit = require("imagekit");
const commentModel = require("../models/comment.model");
const { getAllLikes } = require("../../../frontend/src/features/posts/services/post.api");


const imageKit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
})

const createPostController = async (req, res) => {

    try {
        if (!req.file) {
            return res.status(400).json({ message: "no file uploaded" });
        }

        const { caption, description } = req.body;

        if (!caption || !description) {
            return res.status(400).json({ message: "all fields required" });
        }

        // upload to imagekit
        const result = await new Promise((resolve, reject) => {
            imageKit.upload({
                file: req.file.buffer,
                fileName: req.file.originalname,
                folder: "/posts"
            }, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        const post = await postModel.create({
            userId: req.userId,
            imageUrl: result.url,
            fileId: result.fileId,   // for deletion later
            caption,
            description,
        });

        res.status(201).json({ message: "post created successfully", post });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }

}

const getAllPostsController = async (req, res) => {
    const userId = req.userId;

    const posts = await Promise.all((await postModel.find().populate("userId").lean()).map(async (post) => {
        const isLiked = await likeModel.findOne({
            postId: post._id,
            userId
        })

        post.isLiked = !!isLiked;
        return post
    }));



    res.status(200).json({ message: "All posts fetched successfully.", posts })
}

const getPostController = async (req, res) => {
    const userId = req.userId;
    const posts = await postModel.find({ userId })

    if (posts.length === 0) {
        return res.status(404).json({ message: "No posts created yet." })
    }

    res.status(200).json({ message: "Posts fetched successfully.", posts })
}

const getPostDetailController = async (req, res) => {
    const postId = req.params.postId;
    const userId = req.userId;

    const post = await postModel.findById(postId);
    if (!post) {
        return res.status(404).json({ message: "Post does not found." })
    }

    const postOwnerId = post.userId.toString();

    if (postOwnerId != userId) {
        return res.status(403).json({
            message: "Forbidden, user dosn't have access to this post"
        })
    }

    res.status(200).json({ message: "Post details fetched.", post })
}

const likePostController = async (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post doesn't exist"
        })
    }

    const exist = await likeModel.findOne({ userId, postId });

    if (exist) {
        //dislike
        await exist.deleteOne();
        await postModel.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } })
        return res.status(200).json({ message: "Post unliked." })
    }

    await likeModel.create({ userId, postId });
    await postModel.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } })

    res.status(200).json({ message: "Post liked", likeCount: postModel.likeCount })

}

const getAllLikesController = async (req,res) => {

    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
        return res.status(404).json({
            message: "Post doesn't exist"
        })
    }

    const allLikes = await likeModel.find({ postId }).populate("userId");

    res.status(200).json({message : "All likes list fetched successfully" , allLikes})


}

const commentPostController = async (req, res) => {
    const userId = req.userId;
    const postId = req.params.postId;
    const { comment } = req.body;
    const post = await postModel.findById(postId)


    if (!post) {
        return res.status(404).json({
            message: "post doesn't exist"
        })
    }

    const result = await commentModel.create({
        userId,
        postId,
        comment
    })

    await result.populate("userId")

    await postModel.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } })

    res.status(201).json({ message: "comment on post successfully", comment: result })
}

const getAllCommentsController = async(req,res)=>{
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    console.log(post)
   
    if(!post) {
        return res.status(404).json({message : "Post doesn't exist."})
    }

    const allComments = await commentModel.find({ postId }).populate("userId");

    res.status(201).json({message : "All comments fetched successfully" , allComments});
}

const deleteCommentController = async (req, res) => {
    try {
        const { commentId } = req.params;
        const userId = req.userId;

        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        if (!comment.userId.equals(userId)) {
            return res.status(403).json({
                message: "Can't delete this comment."
            });
        }

        await commentModel.findByIdAndDelete(commentId);

        await postModel.findByIdAndUpdate(
            comment.postId,
            { $inc: { commentCount: -1 } }
        );

        return res.status(200).json({
            message: "Comment deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        });
    }
};

const deletePostController = async (req, res) => {
    try {
        const userId = req.userId;
        const postId = req.params.postId;

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: "Post doesn't exist." })
        }

        const postOwner = post.userId.toString();

        if (userId != postOwner) {
            return res.status(403).json({ message: "can't delete this post" })
        }


        await new Promise((resolve, reject) => {
            imageKit.deleteFile(post.fileId, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        await postModel.findByIdAndDelete(postId);
        await likeModel.deleteMany({ postId });
        await commentModel.deleteMany({ postId });

        res.status(200).json({ message: "Post deleted successfully" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}
module.exports = { createPostController, getAllPostsController, getPostController, getPostDetailController, likePostController, commentPostController, deletePostController ,getAllLikesController , getAllCommentsController ,deleteCommentController}