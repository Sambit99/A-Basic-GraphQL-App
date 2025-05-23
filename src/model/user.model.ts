import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  password: string;
  bio?: string;
  avatar?: string;
  website?: string;
  phone?: number;
  dob?: Date;
  account_type: string;
  role: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
  validatePassword(password: string): Promise<boolean>;
}

enum AccountTypes {
  PUBLIC = 'public',
  PRIVATE = 'private',
  BUSINESS = 'business'
}

enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      min: 5,
      max: 15,
      required: true,
      unique: true
    },
    fullname: {
      type: String,
      min: 5,
      max: 25,
      required: true
    },
    email: {
      type: String,
      min: 12,
      required: true,
      unique: true
    },
    password: {
      type: String,
      min: 8,
      max: 15,
      required: true,
      select: false
    },
    bio: {
      type: String,
      max: 100
    },
    avatar: {
      type: String
    },
    website: {
      type: String
    },
    phone: {
      type: Number
    },
    dob: {
      type: Date
    },
    account_type: {
      type: String,
      enum: Object.values(AccountTypes),
      default: AccountTypes.PUBLIC
    },
    role: {
      type: String,
      enum: Object.values(UserRoles),
      default: UserRoles.USER
    },
    refreshToken: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  // Note: Don't give type for next function Explicitly
  // Note: next: NextFunction from Express will give error
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.validatePassword = async function (userPassword: string): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password as string);
};

export const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);
