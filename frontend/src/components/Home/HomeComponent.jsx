import React, { useContext } from 'react'
import { Context } from '../../StateData'
import { Navigate } from 'react-router-dom'
import HeroSection from './HeroSection.jsx'
import HowItsWorks from './HowItsWorks.jsx'
import PopularCategouries from './PopularCategouries.jsx'
import PopularCompanies from './PopularCompanies.jsx'

const HomeComponent = () => {
    //use context 
    const { isAuthorized } = useContext(Context)
    if (!isAuthorized) {
        return <Navigate to={'/login'} />
    }
    return (
        <>
            <section>
                <HeroSection />
                <HowItsWorks />
                <PopularCategouries />
                <PopularCompanies />
            </section>
        </>
    )
}

export default HomeComponent