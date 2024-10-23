import { body } from "express-validator";
import models from "../db/query.js";

export const registerValidator = [
  body("username")
    .trim()
    .custom(async (value) => {
      const user = await models.User.findByName(value);
      if (user) {
        throw new Error("Email already in use.");
      }
    })
    .isAlphanumeric()
    .withMessage("Username can contain only letters and numbers")
    .isLength({ min: 5 })
    .withMessage("username must be at least 5 characters long")
    .escape(),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 charactes long!")
    .escape(),
];
