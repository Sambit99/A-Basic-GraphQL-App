/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '../model/user.model.js';

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

export const getUserById = async (_: any, args: { id: string }) => {
  const users = await User.findById(args.id);
  return users;
};
