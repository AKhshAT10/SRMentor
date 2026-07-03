import jwt from 'jsonwebtoken';

export const generateToken = (userId,res) => {
   const token = jwt.sign(
    {userId},
    process.env.JWT_SECRET,
    {expiresIn:"7d"}
);

   const isProd = process.env.NODE_ENV === "production";

   res.cookie("jwt",token,{
    maxAge:7*24*60*60*1000, //millisecond
    httpOnly: true, //prevent XSS attacks cross-site scripting attacks
    // In production the frontend (Vercel) and backend (Render) live on different
    // domains, so the cookie must be SameSite=None and Secure to be sent at all.
    // Locally we keep it strict for safety.
    sameSite: isProd ? "none" : "strict",
    secure: isProd,
   });

   return token;
};
