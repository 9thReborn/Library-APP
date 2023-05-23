"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../../model/userModel"));
const testUtills_1 = require("./testUtills");
const globals_1 = require("@jest/globals");
const globals_2 = require("@jest/globals");
const mongoose_1 = __importDefault(require("mongoose"));
const bookModel_1 = __importDefault(require("../../model/bookModel"));
(0, globals_1.beforeAll)(async () => await (0, testUtills_1.dbConnect)());
(0, globals_1.afterAll)(async () => await (0, testUtills_1.dbDisconnect)());
(0, globals_1.describe)("User Model Test Suite", () => {
    (0, globals_1.test)("should create a User data successfully", async () => {
        const UserData = {
            userName: "Silas",
            email: "silas@gmail.com",
            password: "12345",
        };
        const newUserData = new userModel_1.default(UserData);
        await newUserData.save();
        (0, globals_2.expect)(newUserData._id).toBeDefined();
        (0, globals_2.expect)(newUserData.userName).toBe(UserData.userName);
        (0, globals_2.expect)(newUserData.email).toBe(UserData.email);
        (0, globals_2.expect)(newUserData.password).toBe(UserData.password);
    });
    (0, globals_1.test)("should fail for User data without email field", async () => {
        const invalidUserData = {
            userName: "Silas",
            password: "12345",
        };
        try {
            const newUserData = new userModel_1.default(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors?.email).toBeDefined();
        }
    });
    (0, globals_1.test)("should fail for User data without username and password fields", async () => {
        const invalidUserData = {
            email: "silas@gmail.com",
        };
        try {
            const newUserData = new userModel_1.default(invalidUserData);
            await newUserData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors?.userName).toBeDefined();
            (0, globals_2.expect)(err.errors?.password).toBeDefined();
        }
    });
});
(0, globals_1.describe)("Book Model Test Suite", () => {
    (0, globals_1.test)("should create a Book data successfully", async () => {
        const BookData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            Title: "The Walking Dead",
            Author: "Silas",
            datePublished: "1990",
            Description: "It is very Interesting",
            pageCount: 5,
            Genre: "Action",
            Publisher: "The9th"
        };
        const newBookData = new bookModel_1.default({
            userId: new mongoose_1.default.Types.ObjectId(BookData.userId),
            Title: BookData.Title,
            Author: BookData.Author,
            datePublished: BookData.datePublished,
            Description: BookData.Description,
            pageCount: BookData.pageCount,
            Genre: BookData.Genre,
            Publisher: BookData.Publisher
        });
        await newBookData.save();
        (0, globals_2.expect)(newBookData._id).toBeDefined();
        (0, globals_2.expect)(newBookData.userId).toEqual(BookData.userId);
        (0, globals_2.expect)(newBookData.Title).toEqual(BookData.Title);
        (0, globals_2.expect)(newBookData.Author).toEqual(BookData.Author);
        (0, globals_2.expect)(newBookData.datePublished).toEqual(BookData.datePublished);
        (0, globals_2.expect)(newBookData.Description).toEqual(BookData.Description);
        (0, globals_2.expect)(newBookData.pageCount).toEqual(BookData.pageCount);
        (0, globals_2.expect)(newBookData.Genre).toEqual(BookData.Genre);
        (0, globals_2.expect)(newBookData.Publisher).toEqual(BookData.Publisher);
    });
    (0, globals_1.test)("should fail for Book data without required fields", async () => {
        const invalidBookData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            Title: "The Walking Dead",
            Author: "Silas",
            datePublished: "1990",
            Description: "It is very Interesting",
            pageCount: 5,
            Genre: "Action",
            Publisher: "The9th"
        };
        try {
            const newBookData = new bookModel_1.default(invalidBookData);
            await newBookData.save();
        }
        catch (error) {
            const err = error;
            (0, globals_2.expect)(err.errors.userId).toBeDefined();
        }
    });
    (0, globals_1.test)("should update a Book successfully", async () => {
        const newBookData = {
            userId: new mongoose_1.default.Types.ObjectId(),
            Title: "The Walking Dead",
            Author: "Silas",
            datePublished: "1990",
            Description: "It is very Interesting",
            pageCount: 5,
            Genre: "Action",
            Publisher: "The9th"
        };
        const createdBook = await bookModel_1.default.create(newBookData);
        const updatedData = {
            Title: "The Walking Dead",
            Author: "Silas",
            datePublished: "1990",
            Description: "It is very Interesting",
            pageCount: 5,
            Genre: "Action",
            Publisher: "The9th"
        };
        const updatedBook = await bookModel_1.default.findByIdAndUpdate(createdBook._id, updatedData, { new: true });
        (0, globals_2.expect)(updatedBook).not.toBeNull();
        (0, globals_2.expect)(updatedBook?.userId).toEqual(newBookData.userId);
        (0, globals_2.expect)(updatedBook?.Title).toEqual(newBookData.Title);
        (0, globals_2.expect)(updatedBook?.Author).toEqual(newBookData.Author);
        (0, globals_2.expect)(updatedBook?.datePublished).toEqual(newBookData.datePublished);
        (0, globals_2.expect)(updatedBook?.Description).toEqual(newBookData.Description);
        (0, globals_2.expect)(updatedBook?.pageCount).toEqual(newBookData.pageCount);
        (0, globals_2.expect)(updatedBook?.Genre).toEqual(newBookData.Genre);
        (0, globals_2.expect)(updatedBook?.Publisher).toEqual(newBookData.Publisher);
    });
    (0, globals_1.test)("should delete a Book successfully", async () => {
        const BookData = {
            userId: new mongoose_1.default.Types.ObjectId("643f09f8978e60f5de08fdc8"),
            Title: "The Walking Dead",
            Author: "Silas",
            datePublished: "1990",
            Description: "It is very Interesting",
            pageCount: 5,
            Genre: "Action",
            Publisher: "The9th"
        };
        const newBookData = new bookModel_1.default({
            userId: new mongoose_1.default.Types.ObjectId(BookData.userId),
            Title: BookData.Title,
            Author: BookData.Author,
            datePublished: BookData.datePublished,
            Description: BookData.Description,
            pageCount: BookData.pageCount,
            Genre: BookData.Genre,
            Publisher: BookData.Publisher
        });
        await newBookData.save();
        const deleteResult = await bookModel_1.default.deleteOne({ _id: newBookData._id });
        (0, globals_2.expect)(deleteResult.deletedCount).toEqual(1);
    });
});
