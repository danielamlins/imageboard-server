import mongoose from "mongoose";
import { PostMessage } from "../models/posts.js";

const getPosts = async (req, res) => {
  try {
    const posts = await PostMessage.find().lean();
    return res.json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    { new: true }
  );
  res.json(updatedPost);
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

    console.log("delete");
  const deletedPost = await PostMessage.findByIdAndRemove(id);
  res.json(deletedPost);
};

const addLike = async (req, res) => {
  const id = req.params.id;
  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { $inc: { likeCount: 1 } },
    { new: true }
  );
  res.json(updatedPost);
};

export { getPosts, createPost, updatePost, deletePost, addLike };
