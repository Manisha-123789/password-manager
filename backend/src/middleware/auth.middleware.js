import { validationResult } from 'express-validator';

import jwt from "jsonwebtoken";
import { User } from '../model/auth.model.js';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    success: false,
    statusCode: err.statusCode || 500,
    message: err.message || "Server Error",
    data: null,
    error: err.message || "Server Error",
  });
};

export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Not authorized",
        data: null,
        error: "Token not provided",
      });
    }

    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
console.log(decoded)
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "User not found",
        data: null,
        error: "Invalid user",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error)
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        statusCode: 401,
        message: "Token expired",
        data: null,
        error: error?.message || "TokenExpiredError",
      });
    }

    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid token",
      data: null,
      error: error?.message || "InvalidToken",
    });
  }
};

export const validateUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      statusCode: 422,
      message: errors.array()[0].msg,
      data: null,
      error: {
        code: 'VALIDATION_ERROR',
        details: errors.array().map(err => ({
          field: err.path,
          message: err.msg,
        })),
      },
    });
  }

  next();
};