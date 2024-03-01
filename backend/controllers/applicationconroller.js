import { applicationModel } from "../model/applicationSchema.js";

//geting all application for employer
export const getAllApplicatonsFunc = async (req, res) => {
  try {
    //geting role of user
    const { role } = req.user;
    if (role === "Job_Seeker") {
      res.status(400).send({
        success: false,
        message: "Job seeker can't update a job",
      });
    }
    //geting user id of user
    const { _id } = req.user;
    const application = await applicationModel.find({ employerId: _id });
    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.log(
      `some error while you are trying to get All jobs from conntroller ${error}`
    );
  }
};
