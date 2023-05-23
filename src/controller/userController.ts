import express, {Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import fs from 'fs';
import { getuid } from 'process';
import User from '../model/userModel';
import { options, validateUser } from '../utils/util';


interface UserObj {
  userName: string;
  email: string;
  password: string;
  confirm_password: string;
  userId: number;
}

const secret: string = process.env.JWT_SECRET as string;

const maxAge: number = 3 * 24 * 60 * 60;

const createToken = (id: number) => {
  return jwt.sign({ id }, secret, { expiresIn: maxAge });
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

export const postSignIn = async function (req: Request, res: Response, next: NextFunction) {
  try {
    const { userName, email, password, confirm_password } = req.body;
  
    const validationResult = validateUser.validate(req.body, options)

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.details[0].message })
    }

    let user = await User.create({userName, email, password});

    res.redirect("/users/login");
    
 } catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
    res.status(400).json({ Error: error.message });
  } else {
    console.log(error);
    res.status(500).json({ Error: "Internal server error" });
  }
}
};



export const getSignIn = (req: Request, res: Response, next: NextFunction) => {
  console.log("SECRET", secret)
  res.render("user/signIn", {
    docTitle: "Sign In",
  });
};

export const getLogin = (req: Request, res: Response, next: NextFunction) => {
  res.render("user/logIn", {
    docTitle: "Log In",
  });
};

export const postLogin = async(req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("login")
      const email = req.body.email
      const password = req.body.password
      const getUser = await User.findOne({
          email: email,
          password:password
      }).exec()
    

    const token = createToken(getUser?.id);
    console.log(token)
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    const cookie = req.cookies['jwt']
    console.log(cookie)
    // res.redirect('/books');
    res.status(200).json({
      message: "Login successful",
      user: getUser,
      token
    })
  } catch (error: any) {
    console.log(error);
    res.status(400).json({
      message: "Invalid credentials"
    })
   
  }
};

export const getLogout = (req: Request, res: Response, next: NextFunction) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
