import { jobModel } from "../model/jobSchema.js";

//get all job controller
export const getAllJobFunc = async (req, res, next) => {
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
