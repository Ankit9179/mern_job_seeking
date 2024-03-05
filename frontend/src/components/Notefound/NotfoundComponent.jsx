import React from 'react'
import { Link } from 'react-router-dom'
import '../Notefound/notefound.css'
const NotfoundComponent = () => {
    return (
        <>
            <section className='section'>
                <div className='section_div'>
                    <img src="https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png" alt='notefound' />
                    <Link to="/">GO TO HOME</Link>
                </div>
            </section>
        </>
    )
}

export default NotfoundComponent