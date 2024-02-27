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

//get my job
export const getMyJobsFunc = async (req, res) => {
  try {
    const myjobs = await jobModel.find({ postedBy: req.user._id });
    res.status(200).json({
      success: true,
      myjobs,
    });
  } catch (error) {
    console.log(`some error while trying to get my job ${error}`);
  }
};

//Update  job
export const updateJobFunc = async (req, res) => {
  try {
    //get role
    const { role } = req.user; //is't comming from auth folder for getting only role
    if (role === "Job_Seeker") {
      res.status(400).send({
        success: false,
        message: "Job seeker can't update a job",
      });
    }
    //get id from parms
    const { id } = req.params;
    console.log(id);
    let job = await jobModel.findById(id);
    if (!job) {
      res.status(404).json({
        success: false,
        message: "oops job not found",
      });
    }
    //job update
    job = await jobModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json({
      success: true,
      message: "job updated successfully",
      job,
    });
  } catch (error) {
    console.log(`some error while trying to update my job ${error}`);
  }
};

//delete job
export const deleteJobFunc = async (req, res) => {
  try {
    //get role
    const { role } = req.user; //is't comming from auth folder for getting only role
    if (role === "Job_Seeker") {
      res.status(400).send({
        success: false,
        message: "Job seeker can't update a job",
      });
    }
    //get id from parms
    const { id } = req.params;
    console.log(id);
    let job = await jobModel.findById(id);
    if (!job) {
      res.status(404).json({
        success: false,
        message: "oops job not found",
      });
    }
    //delete job
    await jobModel.deleteOne();
    res.status(200).json({
      success: true,
      message: "job deleted successfully",
    });
  } catch (error) {
    console.log(`some error while trying to delete my job ${error}`);
  }
};
