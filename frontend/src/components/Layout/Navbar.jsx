import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'
import { Context } from '../../StateData'
import { useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Navbar = () => {
    //for usenavigation 
    const navigate = useNavigate()
    //isAuthorized state
    const { isAuthorized, setIsAuthorized } = useContext(Context)
    console.log(isAuthorized)
    //handle logout function 
    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/api/v1/user/logout", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            console.log(response)
            if (response.data.success === true) {
                toast.success(response.data.message)
                setIsAuthorized(false)
                localStorage.removeItem("token")
                navigate('/login')
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(true)
        }
    }

    return (
        <>
            <div className="container">
                <div className="nav">
                    <img className='nav_logo' src="https://t3.ftcdn.net/jpg/03/69/72/20/360_F_369722049_bbw8XbPujH5bm5nxlYpRXcKz0DKmLC2m.jpg" alt="nav logo" />
                    {
                        isAuthorized ?
                            <ul>
                                <li>
                                    <Link to='/'>HOME</Link>
                                </li>
                                <li>
                                    <Link to="/job/getall">ALL JOBS</Link>
                                </li>
                                <li>
                                    <Link to="/applicatoin/my">YOUR APLICATIONS</Link>
                                </li>
                                <li>
                                    <Link to="/job/post">POST NEW JOB</Link>
                                </li>
                                <li>
                                    <Link to="/job/my">VIEW YOUR JOB</Link>
                                </li>
                                <li>
                                    <Link onClick={handleLogout} >LOGOUT</Link>
                                </li>
                            </ul> :
                            <ul>
                                <li>
                                    <Link to="login">LOING</Link>
                                </li>
                                <li>
                                    <Link to="register">REGISTER</Link>
                                </li>
                            </ul>
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar