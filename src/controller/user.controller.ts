/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../model/user.model.js';

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const getUserById = async (_: any, args: { id: string }) => {
  const user = await User.findById(args.id);
  return user;
};

export const getPostOwner = async (id: string) => {
  const user = await User.findById(id);
  return user;
};
