"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
const bookController_1 = require("../controller/bookController");
// router.get("/dashboard", (req: Request, res: Response, next: NextFunction) => {
//   res.render('book/home')
// });
router.get("/add-book", bookController_1.getAddBook);
router.get("/:bookId", bookController_1.getBook);
router.get("/", auth_1.auth, bookController_1.getBooks);
router.post("/add-book", bookController_1.postAddBook);
router.get("/edit-book/:bookId", bookController_1.getEditBook);
router.post("/edit-book", bookController_1.postEditBook);
router.post("/delete-book", bookController_1.postDeleteBook);
exports.default = router;
