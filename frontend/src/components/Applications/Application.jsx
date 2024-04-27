import React, { useContext, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../StateData'
import toast from 'react-hot-toast';
import axios from 'axios';

const Application = () => {
    // State for form values
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [resume, setResume] = useState(null)

    //use contex
    const { isAuthorized, user } = useContext(Context)

    //use navigate 
    const navigate = useNavigate();

    //getting id from url ,this id is job id 
    const { id } = useParams()

    //getting token 
    const ltoken = localStorage.getItem("token")



    //handle file change func
    const handleFileChangeFunc = (event) => {
        const resume = event.target.files[0]
        setResume(resume)
    }

    //submit data to backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("address", address);
        formData.append("coverLetter", coverLetter);
        formData.append("resume", resume);
        formData.append("jobId", id);

        //send data to api
        try {
            const response = await axios.post("http://localhost:8080/api/v1/application/job_seeker/create_application", formData, { headers: { Authorization: `Bearer ${ltoken}` } })
            toast.success(response.data.message)
            navigate('/job/getall')
            console.log(response)
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <div className='container flex justify-center items-center my-3 h-full'>
            <div className="form-div bg-green-400 w-full max-w-md p-8 rounded-lg shadow-lg">
                <h1 className='text-center font-extrabold text-2xl mb-6'>APPLY FOR JOB</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='font-semibold block'>Name:</label>
                        <input className='p-2 border rounded-md w-full' type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='font-semibold block'>Email:</label>
                        <input className='p-2 border rounded-md w-full' type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='font-semibold block'>Cover Letter:</label>
                        <textarea className='p-2 border rounded-md w-full' placeholder='Enter your cover letter' value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='font-semibold block'>Phone:</label>
                        <input className='p-2 border rounded-md w-full' type="tel" placeholder='Enter your phone number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='font-semibold block'>Address:</label>
                        <input className='p-2 border rounded-md w-full' type="text" placeholder='Enter your address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className='mb-4'>
                        <label className='font-semibold block'>Resume:</label>
                        <input className='p-2 border rounded-md w-full' type="file" accept=".pdf,.png,.jpg" onChange={handleFileChangeFunc} />
                    </div>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>SUBMIT</button>
                </form>
            </div>
        </div>
    );
};

export default Application;
