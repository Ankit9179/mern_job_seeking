import React, { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'



const Register = () => {
    //usestate for storing value for form input  data 
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    //use navigate to navigation to login page
    const navigate = useNavigate()


    ////handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault()
        let FormData = { name, email, password, phone, role }
        try {
            const response = await axios.post("http://localhost:8080/api/v1/user/register", FormData)
            toast.success(`${response.data.message}`) //
            //redirect to login page
            navigate('/login')
        } catch (error) {
            toast.error(`${error.response.data.message}`)
        }
    }

    return (
        <>
            <div className="register_container w-full mt-6 mb-6 max-w-md mx-auto p-4 border border-gray-300 rounded-lg bg-gray-100">
                <h4 className="text-center mb-4 text-lg font-semibold">Registration Form</h4>
                <div className="form mb-4">
                    <form onSubmit={handleSubmit}>
                        <label className="block mb-2">
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Email:
                            <input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Password:
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            />
                        </label>
                        <label className="block mb-2">
                            Phone:
                            <input
                                type="text"
                                name="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            />
                        </label>
                        <label className="block mb-2">Your Role:
                            <select
                                name="role"
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="w-full px-3 py-2 border rounded-md border-gray-300"
                            >
                                <option></option>
                                <option value="Job_Seeker">Job Seeker</option>
                                <option value="Employer">Employer</option>
                            </select>
                        </label>
                        <Link to={'/login'} className="block text-center mb-3 text-blue-500 hover:text-red-500">Already a user? Login here</Link>
                        <button className="w-full px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700" type="submit">REGISTER</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register