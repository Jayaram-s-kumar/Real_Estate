import React from 'react'
import './About.scss'

const About = () => {
    return (
        <div className="about-container" id='about'>
            <div className="about-details">
                <p>ABOUT </p>
                <h3>Dream Home and Car Sales</h3>
                <p>Welcome to Wheels & Walls, where we bring together the world of real estate and automobiles, providing a one-stop platform for all your buying and selling needs.</p>
            </div>
            <div className="about-image">
                <div className="large_image">
                    <img src="/images/nature_house.jpg" alt="" />
                </div>
                <div className="small-image">
                    <img src="/images/whitecar.jpg" alt="" />
                </div>
            </div>
        </div>
    )
}

export default About