import { applicationModel } from "../model/applicationSchema.js";
import cloudinary from "cloudinary";
import { jobModel } from "../model/jobSchema.js";

//create application
export const createApplicationFunc = async (req, res) => {
  try {
    //geting role of user
    const { role } = req.user;
    if (role === "Employer") {
      res.status(400).send({
        success: false,
        message: "Employer can't  create application",
      });
    }
    // chek file from req for resume
    if (!req.files || Object.keys(req.files) === 0) {
      res.status(400).send({
        success: false,
        message: "please provide resume",
      });
    }
    //geting resume form
    const { resume } = req.files;
    console.log(resume);
    const allFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allFormats.includes(resume.mimetype)) {
      res.status(400).send({
        success: false,
        message: "please provide your resume in a .png , .jpg or .webp formate",
      });
      return;
    }
    //req for cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(
      resume.tempFilePath
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      res.status(500).send({
        success: false,
        message:
          "some error occurd, trying to cloudinary response resume upload",
      });
    }
    //get some fields  || jobId for cheking job know expireing date for job
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    if (!jobId) {
      res.status(404).send({
        success: false,
        message: "job not found",
      });
    }
    //gettting applicant id
    const applicantId = {
      user: req.user._id,
      role: "Job_Seeker",
    };
    //getting job
    const jobInfo = await jobModel.findById(jobId);
    if (!jobInfo) {
      res.status(400).send({
        success: false,
        message: "some error occurd, trying to jobinfo",
      });
    }
    //getting employer id
    const employerId = {
      user: jobInfo.postedBy,
      role: "Employer",
    };
    if (
      !name ||
      !email ||
      !coverLetter ||
      !phone ||
      !address ||
      !applicantId ||
      !employerId ||
      !resume
    ) {
      res.status(400).send({
        success: false,
        message: "all fields are required",
      });
    }
    //create post
    const application = await applicationModel.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantId,
      employerId,
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });
    res.status(201).send({
      success: true,
      message: "application successfully created",
      application,
    });
  } catch (error) {
    console.log(
      `some error getting while trying to creating a applicationnn ${error}`
    );
  }
};

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
    console.log(_id);
    const application = await applicationModel.find({ employerId: _id });
    res.status(200).json({
      success: true,
      application,
    });
  } catch (error) {
    console.log(
      `some error while you are trying to get All application from conntroller ${error}`
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
    const application = await applicationModel.find({
      "applicantId.user": _id,
    });
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
