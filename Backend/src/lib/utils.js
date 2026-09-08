import jwt from "jsonwebtoken"

export const generateToken = (userid,res) =>{
    const token = jwt.sign({userid},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    
    res.cookie("jwt",token,{
        maxAge: 7*24*60*60*1000, // MS
        httpOnly : true, //prevent XSS attacks : cross-site scripting
        sameSite : "strict", //CSRF attacks
        secure: process.env.NODE_ENV === "development" ? false : true,
    });
    return token;
}
// for secure 
// http://localhost
// https://dsmakmk.com