import { Router } from "express";
// import { Request, Response, NextFunction } from "express";
import { addUser, getUsers, searchUser } from "../controllers/userQueries";
import { body } from "express-validator";

const router = Router();

router.get("/", getUsers);
router.post(
  "/register",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Must be email format")
      .isString(),
    body("password")
      .trim()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 chars"),
    body("fullName").isString().isLength({ min: 2 }),
  ],
  addUser
);

router.post("/usersearch", searchUser);

export default router;
