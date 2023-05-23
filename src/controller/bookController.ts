import express, { Application, Request, Response, NextFunction } from "express";
import Book from "../model/bookModel";
import { verify } from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET as string;

interface BookObj {
  Title: string;
  Author: string;
  datePublished: string;
  image: string;
  Description: string;
  pageCount: number;
  Genre: string;
  bookId: number;
  Publisher: string;
}

export const getAddBook = (req: Request, res: Response, next: NextFunction) => {
  res.render("book/edit-book", {
    docTitle: "Add it!",
    path: "/add-book",
    editing: false,
  });
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    const cookie = req.cookies["jwt"];
    verify(cookie, secret, async (err: any, data: any) => {
      const Id = data;
      let page: number = +(req.query.page || 1);
      const limit: number = +(req.query.limit || 100);
      const skip = (page - 1) * limit;
      let query = Book.find({}).sort({ createdAt: -1 });
      query = query.skip(skip).limit(limit);

      const noOfDocument = await Book.countDocuments();

      let noOfPages = Math.ceil(noOfDocument / limit);

      const nextPage = () => {
        if (page < noOfPages) {
          page++;
          return page;
        } else if (page >= noOfPages) {
          return 1;
        }
      };
      let x = page;
      const prevPage = () => {
        page = x;
        console.log(">>", page);

        if (page > 1) {
          page--;
          return page;
        } else if (page < 2) {
          return 1;
        }
      };

      if (req.query.page) {
        if (skip > noOfDocument) alert("Page does not exist");
      }
      
      const books = await query;

    
      return res.render("book/index", {
        prods: books,
        docTitle: "Library",
        path: "/books",
        limit: 5,
        nextPage: nextPage,
        prevPage: prevPage,
      });
      
    })
  } catch (error) {
      console.log("ERROR", error);
    }
};

export const getBook = async (req: Request, res: Response) => {
  try {
    const bookID: string = req.params.bookId;
    console.log("bookID", bookID);
    const book = await Book.findById(bookID);
    res.render("book/detail", {
      book,
      docTitle: "Book Details",
    });
  } catch (error) {
    console.log(error)
    res.status(404).json({
      message: "Book not found"
    })
  }
};

export const postAddBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    Title,
    Author,
    datePublished,
    image,
    Description,
    pageCount,
    Genre,
    Publisher,
  } = req.body;
  const cookie = req.cookies["jwt"];
  verify(cookie, secret, async (err: any, data: any) => {
    const Id = data.id;
    const book = await Book.create({
      Title,
      Author,
      datePublished,
      image,
      Description,
      pageCount,
      Genre,
      Publisher,
      UserId: Id,
    });
    book.save();
    res.redirect("/books?page=1&limit=5");
  });
};

export const getEditBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const editMode = req.query.edit;

    if (!editMode) {
      return res.redirect("/books");
    }
    const bookID = req.params.bookId;

    const book = await Book.findById(bookID)
    res.render("book/edit-book", {
      docTitle: "Edit it!",
      path: "/edit-book",
      editing: editMode,
      book,
      activeAddProduct: true,
    });
  } catch (error) {
    res.status(400).json({
      message: "Cannot get"
    })
  }

};

export const postEditBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
   try {
    const book = await Book.findByIdAndUpdate(req.body.bookID, req.body, {
      new: true,
    });
    // res.status(200).json({
    //   status: "success",
    //   data: {
    //     book,
    //   },
    // });
    res.redirect("/books?page=1&limit=5");
  } catch (error) {
    res.status(404).json({
      status: "fail",
      message: error,
    });
  }
};

export const postDeleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bookID = req.body.bookId;
  await Book.findByIdAndDelete(bookID);
  res.redirect("/books");
};
