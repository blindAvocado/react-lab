import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import UserModel from "../models/User.js";

export const register = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      username: req.body.username,
      email: req.body.email,
      role: req.body.role,
      passwordHash: hash,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "14d",
      }
    );

    const { passwordHash, ...userData } = user._doc;

    res
      .cookie("access_token", token)
      .status(200)
      .json({
        ...userData,
      });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not register user",
    });
  }
};

export const login = async (req, res) => {
  try {

    const user = await UserModel.findOne({ username: req.body.username }).populate("watched").exec();
    
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    
    const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);
    
    if (!isValidPass) {
      return res.status(400).json({
        message: "Invalid username or password",
      });
    }

    
    const token = jwt.sign(
      {
        _id: user._id,
      },
      "secret",
      {
        expiresIn: "30d",
      }
      );
      
      const { passwordHash, ...userData } = user._doc;
      
    res.cookie("access_token", token).status(200)
      .json({ ...userData });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not login",
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("access_token").status(200).json({ message: "Access token cleared" });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Could not log out",
    })
  }
};
