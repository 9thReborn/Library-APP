import mongoose from "mongoose";


 export interface UserAttributes {
  userName: string;
  email: string;
  password: string;
  // userId: any;
}


const Schema = mongoose.Schema

const userSchema = new Schema<UserAttributes>({
  userName: {
    type: String,
    required: true,
    unique: true,
    maxLength: 255
  },
  email:  {
    type: String,
    required: true,
    unique: true,
    maxLength: 255
  },
  password: {
    type: String,
    required: true,
    maxLength: 255
  }
 
}, {timestamps: true})

 const User = mongoose.model('User', userSchema)

 export default User