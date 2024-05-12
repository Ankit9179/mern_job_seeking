import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="fcontainer bg-gray-900 text-white py-5">
            <div className="flex footer  justify-around items-center">
                <div className="left">
                    <div className="flex">
                        <a className="mr-1 md:mr-4">home</a>
                        <a className="mr-1 md:mr-4">about</a>
                        <a className=" mr-1 md:mr-4 btn btn-hire" href="https://api.whatsapp.com/send?phone=7828092738" target="blank">contact</a>
                        <Link className='mr-1 md:mr-4'> doc.</Link>
                    </div>
                </div>
                <div className="right flex gap-6 text-2xl">
                    <Link to='https://www.linkedin.com/in/ankit-rahi-563752258/' className="mr-4 hover:bg-yellow-500 ">
                        <FaLinkedin />
                    </Link>
                    <Link to="https://github.com/Ankit9179" className="mr-4  hover:bg-yellow-500">
                        <FaGithub />
                    </Link>
                    <Link to="https://www.instagram.com/ak_vampire12/?next=%2F" className='  hover:bg-yellow-500'>
                        <FaInstagramSquare />
                    </Link>
                </div>
            </div>
            <p className="text-center mt-5">Copyright &copy; 2024 created by ANKIT</p>
        </div>
    );
};

export default Footer;
