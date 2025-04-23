import { User } from '../model/user.model.js';

export const getAllUsers = async () => {
  const users = await User.find();
  return users;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserById = async (_: any, args: { id: string }) => {
  const users = await User.findById(args.id);
  return users;
};
