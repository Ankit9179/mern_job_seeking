import mongoose from "mongoose";
import validator from "validator"; // for email validation

const applicationSchema = new mongoose.Schema({
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
  coverLetter: {
    type: String,
    required: [true, "cover letter is nessary"],
  },
  phone: {
    type: String,
    required: [true, "please provide your phone nubmer"],
  },
  address: {
    type: String,
    required: [true, "please provide your address"],
  },
  resume: {
    public_id: {
      type: String,
      required: [true, "please provide your resume"],
    },
    url: {
      type: String,
      required: [true, "please provide your url"],
    },
  },
  applicantId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: [true, "please provide your applicant obj id"],
    },
    role: {
      type: String,
      enum: ["Job_Seeker"],
      required: [true, "please provide your role"],
    },
  },
  employerId: {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: [true, "please provide employer obj id"],
    },
    role: {
      type: String,
      enum: ["Employer"],
      required: [true, "please provide your role"],
    },
  },
});

//create model
export const applicationModel = mongoose.model(
  "Application",
  applicationSchema
);
