"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controller/userController");
const router = express_1.default.Router();
/* GET users listing. */
router.get("/", userController_1.getSignIn);
router.post("/add_user", userController_1.postSignIn);
router.get("/login", userController_1.getLogin);
router.post("/", userController_1.postLogin);
router.get("/logout", userController_1.getLogout);
exports.default = router;
