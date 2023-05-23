import mongoose from "mongoose";


 const connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
   
  } catch (err) {
    console.log(err);
  }
 };

export default connect
 


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