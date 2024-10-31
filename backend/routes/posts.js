const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Category = require("../models/Category");

//Api end point

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
   res.json(posts);
  } catch(err) {
    res.status(500).json({message: err.message})
  }
});

router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({message: "Post not found"});
    } else {
      res.json(post)
    }
  } catch(err) {
    res.status(500).json({message: err.message});
  }
})

router.post("/", async (req, res) => {
  try {
    const newPost = new Post({...req.body});
    await newPost.save();
    res.status(201).json(newPost);
  } catch(err) {
    res.status(400).json({
      message: err.message
    })
  }
})

router.put("/:id", async (req, res) => {
  try {
    let updatedPost = await Post.findByIdAndUpdate(req.params.id, {...req.body, updatedAt: Date.now()}, {new: true});
    if (!updatedPost) {
      res.status(404).json({message: "Post not found"});
    } else {
      res.status(200).json(updatedPost);
    }
  } catch(err) {
    res.status(400).json({message: err.message});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).json({message: "Post not found"});
    } else {
      await Post.findByIdAndDelete(post._id);
      res.status(204).json({message: "Post Deleted"});
    }
  } catch (err) {
    res.status(500).json({message: err.message})
  }
});

router.get("/category/:categoryId", async (req, res) => {
  try {
    const category = await Category.findById(req.params.categoryId);
    if (category) {
      const post = await Post.find({category: req.params.categoryId});
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Invalid category"});
    }
  } catch (err) {
    res.status(500).json({message: err.message});
  }
})

module.exports = router;
