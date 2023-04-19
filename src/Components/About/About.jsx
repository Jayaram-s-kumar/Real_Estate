import React from 'react'
import './About.scss'

const About = () => {
    return (
        <div className="about-container" id='about'>
            <div className="about-details">
                <p>ABOUT </p>
                <h3>Nature-Inspired Living</h3>
                <p>Our company is committed to sustainable living. Our eco-friendly properties blend modern design with nature to create stylish living spaces that prioritize the environment. Experience the perfect combination of luxury and sustainability today</p>
            </div>
            <div className="about-image">
                <div className="large_image">
                    <img src="/images/nature_house.jpg" alt="" />
                </div>
                <div className="small-image">
                    <img src="/images/nature_small.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default About