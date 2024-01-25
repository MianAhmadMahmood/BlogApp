import jwt from "jsonwebtoken";
import authModel from "../model/authmodel.js";

const checkIsUserAuthenticated = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      
      token = authorization.split(" ")[1];
      // Verify token
      const { userID } = jwt.verify(token, "Ahmad");
      // Get user from the token
      req.user = await authModel.findById(userID).select("-password"); 
      next();
    } catch (error) {
      return res.status(401).json({ message: "unAuthorized User" });
    }
  } else {
    return res.status(401).json({ message: "unAuthorized User" });
  }
};

export default checkIsUserAuthenticated;
