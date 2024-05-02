import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../StateData";
import { useContext } from "react";
import Resume from "./Resume";
const MyApplication = () => {
    const [applications, setApplications] = useState([]);
    //states for resume model
    const [openModel, setOpenModel] = useState(false);
    const [resumeUrl, setResumeUrl] = useState("");

    //get token from localstorage
    const ltoken = localStorage.getItem("token");

    //uset context
    const { isAuthorized, user } = useContext(Context);

    useEffect(() => {
        //get all aplications from api
        const getAllApplications = async () => {
            try {
                if (user.role === "Job_Seeker") {
                    await axios
                        .get(
                            "/api/v1/application/job_seeker/get_applicatons",
                            {
                                headers: {
                                    Authorization: `Bearer ${ltoken}`,
                                },
                            }
                        )
                        .then((res) => {
                            setApplications(res.data.application);
                        })
                        .catch((err) => {
                            toast.error(err);
                        });
                } else {
                    if (user.role === "Employer") {
                        await axios
                            .get(
                                "/api/v1/application/employer/get_applicatons",
                                {
                                    headers: {
                                        Authorization: `Bearer ${ltoken}`,
                                    },
                                }
                            )
                            .then((res) => {
                                setApplications(res.data.application);
                            })
                            .catch((err) => {
                                toast.error(err);
                            });
                    }
                }
            } catch (error) {
                toast.error(error);
            }
        };
        //function call
        getAllApplications();
    }, [isAuthorized]);

    //handle application delete function
    const handleDeleteApplication = async (id) => {
        try {
            const response = await axios.delete(
                `/api/v1/application/job_seeker/delete_job_application/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${ltoken}`,
                    },
                }
            );
            toast.success(response.data.message);
            setApplications((preApplications) =>
                preApplications.filter((newApplications) => newApplications._id !== id)
            );
        } catch (error) {
            toast.error(error.message);
        }
    };

    //open model functions
    const openModelFunc = (url) => {
        setResumeUrl(url)
        setOpenModel(true);
    }

    //open model functions
    const closeModelFunc = () => {
        setOpenModel(false);
    }
    return (
        <div className="container-div ">
            <h1 className="text-center font-bold text-gray-800  py-6 ">
                MY APPLICATIONS
            </h1>
            <section>
                {applications.length === 0 ? (
                    <p className="text-red-500 text-center">There is no applications</p>
                ) : (
                    applications &&
                    applications.map((element, index) => (
                        <>
                            <div
                                className="application-div sm:flex justify-around px-8 py-4"
                                key={index}
                            >
                                <div className="data-div">
                                    <div className="flex">
                                        <span className="font-bold">Name : </span>
                                        <p>{element.name}</p>
                                    </div>
                                    <div className="flex">
                                        <span className="font-bold">Email : </span>
                                        <p>{element.email}</p>
                                    </div>
                                    <div className="flex">
                                        <span className="font-bold">Phone : </span>
                                        <p>{element.phone}</p>
                                    </div>
                                    <div className="flex">
                                        <span className="font-bold">Address : </span>
                                        <p>{element.address}</p>
                                    </div>
                                    <div className="flex">
                                        <span className="font-bold">Cover Letter : </span>
                                        <p>{element.coverLetter}</p>
                                    </div>
                                </div>
                                <div className="img-div">
                                    <img
                                        className="w-[90px]"
                                        src={element.resume.url}
                                        alt="resume"
                                        onClick={() => openModelFunc(element.resume.url)}
                                    />
                                </div>
                                {user.role === "Job_Seeker" ? (
                                    <div className="button-div ">
                                        <button
                                            onClick={() => handleDeleteApplication(element._id)}
                                            className="bg-red-700 m-auto text-white py-2 px-3 mt-11 rounded-lg"
                                        >
                                            Delete Application
                                        </button>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <hr className="my-2 text-black w-[80%] mx-auto" />
                        </>
                    ))
                )}
                {//if open model is true then it will run 
                    openModel && <Resume closeModelFunc={closeModelFunc} resumeUrl={resumeUrl} />
                }
            </section>
        </div>
    );
};

export default MyApplication;
