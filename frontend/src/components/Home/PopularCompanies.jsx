import React from 'react';

const PopularCompanies = () => {
    return (
        <>
            <h1 className='text-black text-2xl m-5 text-center font-extrabold'>POPULAR COMPANIES</h1>
            <div className=" p-6 flex justify-around">
                <div className="bg-gray-600 w-2/5 p-6 border-2 border-black rounded-lg">
                    <h1 className="text-white text-center text-2xl font-bold">MicroSoft</h1>
                    <p className="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet nulla laboriosam modi eos veniam sapiente exercitationem, odit quidem t, repellendus.</p>
                </div>
                <div className="bg-gray-600 w-2/5 p-6 border-2 border-black rounded-lg">
                    <h1 className="text-white text-center text-2xl font-bold">Apple</h1>
                    <p className="text-white">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet nulla laboriosam modi eos veniam sapiente exercitationem, odit quidem t, repellendus.</p>
                </div>
            </div>
        </>
    )
}

export default PopularCompanies;
