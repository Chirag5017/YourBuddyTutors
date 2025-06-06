import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";


const userSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },

        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum : ['student', 'tutor'],
            default: 'student'
        },

        enrolledCourses: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }],

        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)


userSchema.pre("save", async function (next)  {
    if(!this.isModified("password")) return next()

    this.password= await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods = {
    isPasswordCorrect  : async function (password)  {
        return await bcrypt.compare(password,this.password)    
    },
    generateAccessToken : function () {
        return jwt.sign(
            {
                _id:this._id,
                username: this.username,
                email:this.email
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY
            }
        )
    },
    generateRefreshToken : function () {
        return jwt.sign(
            {
                _id:this._id
            },
            process.env.REFRESH_TOKEN_SECRET,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
    }
}

export const User = mongoose.model("User", userSchema)
