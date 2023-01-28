import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,'Username exist'],
        required:[true,"Please provide unique Username"]
    },
    password:{
        type:String,
        required:[true,"Please provide password"],
        unique:false
    },
    email:{
        type:String,
        required:[true,"Please provide valid email"],
        unique:[true,"Email already exist"]
    },
    firstname:{type:String},
    lastname:{type:String},
    mobile:{type:String},
    address:{type:String},
    profile:{type:String},
})

export default mongoose.model.Users || mongoose.model('User',UserSchema);