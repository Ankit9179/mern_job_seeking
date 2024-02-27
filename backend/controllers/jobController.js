import { jobModel } from "../model/jobSchema.js";
import { userModel } from "../model/userSchema.js";

//get all job controller
export const getAllJobFunc = async (req, res) => {
  try {
    const jobs = await jobModel.find({ expired: false });
    res.status(200).json({
      success: true,
      jobs,
    });
  } catch (error) {
    console.log(`some error while trying to get all job controller ${error}`);
  }
};

//create job controller
export const createJobFunc = async (req, res) => {
  try {
    const { role } = req.user; //is't comming from auth folder for getting only role
    if (role === "Job_Seeker") {
      res.status(400).send({
        success: false,
        message: "Job seeker can't create a job",
      });
    }
    //getting all fields
    const {
      title,
      discription,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body;
    if (!title || !discription || !category || !country || !city || !location) {
      res.status(400).send({
        success: false,
        message: "please provide all full details",
      });
    }
    //salary check
    if ((!salaryTo || !salaryFrom) && !fixedSalary) {
      res.status(400).send({
        success: false,
        message: "please either provide fixed salary or ranged salary",
      });
    }
    if (salaryTo && salaryFrom && fixedSalary) {
      res.status(400).send({
        success: false,
        message: "please 1 either provide fixed salary or ranged salary!",
      });
    }
    //created variable and store employe in this var
    const postedBy = req.user._id;
    //save job in database with this variable (postedBy)
    const job = await jobModel.create({
      title,
      discription,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
    });
    res.status(201).json({
      success: true,
      message: "job created successfully!",
      job,
    });
  } catch (error) {
    console.log(`some error occured while creating post ${error}`);
  }
};
