import { Post } from '../model/post.model.js';

export const getAllPosts = async () => {
  const posts = await Post.find();
  return posts;
};
