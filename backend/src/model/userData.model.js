import mongoose from 'mongoose';
const UserDataSchema = mongoose.Schema(
  {
    website: { type: String, required: true },
    password: { type: String, required: true },
    userName: { type: String },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

export const UserData = mongoose.model('UserData', UserDataSchema);
