import { userModel } from "../model/userSchema.js";
//register user
export const userRegister = async (req, res) => {
  try {
    const { name, email, phone, role, password } = req.body;
    if (!name || !email || !phone || !role || !password) {
      return res.status(500).send({
        success: false,
        message: "please fill all fields",
      });
    }
    const isEmail = await userModel.findOne({ email: req.body.email });
    if (isEmail) {
      return res.status(500).send({
        success: false,
        message: "email already present in db",
      });
    }
    const user = await userModel.create({
      name,
      email,
      phone,
      role,
      password,
    });
    res.status(200).json({
      success: true,
      message: "user register successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Register conroller ${error.message}`,
    });
  }
};

///user login
export const userLogin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(404).send({
        success: false,
        message: "user logged in successfully",
      });
    }
    //verify email
    const user = await userModel.findOne({ email: email }).select("+password");
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "please provide valid email",
      });
    }
    //compare password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      return res.status(400).send({
        success: false,
        message: "your password not matched",
      });
    }
    //check role
    if (user.role !== role) {
      return res.status(400).send({
        success: false,
        message: "user not found with this role",
      });
    }
    // generate token
    const token = await user.geJwtToken();
    //save token in cookie and send
    res.cookie("token", token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true, //,prevent xss attacts cors site scripting attacks, accessable on http not with javasctrip,
      sameSite: "strict", //csrf attacts cors site request frogery attacts
      secure: true, // Ensures cookie is only sent over HTTPS
    });
    res.send({
      success: true,
      message: "user logdin successfully",
    });
  } catch (error) {
    console.error(`Error while login function: ${error}`);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

//user logout
export const userLogout = (req, res) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "user logout successfuly",
    });
};

//get user
export const getUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(`error while i am trying to get user`);
  }
};
