import { User } from '../model/auth.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { UserData } from '../model/userData.model.js';
import mongoose from 'mongoose';
import crypto from 'crypto';
import nodemailer from "nodemailer";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const createUser = async (req, res, next) => {
  try {
    const { email, password, userName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
     const verfication_token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const newUser = await User.create({
      email,
      password: hashedPassword,
      userName,
       isVerified: false,
        verfication_token: verfication_token,
        verfication_token_expires: expires
      
    });
    var token = await jwt.sign(
      { userName: userName, email: email, id: newUser._id },
      SECRET_KEY,
    );

    const resetLink = `http://localhost:3000/verify/${verfication_token}`;
    
    await transporter.sendMail({
  from: process.env.EMAIL,
  to: email,
  subject: "Verify Mail",
  html: `
    <h3>Verify Your Mail</h3>
    <p>Click below link to verify your mail</p>
    <a href="${resetLink}">Verify</a>
  `,
});
   
    return res.status(201).json({
      success: true,
      message: 'User created successfully',
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
      data: [],
    });
  }
};

export const getUserData = async (req, res, next) => {
  console.log(req.headers)
  const token = req.headers.authorization;
  console.log(token, 'tttttt')
  const userDetails = JSON.parse(
    Buffer.from(token.split('.')[1], 'base64').toString(),
  );
  console.log(userDetails);
  try {
    const response = await UserData.findOne({
      user_id: new mongoose.Types.ObjectId(userDetails.id),
    });
    return res.send({
      status: 200,
      success: true,
      data: response,
    });
  } catch (error) {
    return res.send({
      status : 500,
      error: true,
      message: 'internal server error'
    })
  }
};


export const verifyEmailToken = async (req, res, next) =>{
  const rowToken = req.params.token;
const user = await User.findOne({
    verfication_token : rowToken
  });

  if(!user) {
    return res.status(400).json('Invalid token"');
  }

  if (user.verfication_token_expires < Date.now()) {
  return res.status(400).json({ message: "Token expired" });
}

user.isVerified = true;
user.verfication_token = undefined;
user.verfication_token_expires = undefined;


await user.save();
res.send({
  success : true,
  message: "Email verified successfully"
})
}