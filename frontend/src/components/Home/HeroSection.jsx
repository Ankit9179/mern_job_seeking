import React from 'react'
import './Hero.css'
function HeroSection() {
    const cardData = [1, 2, 3, 4, 5,]
    return (
        <>
            <div className="hero-container">
                <div className="hero-content">
                    <div className="hero-left">
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At quidem praesentium laborum aliquam rem sit accusantium est beatae laudantium tempora aspernatur, cumque repellat repudiandae illum soluta adipisci minima corporis dolorem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, ex!
                        </p>
                    </div>
                    <div className="hero-right">
                        <img src="hero.gif" alt="hero image" />
                    </div>
                </div>
                <div className="hero-cart">
                    {
                        cardData.map((i) => {
                            return (
                                <div className="hero-catr-container">
                                    <span>cart</span>
                                    <span> : {i}</span>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default HeroSection