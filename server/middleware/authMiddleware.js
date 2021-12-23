import jwt from "jsonwebtoken";
import AsyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect =  AsyncHandler(async(req, res, next) => {
    let token;
    const authorization = req.headers.authorization; 

    if(authorization && authorization.startsWith("Bearer")) {
       try {
        token = authorization.split(" ")[1]; 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        // return user info, excluding password
        req.user = await User.findById(decoded.id).select("-password");
        
        next();
    }catch(error) {
        res.status(401);
        console.log(error);
        throw new Error("Unauthorized. Token failed");
       }
    } 

    if(!token){
        res.status(401);
        throw new Error ("Unauthorized");
    }

})
export default protect;