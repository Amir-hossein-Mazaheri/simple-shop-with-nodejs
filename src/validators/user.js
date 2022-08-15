import { check } from "express-validator";

export const signInValidator = [
  check("email")
    .not()
    .isEmpty()
    .withMessage("Please fill email field.")
    .isEmail()
    .withMessage("Please enter a valid email."),
  check("password").not().isEmpty().withMessage("Please fill password field"),
];

export const signUpValidator = [
  check("firstname").not().isEmpty().withMessage("Please fill firstname field"),
  check("lastname").not().isEmpty().withMessage("Please fill lastname field"),
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .not()
    .isEmpty()
    .withMessage("Please fill email field."),
  check("password")
    .matches("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$")
    .withMessage("Please enter a strong password")
    .not()
    .isEmpty()
    .withMessage("Please fill password field"),
];
