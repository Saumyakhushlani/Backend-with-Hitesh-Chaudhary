import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,
            required: true,
        },
        CoverImage: {
            type: String,

        },
        WatchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, "Password is Required"]
        },
        RefreshToken: {
            type: String
        }
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next){

    if(!this.modified("password")) return next()
    this.password=bcrypt.hash(this.password,10)

    next()
})

userSchema.methods.isPasswordCorrect= async function (password){
   return await bcrypt.compare(password,this.password)
}

userSchema.methods.genrateAcesstoken =async function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username
    },
    process.env.TOKEN_SECRET,
    {expiresIn:"1d"}
)
}


userSchema.methods.genrateRefreshtoken =async function(){
    return jwt.sign({
        _id:this._id,
        
    },
    process.env.TOKEN_SECRET,
    {expiresIn:"1d"}
)
}

export const User = mongoose.model("User", userSchema)
