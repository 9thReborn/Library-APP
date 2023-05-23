import mongoose, { Model, Schema, HydratedDocument, model } from "mongoose";

export interface BookInput {
  Title: string;
  Author: string;
  datePublished: string;
  image: string;
  Description: string;
  pageCount: number;
  Genre: string;
  Publisher: string;
  userId: Record<string, unknown>;
}

const bookSchema = new mongoose.Schema<BookInput>(
  {
    Title: { type: String, required: true },
    Author: { type: String, required: true },
    datePublished: { type: String },
    image: {type: String},
    Description: { type: String, required: true },
    pageCount: { type: Number, required: true },
    Genre: { type: String, required: true },
    Publisher: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Book = model<BookInput>("Book", bookSchema);

export default Book;













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
