import React, { useContext, useState } from 'react'
import './CommonLoginRegister.css'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Context } from '../../StateData'



const Login = () => {
    //usestate for storing value for form input  data 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("")

    //use context 
    const { isAuthorized, setIsAuthorized } = useContext(Context)

    //use navigate to navigation to home page
    const navigate = useNavigate()


    ////handleSubmit function
    const handleSubmit = async (e) => {
        e.preventDefault()
        let FormData = { email, password, role }
        try {
            const response = await axios.post("http://localhost:8080/api/v1/user/login", FormData, {
                headers: { "Content-Type": "application/json" }
            })
            toast.success(`${response.data.message}`) //
            setIsAuthorized(true)
            //redirect to login page
            navigate('/')
        } catch (error) {
            toast.error(`${error.response.data.message}`)
        }
    }
    //check autorize
    if (isAuthorized) {
        return <Navigate to={'/'} />
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
                            <select name="role" value={role} required onChange={(e) => setRole(e.target.value)}>
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