// import React, { useContext, useEffect } from 'react'
// import { Context } from './StateData' //state data 
// import toast, { Toaster } from 'react-hot-toast'
// import axios from 'axios'
// import { BrowserRouter as Router, Routes, Route, Navigate, } from 'react-router-dom'
// //imports all components
// import Login from './components/Auth/Login'
// import Register from './components/Auth/Register'
// import Application from './components/Applications/Application'
// import MyApplication from './components/Applications/MyApplication'
// import JobDetails from './components/Jobs/JobDetails'
// import Home from './components/Home/HomeComponent'
// import JobConponent from './components/Jobs/JobConponent'
// import Myjobs from './components/Jobs/Myjobs'
// import PostJobs from './components/Jobs/PostJobs'
// import Footer from './components/Layout/Footer'
// import Navbar from './components/Layout/Navbar'
// import NoteFound from './components/Notefound/NotfoundComponent'
// import Cookie from "js-cookie"

// const App = () => {

//   //state data use 
//   const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context)
//   if (user) {
//     // fetchin user with useEffect 
//     useEffect(() => {
//       const fetchUser = async () => {
//         try {
//           const response = await axios.get("/api/v1/user/user", {
//             withCredentials: true
//           })
//           toast.success(response.data.message)
//           setIsAuthorized(true)
//         } catch (error) {
//           toast.error(error.response.data.message)
//           setIsAuthorized(false)
//         }
//       }
//       fetchUser();
//       // toast.error("Not a user please login first")
//     }, [isAuthorized]);
//   } else {
//     toast.error("there is no token")
//   }

//   return (
//     <>
//       <Router>
//         <Navbar />
//         <Routes>
//           <Route path='/' element={<Home />} />
//           <Route path='/login' element={<Login />} />
//           <Route path='/register' element={<Register />} />
//           <Route path='/job/getall' element={<JobConponent />} />
//           <Route path='/job/post' element={<PostJobs />} />
//           <Route path='/job/my' element={<Myjobs />} />
//           <Route path='/job/single/:id' element={<JobDetails />} />
//           <Route path='/application/:id' element={<Application />} />
//           <Route path='/application/my' element={<MyApplication />} />
//           <Route path='*' element={<NoteFound />} />
//         </Routes>
//         <Footer />
//         <Toaster />
//       </Router>
//     </>
//   )
// }

// export default App



import React, { useContext, useEffect } from 'react';
import { Context } from './StateData'; // Import state data context
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Import components
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Application from './components/Applications/Application';
import MyApplication from './components/Applications/MyApplication';
import JobDetails from './components/Jobs/JobDetails';
import Home from './components/Home/HomeComponent';
import JobConponent from './components/Jobs/JobConponent';
import Myjobs from './components/Jobs/Myjobs';
import PostJobs from './components/Jobs/PostJobs';
import Footer from './components/Layout/Footer';
import Navbar from './components/Layout/Navbar';
import NoteFound from './components/Notefound/NotfoundComponent';
import Cookie from 'js-cookie';

const App = () => {
  const { isAuthorized, setIsAuthorized, setUser, user } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/v1/user/user", {
          withCredentials: true
        });
        toast.success(response.data.message);
        setIsAuthorized(true);
      } catch (error) {
        toast.error(error.response.data.message);
        setIsAuthorized(false);
      }
    };

    if (user) {
      fetchUser();
    } else {
      toast.error("There is no token");
    }
  }, [isAuthorized, setIsAuthorized, user]);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/job/getall' element={<JobConponent />} />
          <Route path='/job/post' element={<PostJobs />} />
          <Route path='/job/my' element={<Myjobs />} />
          <Route path='/job/single/:id' element={<JobDetails />} />
          <Route path='/application/:id' element={<Application />} />
          <Route path='/application/my' element={<MyApplication />} />
          <Route path='*' element={<NoteFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  );
};

export default App;

