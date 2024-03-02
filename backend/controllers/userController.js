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
      res.status(400).send({
        success: false,
        message: "provide email password & role",
      });
    }
    //verify email
    const user = await userModel.findOne({ email: email }).select("+password");
    console.log(user);
    if (!user) {
      res.status(400).send({
        success: false,
        message: "provide valid email",
      });
    }
    //compare password
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
      res.status(400).send({
        success: false,
        message: "your password not matched",
      });
    }
    //check role
    if (user.role !== role) {
      res.status(400).send({
        success: false,
        message: "user not found with this role",
      });
    }
    //generate token
    const token = await user.geJwtToken();
    //save token in cookie and send
    res.cookie("jwtToken", token, {
      expires: new Date(Date.now() + 25892000000), //valid for 1 month
      httpOnly: true,
    });
    res.status(200).send({
      success: true,
      message: "user logdin",
    });
  } catch (error) {
    console.log(`error while login function ${error}`);
  }
};

//user logout
export const userLogout = (req, res, next) => {
  res
    .status(201)
    .cookie("jwtToken", "", { httpOnly: true, expires: new Date(Date.now()) })
    .json({
      success: false,
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
