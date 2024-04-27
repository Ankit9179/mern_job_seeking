import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MyApplication = () => {
    const [applications, setApplications] = useState([])
    //get token from localstorage
    const ltoken = localStorage.getItem("token");
    useEffect(() => {
        //get all aplications from api
        const getAllApplications = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/v1/application/job_seeker/get_applicatons",
                    {
                        headers: {
                            'Authorization': `Bearer ${ltoken}`
                        }
                    }
                )
                console.log(response)
            } catch (error) {

            }
        }
        //function call
        getAllApplications();
    }, [])
    return (
        <div className='container-div h-[80vh]'>
            <h1 className='text-center font-bold text-gray-800  py-6 '>MY APPLICATIONS</h1>
            <section>
                {
                    applications.length === 0 ? (
                        <p className='text-red-500 text-center'>There is no applications</p>
                    ) : (
                        <div className='application-div sm:flex justify-around px-8 py-4'>
                            <div className='data-div'>
                                <div className='flex'>
                                    <span className="font-bold" >Name : </span>
                                    <p> ankit</p>
                                </div>
                                <div className='flex'>
                                    <span className="font-bold" >Email : </span>
                                    <p> ankit</p>
                                </div>
                                <div className='flex'>
                                    <span className="font-bold" >Phone : </span>
                                    <p> ankit</p>
                                </div>
                                <div className='flex'>
                                    <span className="font-bold" >Address : </span>
                                    <p> ankit</p>
                                </div>
                                <div className='flex'>
                                    <span className="font-bold" >Cover Letter : </span>
                                    <p> ankit</p>
                                </div>
                            </div>
                            <div className='img-div'>
                                <img className='w-[90px]' src="https://www.jobseeker.com/api/media/documents/48d5e977-d429-4c57-b5b8-6394df3c5e84/Resume-example-Vertical.1693324156611.svg" alt="resume" />
                            </div>
                            <div className='button-div'>
                                <button className='bg-red-700 m-auto text-white py-2 px-3 mt-11 rounded-lg'>Delete Application</button>
                            </div>
                        </div>
                    )
                }

            </section>
            <hr className='my-2 text-black w-[80%] mx-auto' />
        </div>
    )
}

export default MyApplication