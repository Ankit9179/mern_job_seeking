import React from 'react';

const PopularCategouries = () => {
    const num = [1, 2, 3, 4, 5, 6];
    return (
        <>
            <h1 className='text-black text-2xl m-5 font-extrabold text-center'>POPULAR CATEGORIES</h1>
            <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4 m-4'>
                {num.map((i) => (
                    <div key={i} className="bg-white shadow-md p-4 rounded-lg">
                        <h5 className="text-xl font-bold mb-2">Card title {i}</h5>
                        <p className="text-gray-700 mb-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-block">Go somewhere</a>
                    </div>
                ))}
            </div>
        </>
    )
}

export default PopularCategouries;
