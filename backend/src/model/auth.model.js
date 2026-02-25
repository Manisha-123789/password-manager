import mongoose from 'mongoose';

const userSchema =  mongoose.Schema({
    email : {type : String, required : true},
    password : {type : String, required : true},
    userName : {type: String, required: true},
    isVerified: {type: Boolean, required: true, default : false},
    verfication_token: {type: String, require: true},
    verfication_token_expires: {type: String, require: true}
})


export const User = mongoose.model('User', userSchema);