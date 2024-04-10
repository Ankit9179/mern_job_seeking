import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../StateData';
import axios from 'axios';

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
                <div className="flex justify-around text-center">
                    {allJobs.jobs && allJobs.jobs.map((e) => (
                        <div key={e._id} className="bg-gray-200 border border-gray-400 w-2/5 rounded p-4 hover:shadow-lg">
                            <h3 className="text-lg font-bold">{e.title}</h3>
                            <p>{e.discription}</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded mt-2">JOB DETAILS</button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default JobConponent;
