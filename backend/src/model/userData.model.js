import mongoose from 'mongoose';
const UserDataSchema = mongoose.Schema({
website: {type: String, required : true},
password: {type: String, required : true},
userName : {type: String}
})

export const UserData = mongoose.model('UserData', UserDataSchema)



