
import React from 'react';
import { Link } from 'react-router-dom';

const NotfoundComponent = () => {
    return (
        <section className='section flex justify-center items-center h-screen'>
            <div className='section_div text-center'>
                <img src="https://learn.getgrav.org/user/pages/11.troubleshooting/01.page-not-found/error-404.png" alt='notefound' className='max-w-full h-auto' />
                <Link to="/" className='inline-block mt-8 px-4 py-2 bg-blue-500 text-white rounded-md text-center text-sm hover:bg-blue-700 transition duration-300 ease-in-out'>GO TO HOME</Link>
            </div>
        </section>
    );
};

export default NotfoundComponent;
