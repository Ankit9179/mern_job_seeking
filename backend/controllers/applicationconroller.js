import { applicationModel } from "../model/applicationSchema.js";

//geting all application for employer
export const getAllEmployerApplicatonsFunc = async (req, res) => {
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
//geting all application for job seeker
export const getAllJobSeekerApplicatonsFunc = async (req, res) => {
  try {
    //geting role of user
    const { role } = req.user;
    if (role === "Employer") {
      res.status(400).send({
        success: false,
        message: "Employer can't use this functionality",
      });
    }
    //geting user id of user
    const { _id } = req.user;
    const application = await applicationModel.find({ applicantId: _id });
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
