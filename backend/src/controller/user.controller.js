import { User } from "../model/auth.model.js";
import bcrypt from "bcryptjs";
import dotenv  from 'dotenv';
import jwt from 'jsonwebtoken'

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;
console.log(SECRET_KEY, 'ssssssssssss')
export const createUser = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    var token = await jwt.sign({ userName: userName, email : email }, SECRET_KEY);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      userName,
    });
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      token: token,
      data: {
        id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
      },
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
      data: []
    });
  }
};