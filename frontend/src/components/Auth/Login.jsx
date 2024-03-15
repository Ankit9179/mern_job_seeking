import React, { useState } from 'react'
import './CommonLoginRegister.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'



const Login = () => {
    //usestate for storing value for form input  data 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    //use navigate to navigation to home page
    const navigate = useNavigate()


    ////handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault()
        let FormData = { email, password, role }
        try {
            const response = await axios.post("http://localhost:8080/api/v1/user/login", FormData)
            toast.success(`${response.data.message}`) //
            console.log(response)
            //redirect to login page
            navigate('/')
        } catch (error) {
            toast.error(`${error.response.data.message}`)
        }
    }

    return (
        <>
            <div className="register_container">
                <h4>Login Form</h4>
                <div className="form">
                    <form onSubmit={handleSubmit}>

                        <label>
                            Email :
                            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </label>
                        <label>
                            Password :
                            <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </label>

                        <label>Your Role :
                            <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option></option>
                                <option value="Job_Seeker">Job Seeker</option>
                                <option value="Employer">Employer</option>
                            </select>
                        </label>
                        <Link to={'/register'}>Not a user register here</Link>
                        <button>LOGIN</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login