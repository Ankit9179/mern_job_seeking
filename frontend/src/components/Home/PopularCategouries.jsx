import React from 'react';

function PopularCategories() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Popular Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Technology</h2>
                    <p>Explore the latest tech jobs from software development to IT support.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Mern Stack</h2>
                    <p>The MERN stack, an acronym for MongoDB, Express.js, React.js, and Node.js, represents a powerful combination of technologies for building modern web applications.</p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg hover:bg-blue-100">
                    <h2 className="text-xl font-semibold mb-4">Design</h2>
                    <p>Unleash your creativity in graphic design, UI/UX, and more.</p>
                </div>
            </div>
        </div>
    );
}

export default PopularCategories;

