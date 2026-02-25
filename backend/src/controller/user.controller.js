import { User } from '../model/auth.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserData } from '../model/userData.model.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const createUser = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const verfication_token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const user = await User.create({
      email,
      password: hashedPassword,
      userName,
      isVerified: false,
      verfication_token: verfication_token,
      verfication_token_expires: expires,
    });
    var jwtToken = await jwt.sign(
      { userName: userName, email: email, id: user._id },
      SECRET_KEY,
    );

    const verifyLink = `${process.env.CLIENT_URL}/verify/${verfication_token}`;

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: 'Verify Mail',
      html: `
    <h3>Verify Your Mail</h3>
    <p>Click below link to verify your mail</p>
    <a href="${verifyLink}">Verify</a>
  `,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      token: jwtToken,
      data: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message,
      data: [],
    });
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await UserData.findOne({
      user_id: new mongoose.Types.ObjectId(userId.id),
    });
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
   next(error)
  }
};

export const verifyEmailToken = async (req, res, next) => {
  try {
    const {token} = req.params;
  const user = await User.findOne({
    verfication_token: token,
    verfication_token_expires: { $gt: Date.now() },

  });

 if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }


 

  user.isVerified = true;
  user.verfication_token = undefined;
  user.verfication_token_expires = undefined;

  await user.save();
      res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
        next(error);

  }

};
