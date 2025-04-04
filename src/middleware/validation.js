import { body } from "express-validator";

export const registrationValidation = [
  body("email").isEmail().withMessage("Invalid email format."),
  body("password")
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .withMessage(
      "Password must be at least 8 characters long, include one uppercase letter, one number, and one symbol."
    ),
];