import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../StateData';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobConponent = () => {
    const [allJobs, setAllJobs] = useState([]);
    const { isAuthorized } = useContext(Context);

    // Fetching all jobs from API 
    useEffect(() => {
        async function fetchAllJobsFunc() {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/job/all_jobs");
                const jobs = response.data;
                setAllJobs(jobs);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllJobsFunc();
    }, [isAuthorized]);

    return (
        <>
            <div className="bg-gray-400 h-3/4 py-6">
                <h1 className="text-center text-2xl font-bold pb-3">All Jobs</h1>
                <div className=" flex justify-around text-center flex-wrap">
                    {allJobs.jobs && allJobs.jobs.map((element) => (
                        <div key={element._id} className="bg-gray-200 border mb-10  border-gray-400 w-3/5 sm:w-2/5 rounded p-4 hover:shadow-lg">
                            <h3 className="text-lg font-bold">{element.title}</h3>
                            <p>{element.description}</p>
                            <Link to={`/job/single/${element._id}`} className="bg-blue-500 text-white px-4 mt-2 rounded ">JOB DETAILS</Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default JobConponent;
