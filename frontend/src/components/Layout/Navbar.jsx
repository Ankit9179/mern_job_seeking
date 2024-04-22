import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Context } from '../../StateData';
import axios from 'axios';
import toast from 'react-hot-toast';

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/api/v1/user/logout", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log(response);
            if (response.data.success === true) {
                toast.success(response.data.message);
                setIsAuthorized(false);
                localStorage.removeItem("token");
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(true);
        }
    };

    return (
        <div className="container bg-gray-900">
            <div className="nav w-full flex justify-between items-center px-4 py-2">
                <img className="nav_logo h-16" src="https://t3.ftcdn.net/jpg/03/69/72/20/360_F_369722049_bbw8XbPujH5bm5nxlYpRXcKz0DKmLC2m.jpg" alt="nav logo" />
                {
                    isAuthorized ? user.role === "Job_Seeker" ? <ul className="flex text-1xl text-white font-mono ">
                        <li className="mr-4 ">
                            <Link to='/'>HOME</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="/job/getall">AllJobs</Link>
                        </li>
                        <li className="mr-4">
                            <Link to="/applications">Application</Link>
                        </li>

                        <li>
                            <Link onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul> :
                        <ul className="flex text-1xl text-white font-mono ">
                            <li className="mr-4 ">
                                <Link to='/'>HOME</Link>
                            </li>
                            <li className="mr-4">
                                <Link to="/job/getall">AllJobs</Link>
                            </li>
                            <li className="mr-4">
                                <Link to="/applications">Applications</Link>
                            </li>
                            <li className="mr-4">
                                <Link to="/job/post">PostJob</Link>
                            </li>
                            <li className="mr-4">
                                <Link to="/job/my">ViewJob</Link>
                            </li>
                            <li>
                                <Link onClick={handleLogout}>Logout</Link>
                            </li>
                        </ul> :
                        <ul className="flex text-white ">
                            <li className="mr-4 hover:text-red-600">
                                <Link to="/login">LOGIN</Link>
                            </li>
                            <li className="hover:text-red-600">
                                <Link to="/register">REGISTER</Link>
                            </li>
                        </ul>
                }
            </div>
        </div>
    );
};

export default Navbar;