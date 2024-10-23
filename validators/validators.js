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
    .notEmpty()
    .withMessage("Username is required.")
    .isAlphanumeric()
    .withMessage("Username can contain only letters and numbers.")
    .isLength({ min: 5 })
    .withMessage("username must be at least 5 characters long.")
    .escape(),
  body("password")
    .trim()
    .notEmpty("Password is required.")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 charactes long.")
    .escape(),
];

export const validateCategory = [
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category title can't be empty.")
    .isAlpha()
    .withMessage("Category title only can contain letters.")
    .escape(),
  body("slug")
    .custom(async (value) => {
      const category = await models.Category.findSlug(value);
      if (category) {
        throw new Error("Category already exists.");
      }
    })
    .trim()
    .isLength({ min: 1 })
    .withMessage("Category slug can't be empty.")
    .matches(/^[A-Za-z\-]+$/)
    .withMessage("Can only contain letters and dahses.")
    .isLowercase()
    .withMessage("Slug must be lowercase")
    .escape(),
];
