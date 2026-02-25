import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verfication_token: {
      type: String,
    },
    verfication_token_expires: {
      type: Date,
    },
  },
  { timestamps: true },
);

export const User = mongoose.model('User', userSchema);
