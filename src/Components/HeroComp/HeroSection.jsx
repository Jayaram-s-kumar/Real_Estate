import React from 'react'
import './HeroSection.scss'
// import '../Navabar/Navbar.scss'
import Navbar from '../Navabar/Navbar'
import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'



const HeroSection = ({ heroBottomStyle, closeMobLogin }) => {


    return (


        <>

            <Navbar bg='rgba(0, 0, 0, 0.557)' bs={'0 8px 32px 0 rgba(0, 0, 0, 0.562)'} txtCol={'white'} hoverClass={'DarkHover'} />
            <div className={'container'}>
                {/* <div className="mobile_overlay" >

                </div> */}
                <video className="my-video" autoPlay loop muted>
                    <source src='https://res.cloudinary.com/dfs1badkm/video/upload/v1681911320/hocpweocjxocnr2fodks.webm' type="video/mp4" autoPlay/>
                </video>
                <div className="hero">
                    <div className="hero-text">
                        <h1>Nest Homes</h1>
                        <p>The perfect nest for every family with NestHomes</p>

                        
                        <div className="getstarted" style={heroBottomStyle}>
                            <Link
                                activeClass="active"
                                to="about"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                            ><p>GET STARTED</p></Link>
                        </div>
                    </div>

                </div>

                <div className="herobottom" style={heroBottomStyle}>
                    <div className="image">
                        <div className="image-details">
                            <h3>Houses</h3>
                            <p>Discover your dream home in our carefully curated selection of stunning houses</p>
                        </div>
                        <img src="/images/Hero1.avif" alt="" />
                        <div className="imageoverlay"></div>
                    </div>


                    <div className="image">
                        <img src="/images/car1.jpeg" alt="" />
                        <div className="imageoverlay"></div>
                        <div className="image-details">
                            <h3>Cars</h3>
                            <p>Find your dream ride with our selection of cars</p>
                        </div>
                    </div>
                    <div className="image">
                        <div className="image-details">
                            <h3>Apartments</h3>
                            <p>Experience city living at its finest in our collection of luxurious apartments</p>
                        </div>
                        <img src="images/Apartment1.jpg" alt="" />
                        <div className="imageoverlay"></div>
                    </div>

                </div>

            </div>
        </>

    )
}

export default HeroSection