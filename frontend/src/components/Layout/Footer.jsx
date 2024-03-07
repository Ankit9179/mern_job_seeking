import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <>
            <div className="fcontainer">
                <div className="footer">
                    <div className="left">
                        <ul>
                            <li>home</li>
                            <li>about</li>
                            <li>contact</li>
                            <li>doc.</li>
                        </ul>
                    </div>
                    <div className="right">
                        <Link to='https://www.linkedin.com/in/ankit-rahi-563752258/'>
                            <FaLinkedin />
                        </Link>
                        <Link to="https://github.com/Ankit9179">
                            <FaGithub />
                        </Link>
                        <Link to="https://www.instagram.com/ak_vampire12/?next=%2F">
                            <FaInstagramSquare />
                        </Link>
                    </div>
                </div>
                <p>Copyright &copy; 2024 created by ANKIT</p>
            </div>
        </>
    )
}

export default Footer