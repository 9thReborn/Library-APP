import express, { Application, Request, Response, NextFunction } from "express";
import { auth } from "../middleware/auth";
const router = express.Router();
import {
  getBooks,
  getBook,
  getAddBook,
  postAddBook,
  getEditBook,
  postEditBook,
  postDeleteBook,
} from "../controller/bookController";

// router.get("/dashboard", (req: Request, res: Response, next: NextFunction) => {
//   res.render('book/home')
// });

router.get("/add-book", getAddBook);
router.get("/:bookId", getBook);
router.get("/", auth, getBooks);
router.post("/add-book", postAddBook);
router.get("/edit-book/:bookId", getEditBook);
router.post("/edit-book", postEditBook);
router.post("/delete-book", postDeleteBook);

export default router;
