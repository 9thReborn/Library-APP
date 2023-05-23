"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    try {
        await mongoose_1.default.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch (err) {
        console.log(err);
    }
};
exports.default = connect;
// import mongoose from 'mongoose';
// import * as dotenv from 'dotenv'
// dotenv.config()
// const MONGO_URI = process.env.DATABASE_URL as string
// const connect = async () => {
//   try {
//     // console.log('DATABASE_URL:', MONGO_URI); // Log the value of DATABASE_URL
//     await mongoose.connect(MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     } as mongoose.ConnectOptions);
//     console.log('Connected to MongoDB');
//   } catch (error) {
//     console.error('Failed to connect to MongoDB', error);
//   }
// };
// export default connect;
