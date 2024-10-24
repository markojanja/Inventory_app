import { body } from "express-validator";
import models from "../db/query.js";

export const validateRegister = [
  body("username")
    .trim()
    .custom(async (value) => {
      const user = await models.User.findByName(value);
      if (user) {
        throw new Error("Username already in use.");
      }
    })
    .notEmpty()
    .withMessage("Username is required.")
    .isAlphanumeric()
    .withMessage("Username can contain only letters and numbers.")
    .isLength({ min: 5 })
    .withMessage("Username must be at least 5 characters long.")
    .escape(),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 charactes long.")
    .escape(),
];

export const validateLogin = [
  body("username").trim().notEmpty().withMessage("Username is required.").escape(),
  body("password").trim().notEmpty().withMessage("Password is required.").escape(),
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
    .withMessage("Can only contain letters and dashes.")
    .isLowercase()
    .withMessage("Slug must be lowercase")
    .escape(),
];

export const validateProduct = [
  body("title").notEmpty().withMessage("Title can't be empty.").escape(),
  body("description").notEmpty().withMessage("Description can't be empty.").escape(),
  body("slug")
    .notEmpty()
    .withMessage("Slug cant be empty.")
    .matches(/^[A-Za-x\-]+$/)
    .withMessage("Slug can only contain letters and dashes.")
    .isLowercase()
    .withMessage("Slug can only contain lowercase letters.")
    .escape(),
  body("stock")
    .notEmpty()
    .withMessage("Stock can't be empty.")
    .isNumeric()
    .withMessage("Stock must be number."),
  body("price")
    .notEmpty()
    .withMessage("Price can't be empty.")
    .isNumeric()
    .withMessage("Price must be number."),
  body("categories").custom((value, { req }) => {
    if (!req.body.categories || req.body.categories.length === 0) {
      throw new Error("Must select at least one category.");
    }
    return true;
  }),
];
