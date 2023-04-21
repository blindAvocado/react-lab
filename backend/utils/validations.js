import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Minimum length must be 6 chars").isLength({ min: 6 }),
];

export const registerValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Minimum length must be 6 chars").isLength({ min: 6 }),
];