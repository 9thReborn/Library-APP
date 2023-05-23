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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const bookSchema = new mongoose_1.default.Schema({
    Title: { type: String, required: true },
    Author: { type: String, required: true },
    datePublished: { type: String },
    image: { type: String },
    Description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    Genre: { type: String, required: true },
    Publisher: { type: String, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, {
    timestamps: true,
});
const Book = (0, mongoose_1.model)("Book", bookSchema);
exports.default = Book;
// const fs = require("fs");
// const path = require("path");
// const p = path.join(__dirname, "../../src/data/database.json");
// const getBooksFromFile = (cb: Function) => {
//   fs.readFile(p, (err: {}, fileContent: string) => {
//     if (err) {
//       cb([]);
//     } else {
//       cb(JSON.parse(fileContent));
//     }
//   });
// };
// interface BookObj {
//   Title: string;
//   Author: string;
//   datePublished: Date;
//   Description: string;
//   pageCount: number;
//   Genre: string;
//   bookId: number;
//   Publisher: string;
// }
// export default class Book {
//   Title: string;
//   Author: string;
//   datePublished: Date;
//   Description: string;
//   pageCount: number;
//   Genre: string;
//   bookId: number;
//   Publisher: string;
//   constructor(
//     title: string,
//     author: string,
//     datePublished: Date,
//     description: string,
//     pageCount: number,
//     genre: string,
//     id: any,
//     publisher: string
//   ) {
//     this.Title = title;
//     this.Author = author;
//     this.datePublished = datePublished;
//     this.Description = description;
//     this.pageCount = pageCount;
//     this.Genre = genre;
//     this.bookId = id;
//     this.Publisher = publisher;
//   }
//   save() {
//     getBooksFromFile((books: BookObj[]) => {
//       if (this.bookId) {
//         const existingBookIndex = books.findIndex(
//           (book) => book.bookId === this.bookId
//         );
//         const updatedBooks = [...books];
//         updatedBooks[existingBookIndex] = this;
//         fs.writeFile(p, JSON.stringify(updatedBooks), (err: any) => {
//           if (err) {
//             console.log(err);
//           }
//         });
//       } else {
//         this.bookId = books.length > 0 ? books[books.length - 1].bookId + 1 : 1;
//         this.datePublished = new Date();
//         books.push(this);
//         fs.writeFile(p, JSON.stringify(books), (err: any) => {
//           if (err) {
//             console.log(err);
//           }
//         });
//       }
//     });
//   }
//   static deleteById(id: number) {
//     getBooksFromFile((books: BookObj[]) => {
//       const product = books.find((book) => book.bookId === id);
//       const updatedProducts = books.filter((book) => book.bookId !== id);
//       fs.writeFile(p, JSON.stringify(updatedProducts), (err: any) => {
//         if (!err) {
//         }
//       });
//     });
//   }
//   static fetchAll(cb: Function) {
//     getBooksFromFile(cb);
//   }
//   static findById(id: number, cb: Function) {
//     getBooksFromFile((books: BookObj[]) => {
//       const book = books.find((p) => p.bookId === id);
//       cb(book);
//     });
//   }
// }
