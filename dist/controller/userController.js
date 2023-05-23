"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogout = exports.postLogin = exports.getLogin = exports.getSignIn = exports.postSignIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const util_1 = require("../utils/util");
const secret = process.env.JWT_SECRET;
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn: maxAge });
};
// export const postSignIn = async function (req: Request, res: Response, next: NextFunction) {
//   try {
//     const { userName, email, password, confirm_password } = req.body;
//     const validationResult = validateUser.validate(req.body, options)
//   if (validationResult.error) {
//          res.status(400).json({Error: validationResult.error.details[0].message})
//      }
//     let user = await User.create({userName, email, password});
//     await user.save()
//     console.log("USER>>>", user);
//     res.redirect("/users/login");
//   } catch (error) {
//     if (error) {
//       console.log(error)
//     } 
//   }
// };
const postSignIn = async function (req, res, next) {
    try {
        const { userName, email, password, confirm_password } = req.body;
        const validationResult = util_1.validateUser.validate(req.body, util_1.options);
        if (validationResult.error) {
            return res.status(400).json({ error: validationResult.error.details[0].message });
        }
        let user = await userModel_1.default.create({ userName, email, password });
        res.redirect("/users/login");
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
            res.status(400).json({ Error: error.message });
        }
        else {
            console.log(error);
            res.status(500).json({ Error: "Internal server error" });
        }
    }
};
exports.postSignIn = postSignIn;
const getSignIn = (req, res, next) => {
    console.log("SECRET", secret);
    res.render("user/signIn", {
        docTitle: "Sign In",
    });
};
exports.getSignIn = getSignIn;
const getLogin = (req, res, next) => {
    res.render("user/logIn", {
        docTitle: "Log In",
    });
};
exports.getLogin = getLogin;
const postLogin = async (req, res, next) => {
    try {
        console.log("login");
        const email = req.body.email;
        const password = req.body.password;
        const getUser = await userModel_1.default.findOne({
            email: email,
            password: password
        }).exec();
        const token = createToken(getUser?.id);
        console.log(token);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        const cookie = req.cookies['jwt'];
        console.log(cookie);
        // res.redirect('/books');
        res.status(200).json({
            message: "Login successful",
            user: getUser,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Invalid credentials"
        });
    }
};
exports.postLogin = postLogin;
const getLogout = (req, res, next) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};
exports.getLogout = getLogout;
