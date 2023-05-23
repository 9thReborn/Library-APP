import User from "../../model/userModel";
import { dbConnect, dbDisconnect, dbDropCollection } from "./testUtills";
import { describe, test, beforeAll, afterAll } from "@jest/globals";
import { expect } from "@jest/globals";
import mongoose from "mongoose";
import Book from "../../model/bookModel";

beforeAll(async () => await dbConnect());
afterAll(async () => await dbDisconnect());

describe("User Model Test Suite", () => {
  test("should create a User data successfully", async () => {
    const UserData = {
      userName: "Silas",
      email: "silas@gmail.com",
      password: "12345",
    };
    
    const newUserData = new User(UserData);
    await newUserData.save();
    expect(newUserData._id).toBeDefined();
    expect(newUserData.userName).toBe(UserData.userName);
    expect(newUserData.email).toBe(UserData.email);
    expect(newUserData.password).toBe(UserData.password);      
  });

  test("should fail for User data without email field", async () => {
    const invalidUserData = {
      userName: "Silas",
      password: "12345",
    };

    try {
      const newUserData = new User(invalidUserData);
      await newUserData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors?.email).toBeDefined();
    }
  });

  test("should fail for User data without username and password fields", async () => {
    const invalidUserData = {
      email: "silas@gmail.com",
    };

    try {
      const newUserData = new User(invalidUserData);
      await newUserData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors?.userName).toBeDefined();
      expect(err.errors?.password).toBeDefined();
    }
  });
});



describe("Book Model Test Suite", () => {
  test("should create a Book data successfully", async () => {
    const BookData = {
      userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
      Title: "The Walking Dead",
      Author: "Silas",
      datePublished: "1990",
      Description: "It is very Interesting",
      pageCount: 5,
      Genre: "Action",
      Publisher: "The9th"
    };


    const newBookData = new Book({
      userId: new mongoose.Types.ObjectId(BookData.userId),
      Title: BookData.Title,
      Author: BookData.Author,
      datePublished: BookData.datePublished,
      Description: BookData.Description,
      pageCount: BookData.pageCount,
      Genre: BookData.Genre,
      Publisher: BookData.Publisher
    });

    await newBookData.save();

    expect(newBookData._id).toBeDefined();
    expect(newBookData.userId).toEqual(BookData.userId);
    expect(newBookData.Title).toEqual(BookData.Title);
    expect(newBookData.Author).toEqual(BookData.Author);
    expect(newBookData.datePublished).toEqual(BookData.datePublished);
    expect(newBookData.Description).toEqual(BookData.Description);
    expect(newBookData.pageCount).toEqual(BookData.pageCount);
    expect(newBookData.Genre).toEqual(BookData.Genre);
    expect(newBookData.Publisher).toEqual(BookData.Publisher);
  });

  test("should fail for Book data without required fields", async () => {
    const invalidBookData = {
      userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
      Title: "The Walking Dead",
      Author: "Silas",
      datePublished: "1990",
      Description: "It is very Interesting",
      pageCount: 5,
      Genre: "Action",
      Publisher: "The9th"
    };

    try {
      const newBookData = new Book(invalidBookData);
      await newBookData.save();
    } catch (error) {
      const err = error as mongoose.Error.ValidationError;
      expect(err.errors.userId).toBeDefined();
    }
  });

  test("should update a Book successfully", async () => {
    const newBookData = {
      userId: new mongoose.Types.ObjectId(),
      Title: "The Walking Dead",
      Author: "Silas",
      datePublished: "1990",
      Description: "It is very Interesting",
      pageCount: 5,
      Genre: "Action",
      Publisher: "The9th"
    };
    const createdBook = await Book.create(newBookData);

    const updatedData = {
      Title: "The Walking Dead",
      Author: "Silas",
      datePublished: "1990",
      Description: "It is very Interesting",
      pageCount: 5,
      Genre: "Action",
      Publisher: "The9th"
    };

    const updatedBook = await Book.findByIdAndUpdate(createdBook._id, updatedData, { new: true });

    expect(updatedBook).not.toBeNull();
    expect(updatedBook?.userId).toEqual(newBookData.userId);
    expect(updatedBook?.Title).toEqual(newBookData.Title);
    expect(updatedBook?.Author).toEqual(newBookData.Author);
    expect(updatedBook?.datePublished).toEqual(newBookData.datePublished);
    expect(updatedBook?.Description).toEqual(newBookData.Description);
    expect(updatedBook?.pageCount).toEqual(newBookData.pageCount);
    expect(updatedBook?.Genre).toEqual(newBookData.Genre);
    expect(updatedBook?.Publisher).toEqual(newBookData.Publisher);
});


  test("should delete a Book successfully", async () => {
    const BookData = {
      userId: new mongoose.Types.ObjectId("643f09f8978e60f5de08fdc8"),
      Title: "The Walking Dead",
      Author: "Silas",
      datePublished: "1990",
      Description: "It is very Interesting",
      pageCount: 5,
      Genre: "Action",
      Publisher: "The9th"
    };

    const newBookData = new Book({
      userId: new mongoose.Types.ObjectId(BookData.userId),
      Title: BookData.Title,
      Author: BookData.Author,
      datePublished: BookData.datePublished,
      Description: BookData.Description,
      pageCount: BookData.pageCount,
      Genre: BookData.Genre,
      Publisher: BookData.Publisher
    });

    await newBookData.save();

    const deleteResult = await Book.deleteOne({ _id: newBookData._id });

    expect(deleteResult.deletedCount).toEqual(1);
  });
});