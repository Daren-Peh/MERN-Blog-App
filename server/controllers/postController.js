import User from "../models/userModel.js";
import Post from "../models/postModel.js";
import asyncHandler from "express-async-handler";
// @desc Create single post
// @route POST /api/posts/upload
// @access Public
const createPost = async(req, res) => {
    const newPost = new Post(req.body);
    try{
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch(error){
        res.status(500).json(error);
    };
};

// @desc Update post
// @route PUT /api/users/:id
// @access Public
const updatePost = async(req, res) => {
    
    const { id } = req.params;
    try{
        const post = await Post.findById(id);
        if (post){
            const updatedPost = await Post.findByIdAndUpdate(id, 
                {
                    $set: req.body
                }, 
                { new: true });

            res.status(200).json(updatedPost);
        } else {
            res.status(401).json("invalid username");
        }
    } catch(error){
        res.status(404).json({error: "Invalid Post ID"});
    }
};

// @desc Delete post
// @route DELETE /api/posts/:id
// @access Public
const deletePost = async(req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (post){
                await post.delete(id);
                res.status(200).json({
                    status:"Post has been deleted"
                });
        } else {
            res.status(401).json({unauthorized: "You can only delete your post."});
        }
    } catch(error){
            res.status(404).json({error: "Invalid Post ID"});
        }
};

// @desc Get post
// @route GET /api/posts/:id
// @access Public
const getPost = asyncHandler(async (req, res) => {
    const post = await Post.findById(req.params.id);

    if(post){
        res.status(200).json(post);
    } else{
        res.status(404);
        throw new Error("Product not found");
    }
});

// @desc Get all posts
// @route GET /api/posts/
// @access Public
const getPosts = async(req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
      let posts;
      if (username) {
        posts = await Post.find({ username });
      } else if (catName) {
        posts = await Post.find({
          categories: {
            $in: [catName],
          },
        });
      } else {
        posts = await Post.find();
      }
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json(err);
    }
};

export { createPost, updatePost, deletePost, getPost, getPosts };