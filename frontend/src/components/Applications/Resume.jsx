import React from 'react'
import { AiOutlineClose } from "react-icons/ai";

const Resume = ({ closeModelFunc, resumeUrl }) => {
    return (
        <>
            <div className='h-[80%] w-[80%] my-8 absolute top-7 left-28 sm:left-60'>
                <span className='text-2xl font-extrabold text-red-500   '><AiOutlineClose onClick={closeModelFunc} /></span>
                <img className='w-[70%]' src={resumeUrl} alt="resume" />
            </div>
        </>
    )
}

export default Resume