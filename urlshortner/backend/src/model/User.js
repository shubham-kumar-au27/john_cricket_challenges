import mongoose from "mongoose";

const Schema = mongoose.Schema

const Userschema = new Schema({
    username:{
        required:true,
        unique:true,
        type:String
    },
    password:{
        required:true,
        unique:true,
        type:String
    }
})

const User = mongoose.model('User', Userschema);


export default User