/* eslint-disable @typescript-eslint/no-base-to-string */
import { getAllPosts, getPostById, getPostsOfUser } from '../../controller/post.controller.js';
import { createNewUser, getAllUsers, getPostOwner, getUserById } from '../../controller/user.controller.js';
import { IPost } from '../../model/post.model.js';
import { IUser } from '../../model/user.model.js';

export const graphQlResolver = {
  Mutation: {
    newUser: createNewUser
  },
  Query: {
    users: getAllUsers,
    posts: getAllPosts,
    user: getUserById,
    post: getPostById
  },
  User: {
    posts: async (user: IUser) => await getPostsOfUser(user._id)
  },
  Post: {
    owner: async (post: IPost) => await getPostOwner(String(post.owner))
  }
};
