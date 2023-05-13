import React from 'react'
import './HeroSection.scss'
// import '../Navabar/Navbar.scss'
import Navbar from '../Navabar/Navbar'
import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'



const HeroSection = ({ heroBottomStyle, closeMobLogin }) => {


    return (


        <>

            <Navbar bg='#020586' bs={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} txtCol={'white'} hoverClass={'DarkHover'} />
            <div className={'container'}>
                {/* <div className="mobile_overlay" >

                </div> */}
               
                <div className="hero"   >
                    <div className="hero-text">
                        <h1>Nest Homes</h1>
                        <p>Rev Your Engines and Find Your Dream Home: The Ultimate Car and Real Estate Marketplace!</p>

                        
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
                    <div className="heroimage" >
                       <img src="/images/mobilehouse.jpg" alt="" />
                    </div>

                </div>

                <div className="herobottom" style={heroBottomStyle}>
                    <div className="image">
                        

                            <img src="/images/dreamcar.jpg" alt="" />
                       
                            <p>Discover your dream home in our carefully curated selection of stunning houses</p>
                       
                    </div>


                    <div className="image">
                       
                                <img src="/images/dreamhome1.avif" alt="" />
                                <p>Find your dream ride with our selection of cars</p>
                       
                    </div>
                 

                </div>

            </div>
        </>

    )
}

export default HeroSection