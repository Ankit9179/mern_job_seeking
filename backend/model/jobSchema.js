import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is must required"],
    minlength: [3, "title must contain at least 3 characters"],
    maxlength: [50, "title can not exceed 50 characters"],
  },
  discription: {
    type: String,
    required: [true, "discription is must required"],
    minlength: [3, "title must contain at least 3 characters"],
    maxlength: [350, "title can not exceed 350 characters"],
  },
  category: {
    type: String,
    required: [true, "please provide category"],
  },
  country: {
    type: String,
    required: [true, "please provide country"],
  },
  city: {
    type: String,
    required: [true, "please provide city"],
  },
  location: {
    type: String,
    required: [true, "please provide your location"],
    minlength: [30, "job location must contain at least 30 characters"],
    select: false,
  },
  fixedSalary: {
    type: Number,
    minlength: [4, "fixed Salary must be in 4 disit"],
    maxlength: [9, "fixed Salary cannot exceed 9 disit"],
  },
  salaryFrom: {
    type: Number,
    minlength: [4, "Salaryfrom must be in 4 disit"],
    maxlength: [9, "Salaryfrom cannot exceed 9 disit"],
  },
  salaryTo: {
    type: Number,
    minlength: [4, "salaryTo must be in 4 disit"],
    maxlength: [9, "salaryTo cannot exceed 9 disit"],
  },
  expired: {
    type: Boolean,
    default: false,
  },
  jobPostedOn: {
    type: Date,
    default: Date.now(),
  },
  postedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "userModel",
  },
});

//create model
export const jobModel = mongoose.model("Job", jobSchema);
