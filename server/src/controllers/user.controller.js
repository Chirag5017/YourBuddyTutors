import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { emailCheck, passwordCheck } from "../utils/inputValidation.js";


const generateToken = async(user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false});

    return { accessToken, refreshToken };
}

const cookieOptions = {
    httpOnly: true,
    secure: false,
    maxAge: 7*24*60*60*1000
}

const registerController = asyncHandler(async (req, res) => {
    const { name, email, password, role} = req.body;

    emailCheck(email);
    passwordCheck(password);

    const emailExist = await User.findOne({ email });
    if(emailExist) {
        throw new ApiError(400,"Email already exists");
    }

    // cloudinary

    const user = await User.create({
        name,
        email,
        password,
        role
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if(!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    const { accessToken, refreshToken} = await generateToken(createdUser);

    return res
        .status(201)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .cookie('accessToken', accessToken, cookieOptions)
        .json(
            new ApiResponse(
                201,
                createdUser,
                "User registered successfully"
            )
        )

})

const loginController = asyncHandler(async (req,res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        throw new ApiError(400, "Email or Password is missing");
    }

    emailCheck(email);
    passwordCheck(password);

    const user = await User.findOne({ email});

    if(!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if(!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }

    const { accessToken, refreshToken } = await generateToken(user);


    const loggedUser = await User.findById(user._id).select("-password -refreshToken");

    if(!loggedUser){
        throw new ApiError(500, "Something went wrong while logging in")
    }

    return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieOptions)
        .cookie('accessToken', accessToken, cookieOptions)
        .json(
            new ApiResponse(
                201,
                loggedUser,
                "User Logged in successfully"
            )
        )
})

const refreshAccessTokenController = asyncHandler(async (req,res) => {
    const  token = req.cookies.refreshToken || req.body.refreshToken
   // console.log(token)
    if(!token) {
        throw new ApiError(401, "unauthorized request") 
    }

    try {
        const decodeToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        //console.log(decodeToken);
        const user = await User.findById(decodeToken?._id)
        //console.log(user);
        
        if(!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if(token != user?.refreshToken) {
            throw new ApiError(401, "Refresh Token is expires or used")
        }


        const {accessToken, newRefreshToken} = await generateToken(user)

        return res
        .status(200)
        .cookie("accessToken", accessToken, option)
        .cookie("refreshToken", newRefreshToken, option)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access Token Refreshed"
            )
        )

    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid  refresh token")
    }
})

const logoutController = asyncHandler(async (req,res)=> {
    await User.findById(
        req.user._id,
        {
            $unset:{
                refreshToken:1
            }
        },
        {
            new : true
        }
    )

return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User Logged out successfully"))
})

export {
    registerController,
    loginController,
    refreshAccessTokenController,
    logoutController

}