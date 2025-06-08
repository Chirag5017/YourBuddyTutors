import jwt from "jsonwebtoken";

export const setCookie = {
  httpOnly: true,
  sameSite: "strict",
  secure:false,
  maxAge: 24 * 60 * 60 * 1000,
}

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ id: user._id, email: user.email }, 
    process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY,
  });

  return res
    .status(200)
    .cookie("token", token, setCookie)
    .json({
        success:true,
        message,
        user
    });
};