const jwt = require("jsonwebtoken");
const User = require("../model/userModel");
const expressAsyncHandler = require("express-async-handler");

const protected = expressAsyncHandler(async(req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try{
            //req.headers.authorization="Bearer" "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OTE2ZDYzM2YzZDI1MjcyNzAxODk0YyIsImlhdCI6MTcyMDgwNjg3NCwiZXhwIjoxNzIzMzk4ODc0fQ.EnYqKS5FK3F6Pb81P5kyGHWdCeKJSxP_9TiimzORt7Q"
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        }
        catch(err){
            res.status(401);
            throw new Error("Not authorized, token failed");
        }
    }
    if(!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});
module.exports = {protected};