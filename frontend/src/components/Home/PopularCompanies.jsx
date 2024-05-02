import React from 'react';

const PopularCompanies = () => {
    return (
        <>
            <h1 className='text-black text-2xl m-5 text-center font-extrabold'>POPULAR COMPANIES</h1>
            <div className=" p-6 flex justify-around">
                <div className="bg-gray-600 w-2/5 p-6 border-2 border-black rounded-lg">
                    <h1 className="text-white text-center text-2xl font-bold">Microsoft</h1>
                    <p className="text-white">Microsoft is a multinational technology company known for its software products like Windows, Office Suite, and Azure cloud services. With a focus on innovation and creativity, Microsoft offers a wide range of career opportunities for professionals in various fields.</p>
                </div>
                <div className="bg-gray-600 w-2/5 p-6 border-2 border-black rounded-lg">
                    <h1 className="text-white text-center text-2xl font-bold">Apple</h1>
                    <p className="text-white">Apple Inc. is a leading technology company renowned for its iconic products such as the iPhone, iPad, and Mac computers. Known for its commitment to design, quality, and user experience, Apple provides exciting career prospects for individuals passionate about technology and innovation.</p>
                </div>
            </div>
        </>
    )
}

export default PopularCompanies;

