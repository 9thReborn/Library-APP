"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postDeleteBook = exports.postEditBook = exports.getEditBook = exports.postAddBook = exports.getBook = exports.getBooks = exports.getAddBook = void 0;
const bookModel_1 = __importDefault(require("../model/bookModel"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const secret = process.env.JWT_SECRET;
const getAddBook = (req, res, next) => {
    res.render("book/edit-book", {
        docTitle: "Add it!",
        path: "/add-book",
        editing: false,
    });
};
exports.getAddBook = getAddBook;
const getBooks = async (req, res) => {
    try {
        const cookie = req.cookies["jwt"];
        (0, jsonwebtoken_1.verify)(cookie, secret, async (err, data) => {
            const Id = data;
            let page = +(req.query.page || 1);
            const limit = +(req.query.limit || 100);
            const skip = (page - 1) * limit;
            let query = bookModel_1.default.find({}).sort({ createdAt: -1 });
            query = query.skip(skip).limit(limit);
            const noOfDocument = await bookModel_1.default.countDocuments();
            let noOfPages = Math.ceil(noOfDocument / limit);
            const nextPage = () => {
                if (page < noOfPages) {
                    page++;
                    return page;
                }
                else if (page >= noOfPages) {
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
                }
                else if (page < 2) {
                    return 1;
                }
            };
            if (req.query.page) {
                if (skip > noOfDocument)
                    alert("Page does not exist");
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
        });
    }
    catch (error) {
        console.log("ERROR", error);
    }
};
exports.getBooks = getBooks;
const getBook = async (req, res) => {
    try {
        const bookID = req.params.bookId;
        console.log("bookID", bookID);
        const book = await bookModel_1.default.findById(bookID);
        res.render("book/detail", {
            book,
            docTitle: "Book Details",
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({
            message: "Book not found"
        });
    }
};
exports.getBook = getBook;
const postAddBook = async (req, res, next) => {
    const { Title, Author, datePublished, image, Description, pageCount, Genre, Publisher, } = req.body;
    const cookie = req.cookies["jwt"];
    (0, jsonwebtoken_1.verify)(cookie, secret, async (err, data) => {
        const Id = data.id;
        const book = await bookModel_1.default.create({
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
exports.postAddBook = postAddBook;
const getEditBook = async (req, res, next) => {
    try {
        const editMode = req.query.edit;
        if (!editMode) {
            return res.redirect("/books");
        }
        const bookID = req.params.bookId;
        const book = await bookModel_1.default.findById(bookID);
        res.render("book/edit-book", {
            docTitle: "Edit it!",
            path: "/edit-book",
            editing: editMode,
            book,
            activeAddProduct: true,
        });
    }
    catch (error) {
        res.status(400).json({
            message: "Cannot get"
        });
    }
};
exports.getEditBook = getEditBook;
const postEditBook = async (req, res, next) => {
    try {
        const book = await bookModel_1.default.findByIdAndUpdate(req.body.bookID, req.body, {
            new: true,
        });
        // res.status(200).json({
        //   status: "success",
        //   data: {
        //     book,
        //   },
        // });
        res.redirect("/books?page=1&limit=5");
    }
    catch (error) {
        res.status(404).json({
            status: "fail",
            message: error,
        });
    }
};
exports.postEditBook = postEditBook;
const postDeleteBook = async (req, res, next) => {
    const bookID = req.body.bookId;
    await bookModel_1.default.findByIdAndDelete(bookID);
    res.redirect("/books");
};
exports.postDeleteBook = postDeleteBook;
