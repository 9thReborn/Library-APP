import express, { Application, Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET as string;
// const secret = "secretsecret";

declare module "express-serve-static-core" {
  interface Request {
    _id: string,
    user_name: string
  }
}


export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, secret, (err: any, decodedToken: any) => {
      if (err) {
        console.log(err);
        res.redirect("/users/login");
      } else {
        req._id = decodedToken._id
        next();
      }
    });
  } else {
    res.redirect("/users/login");
  }
};
