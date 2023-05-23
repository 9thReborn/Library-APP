import express, { Application, Request, Response, NextFunction } from "express";
import {
  getSignIn,
  postSignIn,
  getLogin,
  postLogin,
  getLogout,
} from "../controller/userController";
const router = express.Router();

/* GET users listing. */
router.get("/", getSignIn);
router.post("/add_user", postSignIn);
router.get("/login", getLogin);
router.post("/", postLogin);
router.get("/logout", getLogout);

export default router;