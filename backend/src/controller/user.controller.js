import { User } from '../model/auth.model.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { jwtDecode } from 'jwt-decode';
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
    const verification_token = crypto.randomBytes(32).toString('hex');
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const user = await User.create({
      email,
      password: hashedPassword,
      userName,
      isVerified: false,
      verification_token,
      verification_token_expires: expires,
    });

    const jwtToken = await jwt.sign(
      { userName: user.userName, email: user.email, id: user._id },
      SECRET_KEY,
      { expiresIn: '1h' },
    );

    const verifyLink = `${process.env.CLIENT_URL}/verify/${verification_token}`;

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
      statusCode: 201,
      message: 'User created successfully',
      data: {
        user: {
          id: user._id,
          email: user.email,
          userName: user.userName,
        },
        token: jwtToken,
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'User creation failed',
      data: null,
      error: error?.message || 'Something went wrong',
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    console.log(user, 'this is the user');
    if (user.isVerified) {
      const isMatch = await bcrypt.compare(password, user.password);
      var jwtToken = await jwt.sign(
        { userName: user.userName, email: user.email, id: user._id },
        SECRET_KEY,
        { expiresIn: '1h' },
      );

      if (isMatch) {
        return res.status(200).json({
          success: true,
          statusCode: 200,
          message: 'User login successfully',
          data: {
            user: {
              id: user._id,
              email: user.email,
              userName: user.userName,
            },
            token: jwtToken,
          },
          error: null,
        });
      } else if (!user.isVerified) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: 'Please verify your email',
          data: null,
          error: 'Email is not verified',
        });
      } else {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'Invalid email or password',
          data: null,
          error: 'Email and password is not valid',
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Email not verified. Please verify your email to continue.',
        data: null,
        error: 'Email not verified. Please verify your email to continue.',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Internal server error',
      data: null,
      error: error?.message || 'Something went wrong',
    });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const email = req.user.email;
    const user = await User.findOne({ email });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User fetched successfully',
      data: {
        id: user._id,
        email: user.email,
        userName: user.userName,
        isVerified: user.isVerified,
      },
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to fetch user',
      data: null,
      error: error?.message || 'Something went wrong',
    });
  }
};

export const getUserData = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const data = await UserData.findOne({
      user_id: new mongoose.Types.ObjectId(userId.id),
    });

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User data fetched successfully',
      data,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Failed to fetch user data',
      data: null,
      error: error?.message || 'Something went wrong',
    });
  }
};

export const verifyEmailToken = async (req, res, next) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      verification_token: token,
      verification_token_expires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid or expired token',
        data: null,
        error: 'Token invalid or expired',
      });
    }

    user.isVerified = true;
    user.verification_token = undefined;
    user.verification_token_expires = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Email verified successfully',
      data: null,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Email verification failed',
      data: null,
      error: error?.message || 'Something went wrong',
    });
  }
};

export const resendEmailVerificationLink = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  console.log(user);
  try {
    if (!user.isVerified) {
      const verification_token = crypto.randomBytes(32).toString('hex');
      const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
      user.verification_token = verification_token;
      user.verification_token_expires = expires;
      await user.save();
      const verifyLink = `${process.env.CLIENT_URL}/verify/${verification_token}`;

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

      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'Verification email has been sent please check your email box',
        data: null,
        error: null,
      });
    } else {
      return res.status(200).json({
        success: false,
        statusCode: 200,
        message: 'Email is already verified',
        data: null,
        error: 'Email is already verified',
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      statusCode: 500,
      message: 'Something went wrong, please try again later',
      data: null,
      error: error?.message || 'Something went wrong, please try again later',
    });
  }
};
