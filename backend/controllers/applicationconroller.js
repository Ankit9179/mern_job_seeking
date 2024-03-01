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

//delete jobseeder application

export const deleteJobSeekerApplicationFunc = async (req, res) => {
  try {
    //geting role of user
    const { role } = req.user;
    if (role === "Employer") {
      res.status(400).send({
        success: false,
        message: "Employer can't  delete application",
      });
    }
    //getting id from frontend url
    const { id } = req.params;
    //geting application for delete
    const application = await applicationModel.findById(id);
    if (!application) {
      res.status(404).json({
        success: false,
        message: "oops user not found",
      });
    }
    //deleting application
    await application.deleteOne();
    res.status(200).json({
      success: true,
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.log(
      `some error while trying to delete job seeker application ${error}`
    );
  }
};
