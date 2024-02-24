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
