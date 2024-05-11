import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../StateData';
import axios from 'axios';
import toast from 'react-hot-toast';

const JobDetails = () => {
    //use useState 
    const [singleJob, setSingleJob] = useState({});
    const jobid = useParams(); //id from link
    //use navigate 
    const navigate = useNavigate();
    const _id = jobid.id;


    // use context 
    const { isAuthorized, user } = useContext(Context)

    //get single job data 
    useEffect(() => {
        const getDataSingleJob = async () => {
            try {
                const response = await axios.get(`/api/v1/job/single_job_information/?id=${_id}`, { withCredentials: true })
                setSingleJob(response.data.job)
                if (!isAuthorized) {
                    navigate('/')
                }
            } catch (error) {
                toast.error(error.response.error.message)
            }
        }
        //call function
        getDataSingleJob()
    }, [])
    return (
        <>
            <div className='container'>
                <h1 className='text-center font-extrabold my-5 text-2xl'>JOB DETAILE</h1>
                <div className='job-container  px-20 py-5'>
                    <div className='m-3'>
                        <span className='font-bold text-[20px] text-green-900'>Title : </span>
                        <span className='ml-4'>{singleJob.title}</span>
                    </div>
                    <div className='m-3'>
                        <span className='font-bold text-[20px] text-green-900'>Category : </span>
                        <span className='ml-4'>{singleJob.category}</span>
                    </div>
                    <div className='m-3'>
                        <span className='font-bold text-[20px] text-green-900'>Country : </span>
                        <span className='ml-4'>{singleJob.country}</span>
                    </div>
                    <div className='m-3'>
                        <span className='font-bold text-[20px] text-green-900'>City : </span>
                        <span className='ml-4'>{singleJob.city}</span>
                    </div>
                    <div className='m-3'>
                        <span className='font-bold text-[20px] text-green-900'>Description : </span>
                        <span className='ml-4'>{singleJob.description}</span>
                    </div>
                    <div className='m-3'>
                        <span className='font-bold text-[20px] text-green-900'>Location : </span>
                        <span className='ml-4'>{singleJob.location}</span>
                    </div>
                    <div className='m-3'>
                        <span className='font-bold text-[20px] text-green-900'>Posted On : </span>
                        <span className='ml-4'>{singleJob.jobPostedOn}</span>
                    </div>
                    <div className='m-3'>
                        <span className='font-bold text-[20px] text-green-900'>Salary : </span>
                        {
                            singleJob.fixedSalary ? (
                                <span className='ml-4'>{singleJob.fixedSalary}</span>
                            ) : (
                                <>
                                    <span className='ml-2'>₹{singleJob.salaryFrom}</span> -
                                    <span className='ml-2'>₹{singleJob.salaryTo}</span>
                                </>
                            )
                        }
                    </div>
                    <div className='m-3'>
                        {
                            user === "Employer" ? (
                                ""
                            ) : (
                                <Link to={`/Application/${singleJob._id}`} className='bg-gray-500 py-1 px-3 hover:bg-gray-900 rounded-lg text-white'>APPLY NOW</Link>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobDetails