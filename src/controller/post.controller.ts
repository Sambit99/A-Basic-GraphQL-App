/* eslint-disable @typescript-eslint/no-explicit-any */
import { Post } from '../model/post.model.js';

export const getAllPosts = async () => {
  const posts = await Post.find();
  return posts;
};

export const getPostById = async (_: any, args: { id: string }) => {
  const posts = await Post.findById(args.id);
  return posts;
};
