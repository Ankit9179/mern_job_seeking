import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../StateData';
import axios from 'axios';
import toast from 'react-hot-toast';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";



const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const [toggle, setToggle] = useState(false)

    //set toggle for navbar
    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("/api/v1/user/logout", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.data.success === true) {
                toast.success(response.data.message);
                setIsAuthorized(false);
                localStorage.removeItem("token");
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response.error.message)
            setIsAuthorized(true);
        }
    };

    return (
        <div className="bg-gray-900">
            <div className="container mx-auto px-4 py-2 flex justify-between items-center">
                <img className="h-16" src="https://t3.ftcdn.net/jpg/03/69/72/20/360_F_369722049_bbw8XbPujH5bm5nxlYpRXcKz0DKmLC2m.jpg" alt="nav logo" />
                {
                    isAuthorized ? (
                        <>
                            {!toggle ? (
                                <button className='text-white text-2xl ' onClick={handleToggle}><GiHamburgerMenu /></button>
                            ) : (
                                <button className='text-white text-2xl ' onClick={handleToggle}><RxCross2 /></button>
                            )}
                            {/** phone navbar */}
                            <ul className={`flex text-white font-mono bg-black absolute right-2 rounded-md top-20 flex-col p-3 ${!toggle && "hidden"}`}>
                                <li className="mr-4 hover:bg-blue-300 px-2 py-1 rounded-md">
                                    <Link to='/'>HOME</Link>
                                </li>
                                <li className="mr-4 hover:bg-blue-300 px-2 py-1 rounded-md">
                                    <Link to="/job/getall">AllJobs</Link>
                                </li>
                                {user.role === "Job_Seeker" ? (
                                    <li className="mr-4 hover:bg-blue-300 px-2 py-1 rounded-md">
                                        <Link to="/applicatoin/my">Applications</Link>
                                    </li>
                                ) : (
                                    <>
                                        <li className="mr-4 hover:bg-blue-300 px-2 py-1 rounded-md">
                                            <Link to="/applicatoin/my">ApplicantsApplications</Link>
                                        </li>
                                        <li className="mr-4 hover:bg-blue-300 px-2 py-1 rounded-md">
                                            <Link to="/job/post">PostJob</Link>
                                        </li>
                                        <li className="mr-4 hover:bg-blue-300 px-2 py-1 rounded-md">
                                            <Link to="/job/my">ViewJob</Link>
                                        </li>
                                    </>
                                )}
                                <li className=' hover:bg-red-300 px-2 py-1 rounded-md'>
                                    <Link onClick={handleLogout}>Logout</Link>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <ul className="flex text-white">
                            <li className="mr-4 hover:bg-blue-300 px-2 py-1 rounded-md ">
                                <Link to="/login">LOGIN</Link>
                            </li>
                            <li className="mr-4 hover:bg-green-300 px-2 py-1 rounded-md ">
                                <Link to="/register">REGISTER</Link>
                            </li>
                        </ul>
                    )
                }
            </div>
        </div>
    );
};

export default Navbar;
