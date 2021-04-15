import express from "express";

import { getPosts, createPost, updatePost, deletePost, addLike } from "../controllers/posts.js";

const router = express.Router();

router.route('/').get(getPosts).post(createPost);


router.route('/:id').patch(updatePost).delete(deletePost);

router.patch('/:id/addLike', addLike)
export default router;
