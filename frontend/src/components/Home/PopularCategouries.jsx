import React from 'react'
import './Popular.css'

const PopularCategouries = () => {
    const num = [1, 2, 3, 4, 5, 6];
    return (
        <>
            <div className='popular-card-contienr'>
                {
                    num.map((i) => {
                        return (
                            <div class="popular-card">
                                <div class="popular-card-body">
                                    <h5 class="popular-card-title">Card title{i}</h5>
                                    <p class="popular-card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                                    <a href="#" class="popular-btn">Go somewhere</a>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default PopularCategouries