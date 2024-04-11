import React, { useContext, useState } from 'react'
import { Context } from '../../StateData'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


const PostJobs = () => {
    // use useContext 
    const { isAuthorized, user } = useContext(Context)

    //use navigate to navigation to home page
    const navigate = useNavigate();

    //useStates 
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [location, setLocation] = useState("")
    const [salaryFrom, setSalaryFrom] = useState("")
    const [salaryTo, setSalaryTo] = useState("")
    const [fixedSalary, setFixedSalary] = useState("")
    const [salaryType, setSalaryType] = useState("default")

    //get token from localstorage
    const ltoken = localStorage.getItem("token")

    //handle submit 
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            if (salaryType === "fixedSalary") {
                setSalaryFrom("")
                setSalaryTo("")
            } else if (salaryType === "rangedSalary") {
                setFixedSalary("")
            } else {
                setSalaryFrom("")
                setSalaryTo("")
                setFixedSalary("")
            }
            //send data to backend
            const response = await axios.post("http://localhost:8080/api/v1/job/job_create",
                fixedSalary.length >= 4 ? {
                    title,
                    description,
                    category,
                    city,
                    country,
                    location,
                    fixedSalary,
                } : {
                    title,
                    description,
                    category,
                    city,
                    country,
                    location,
                    salaryFrom,
                    salaryTo
                },
                { headers: { Authorization: `Bearer ${ltoken}` } }
            )
            toast.success(response.data.message)
            navigate("/")
        } catch (error) {
            toast.error(`${error.response.data.message}`)
        }

        //check autorize
        if (isAuthorized || user && user.role !== "Employer") {
            navigate('/')
        }
    }
    return (
        <>
            <div className="register_container w-full mt-6 mb-6 max-w-md mx-auto p-4 border border-gray-300 rounded-lg bg-gray-100">
                <h4 className="text-center mb-4 text-lg font-bold">CREATE NEW JOB</h4>
                <div className="form mb-4">
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">
                            Title:
                            <input
                                type="text"
                                name="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            />
                        </label>
                        <label className="block mb-2 my-3">
                            Category:
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Select Category</option>
                                <option value="Mobaile App Delelopment" className="w-full px-3 py-2 border rounded-md border-gray-300">Mobaile App Delelopment</option>
                                <option value="Web App Delelopment" className="w-full px-3 py-2 border rounded-md border-gray-300">Web App Delelopment</option>
                                <option value="MERN Stack Delelopment" className="w-full px-3 py-2 border rounded-md border-gray-300">MERN Stack Delelopment</option>
                                <option value="MEAN Stack Delelopment" className="w-full px-3 py-2 border rounded-md border-gray-300">MEAN Stack Delelopment</option>
                                <option value="Artificial Intelligence" className="w-full px-3 py-2 border rounded-md border-gray-300">Artificial Intelligence</option>
                                <option value="Graphics & designer" className="w-full px-3 py-2 border rounded-md border-gray-300">Graphics & designer</option>
                            </select>
                        </label>
                        <label className="block mb-2">
                            Country:
                            <input
                                type="text"
                                name="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            />
                        </label>
                        <label className="block mb-2">
                            City:
                            <input
                                type="text"
                                name="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Location:
                            <input
                                type="text"
                                name="location"
                                placeholder='Enter atleast 30 caracter'
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Salary Type:
                            <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)}>
                                <option value="default">Select Salary Type</option>
                                <option value="fixedSalary" className="w-full px-3 py-2 border rounded-md border-gray-300">Fixed Salary</option>
                                <option value="rangedSalary" className="w-full px-3 py-2 border rounded-md border-gray-300">Ranged Salary</option>
                            </select>
                        </label>
                        <div>
                            {
                                salaryType === "default" ? (
                                    <p className='my-3'>Please provide salary *</p>
                                ) : salaryType === "fixedSalary" ? (
                                    <input
                                        type="number"
                                        name="fixedSalary"
                                        value={fixedSalary}
                                        placeholder='Enter Fixed Salary'
                                        onChange={(e) => setFixedSalary(e.target.value)}
                                        className="w-full px-3 py-2 my-3 border rounded-md border-gray-300"
                                    />
                                ) : (
                                    <label className="block mb-2">
                                        <input
                                            type="number"
                                            name="salaryFrom"
                                            value={salaryFrom}
                                            placeholder='Salary from'
                                            onChange={(e) => setSalaryFrom(e.target.value)}
                                            className="w-full px-3 py-2 my-3 border rounded-md border-gray-300"
                                        />
                                        <input
                                            type="number"
                                            name="salaryTo"
                                            value={salaryTo}
                                            placeholder='Salary To'
                                            onChange={(e) => setSalaryTo(e.target.value)}
                                            className="w-full px-3 py-2 my-3 border rounded-md border-gray-300"
                                        />
                                    </label>
                                )
                            }
                        </div>
                        <label className="block mb-2">
                            Description:
                            <textarea
                                type="text"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            />
                        </label>
                        <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" type="submit">POST JOB</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PostJobs