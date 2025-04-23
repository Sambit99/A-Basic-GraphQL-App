import { Post } from '../model/post.model.js';

export const getAllPosts = async () => {
  const posts = await Post.find();
  return posts;
};

export const getPostById = async (id: string) => {
  const posts = await Post.findById(id);
  return posts;
};
