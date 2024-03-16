import React, { useContext, useEffect } from 'react'
import { Context } from './StateData' //state data 
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
//imports all components
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Application from './components/Applications/Application'
import MyApplication from './components/Applications/MyApplication'
import JobDetails from './components/Jobs/JobDetails'
import Home from './components/Home/HomeComponent'
import JobConponent from './components/Jobs/JobConponent'
import Myjobs from './components/Jobs/Myjobs'
import PostJobs from './components/Jobs/PostJobs'
import Footer from './components/Layout/Footer'
import Navbar from './components/Layout/Navbar'
import NoteFound from './components/Notefound/NotfoundComponent'

const App = () => {
  //state data use 
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context)

  // fetchin user with useEffect 
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/user/user")
        setUser(response.data.user)
        setIsAuthorized(true)
      } catch (error) {
        console.log(error)
        setIsAuthorized(false)
      }
    }
    fetchUser();

  }, [isAuthorized]);
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
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/applicatoin' element={<Application />} />
          <Route path='/applicatoin/my' element={<MyApplication />} />
          <Route path='*' element={<NoteFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </Router>
    </>
  )
}

export default App