import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
    //is loggedin
    const [user, serUser] = useState(false)
    return (
        <>
            <div className="container">
                <div className="nav">
                    <img className='nav_logo' src="https://t3.ftcdn.net/jpg/03/69/72/20/360_F_369722049_bbw8XbPujH5bm5nxlYpRXcKz0DKmLC2m.jpg" alt="nav logo" />
                    {
                        user ?
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
                                    <Link>LOGOUT</Link>
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