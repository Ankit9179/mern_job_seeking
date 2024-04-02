import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../StateData'
import axios from 'axios'
import './jobComponents.css'

const JobConponent = () => {
    const [allJobs, setAllJobs] = useState([])
    const { isAuthorized } = useContext(Context)

    //fetching all lobs from api 
    useEffect(() => {
        async function fetchAllJobsFunc() {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/job/all_jobs");
                const jobs = response.data;
                setAllJobs(jobs)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllJobsFunc()
    }, [isAuthorized])
    console.log(allJobs.jobs)
    return (
        <>
            <div className="alljob-container">
                <h1>All Jobs</h1>
                <div className="alljjob-content-container">
                    {
                        allJobs.jobs && allJobs.jobs.map((e) => {
                            return (
                                <div className="alljob-content" key={e._id}>
                                    <h3>{e.title}</h3>
                                    <span>{e.discription}</span>
                                    <button>Job Details</button>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </>
    )
}

export default JobConponent

