import React, { useState } from 'react'
import './Register.css'
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
            <div className="register_container">
                <h4>Registation Form</h4>
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Name :
                            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
                        </label>
                        <label>
                            Email :
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            Password :
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>
                        <label>
                            Phone :
                            <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </label>
                        <label>Your Role :
                            <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option></option>
                                <option value="Job_Seeker">Job Seeker</option>
                                <option value="Employer">Employer</option>
                            </select>
                        </label>
                        <Link to={'/login'}>already user Login here</Link>
                        <button>REGISTER</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register