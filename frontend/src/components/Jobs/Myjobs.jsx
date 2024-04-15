import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Context } from '../../StateData'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'

const Myjobs = () => {
    //use usestates
    const [Jobs, setJobs] = useState([]);
    //use context 
    const { isAuthorized, user } = useContext(Context);
    const [editingMode, setEditingMode] = useState(null);

    //get token from localstorage 
    const ltoken = localStorage.getItem("token")


    // creating navigate variable 
    const navigate = useNavigate();

    // use useEffect 
    useEffect(() => {
        //featch my job
        const featchMyJobsData = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/job/my_jobs",
                    { headers: { Authorization: `Bearer ${ltoken}` } }
                )
                setJobs(response.data.myjobs)
            } catch (error) {
                toast.error(response.data.message)
                setJobs("")

            }
        }
        featchMyJobsData()
    }, [])

    console.log(Jobs)
    // use isAuthorized with navigate variable
    if (!isAuthorized || user && user.role !== "Employer") {
        navigate('/')
    }

    //function for Enable editing mode
    const handleEnableEditingMode = (jobId) => {
        setEditingMode(jobId); //inserting job id which your are apdating
    }

    //function for disable editing mode
    const handleDisableEditingMode = () => {
        setEditingMode(null);
    }

    //function for updateting job , NOTE - Jobs state variable containe multiple jobs in the form of array thats why we'r using array find method here. 
    const handleUpdateMyjob = async (jobId) => {
        const updatedJob = Jobs.find((fdJob) => fdJob._id === jobId);
        await axios.put(`http://localhost:8080/api/v1/job/update_job/${jobId}`, updatedJob, { headers: { Authorization: `Bearer ${ltoken}` } }
        ).then((res) => {
            toast.success(res.data.message)
            setEditingMode(null);
        }).catch((err) => {
            toast.error(err.response.data.message) /////////////////////////////////// it would be through the error
        })
    }

    //handle Delete function
    const handleDeleteMyjob = async (jobId) => {
        await axios.delete(`http://localhost:8080/api/v1/job/delete_job/${jobId}`, { headers: { Authorization: `Bearer ${ltoken}` } }
        ).then((res) => {
            toast.success(res.data.message)
            setJobs((prevJob) => prevJob.filter((fltJob) => fltJob._id === jobId));
        }).catch((err) => {
            toast.error(err.response.data.message) /////////////////////////////////// it would be through the error
        })
    }

    //handle in change///////////////////////////////////////////////
    const handleInputChange = (jobId, field, value) => {
        setJobs((prevJob) =>
            prevJob.map((chJob) =>
                chJob._id === jobId ? { ...chJob, [field]: value } : chJob
            ))
    }
    return (
        <>
            {
                Jobs.length > 0 ? (
                    <>
                        <h1 className='text-center font-extrabold text-2xl my-4'>YOUR POSTED JOBS</h1>
                        <div className='main-conainer'>
                            {
                                Jobs && Jobs.map((element) => (
                                    <>
                                        <div className='container w-full flex justify-around ' key={element._id}>
                                            <div className='div1'>
                                                <span className='text-[20px] block font-bold pt-2'>Title:</span>
                                                <input className='underline-offset-8 pb-2' type="text" disabled={editingMode !== element._id ? true : false} value={element.title} onChange={(e) => handleInputChange(element._id, "title", e.target.value)} />
                                                <span className='text-[20px] block font-bold pt-2'>Country:</span>
                                                <input className='underline-offset-8 pb-2' type="text" disabled={editingMode !== element._id ? true : false} value={element.country} onChange={(e) => handleInputChange(element._id, "country", e.target.value)} />
                                                <span className='text-[20px] block font-bold pt-2'>City:</span>
                                                <input className='underline-offset-8 pb-2' type="text" disabled={editingMode !== element._id ? true : false} value={element.city} onChange={(e) => handleInputChange(element._id, "city", e.target.value)} />
                                                <span className='text-[20px] block font-bold pt-2'>Category:</span>
                                                <input className='underline-offset-8 pb-2' type="text" disabled={editingMode !== element._id ? true : false} value={element.category} onChange={(e) => handleInputChange(element._id, "category", e.target.value)} />
                                                <span className='text-[20px] font-bold block pt-2'>Salary:</span>
                                                {
                                                    element.fixedSalary ? (
                                                        <input className='underline-offset-8 pb-2' type="number" disabled={editingMode !== element._id ? true : false} value={element.fixedSalary} onChange={(e) => handleInputChange(element._id, "fixedSalary", e.target.value)} />
                                                    ) : (
                                                        <div className='flex'>
                                                            <input className='underline-offset-8 pb-2' type="number" disabled={editingMode !== element._id ? true : false} value={element.salaryFrom} onChange={(e) => handleInputChange(element._id, "salaryFrom", e.target.value)} />
                                                            <input className='underline-offset-8 pb-2' type="number" disabled={editingMode !== element._id ? true : false} value={element.salaryTo} onChange={(e) => handleInputChange(element._id, "salaryTo", e.target.value)} />
                                                        </div>
                                                    )
                                                }

                                                <span className='text-[20px] font-bold block pt-2'>Expire:</span>
                                                <select
                                                    value={element.expire}
                                                    disabled={editingMode !== element._id ? true : false}
                                                    onChange={(e) =>
                                                        handleInputChange(element._id, "expire", e.target.value)}
                                                ><option ></option>
                                                    <option value={true}>TRUE</option>
                                                    <option value={false}>FALSE</option>
                                                </select>
                                            </div>
                                            <div className='div2'>
                                                <span className='text-[20px] font-bold block pt-2'>Description:</span>
                                                <input className='underline-offset-8 pb-2' type="text" disabled={editingMode !== element._id ? true : false} value={element.description} onChange={(e) => handleInputChange(element._id, "description", e.target.value)} />
                                                <span className='text-[20px] font-bold block pt-2'>Location:</span>
                                                <textarea className='underline-offset-8 pb-2 overflow-visible w-96' type="text" disabled={editingMode !== element._id ? true : false} value={element.location} onChange={(e) => handleInputChange(element._id, "location", e.target.value)} />
                                            </div>

                                            <div className='div3'>
                                                {
                                                    editingMode === element._id ? (
                                                        <>
                                                            <button className=' bg-green-500 text-white p-2 m-3 px-9 rounded-md' onClick={() => handleUpdateMyjob(element._id)}><FaCheck /></button>
                                                            <button className=' bg-red-500 text-white p-2 m-3 px-9 rounded-md' onClick={() => handleDisableEditingMode(element._id)}><RxCross2 /></button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className=' bg-blue-500 text-white p-2 m-3 px-9 rounded-md' onClick={() => handleEnableEditingMode(element._id)}>Edit</button>
                                                            <button className=' bg-red-500 text-white p-2 m-3 px-9 rounded-md' onClick={() => handleDeleteMyjob(element._id)}>Delete</button>
                                                        </>
                                                    )

                                                }
                                            </div>
                                        </div>
                                        <hr className='mb-12 mt-7 w-[85%] mx-auto border-t border-black' />
                                    </>
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <p className='text-center m-10 text-red-700 font-mono'>There is no job , either you deleted all job or you did not create any job.</p>
                )
            }

        </>
    )
}

export default Myjobs