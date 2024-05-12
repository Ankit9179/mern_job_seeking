import React from 'react';

function HeroSection() {
    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 p-2 bg bg-pik-200 bg-gren-300 text-center">
                        <h2 className='text-[70px] md:text-[90px] font-extrabold'>WELCOME</h2>
                        <h5 className='inline text-[55px] font-bold line-clamp-3 tracking-widest'>TO THE JOB</h5><h2 className='text-red-400 inline text-[70px] font-extrabold'>LD</h2>
                        <p>
                            Welcome to our job LD platform! Connecting job seekers with providers seamlessly. Browse jobs, post vacancies, and unlock endless possibilities for your career or business.</p>
                    </div>
                    <div className="w-full md:w-1/2 my-3">
                        <img src="hero.jpg" alt="hero image" className="max-w-full  mx-auto md:ml-0" />
                    </div>
                </div>
            </div>
        </>
    );
}

export default HeroSection;
