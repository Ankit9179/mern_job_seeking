import React from 'react';

function HeroSection() {
    const cardData = [1, 2, 3, 4, 5];

    return (
        <>
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 m-4">
                        <p className="text-gray-700">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At quidem praesentium laborum aliquam rem sit accusantium est beatae laudantium tempora aspernatur, cumque repellat repudiandae illum soluta adipisci minima corporis dolorem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, ex!
                        </p>
                    </div>
                    <div className="w-full md:w-1/2 m-4">
                        <img src="hero.gif" alt="hero image" className="max-w-full mx-auto md:ml-0" />
                    </div>
                </div>
                <div className="flex flex-wrap justify-between w-full">
                    {cardData.map((i) => (
                        <div key={i} className="bg-gray-400 p-4 rounded-md m-2 hover:bg-gray-500">
                            <span>cart: {i}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default HeroSection;
