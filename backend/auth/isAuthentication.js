import jwt from "jsonwebtoken";
import { userModel } from "../model/userSchema.js";

export const isAuthorized = async (req, res, next) => {
  try {
    //get token from cookies
    const jwtToken = req.cookies.token;
    // const token = req.headers.authorization; //get token with Bearer
    // const jwtToken = token.split(" ")[1]; // token without bearer
    if (!jwtToken) {
      return res.status(400).send({
        success: false,
        message: "please provide a token",
      });
    }
    //verify token
    const isToken = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
    req.user = await userModel.findById(isToken.id);
    next();
  } catch (error) {
    console.log(`error from isAuthorized function ${error}`);
  }
};
