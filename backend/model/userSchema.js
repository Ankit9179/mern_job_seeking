import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide your name"],
    minlength: [3, "name must contain at least 3 characters"],
    maxlength: [20, "name can not exceed 20 characters"],
  },
  email: {
    type: String,
    required: [true, "please provide your email"],
    validate: [validator.isEmail, "please provide a valid email"],
  },
  phone: {
    type: Number,
    required: [true, "please provide a phone number"],
  },
  password: {
    type: String,
    required: [true, "please provide your password"],
    minlength: [8, "password must contain at least 8 characters"],
    maxlength: [32, "name can not exceed 32 characters"],
    select: false,
  },
  role: {
    type: String,
    required: [true, "please provide your role"],
    enum: ["Job_Seeker", "Employer"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//compare password function
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//generateToken function
userSchema.methods.geJwtToken = function () {
  return jwt.sign({ id: this.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

export const userModel = mongoose.model("User", userSchema);
