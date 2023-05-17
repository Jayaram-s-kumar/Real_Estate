import React from 'react'
import './HeroSection.scss'
// import '../Navabar/Navbar.scss'
import Navbar from '../Navabar/Navbar'
import { Link } from 'react-scroll'
import { Slide, Fade, Zoom } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'



const HeroSection = ({ heroBottomStyle, closeMobLogin }) => {




    return (


        <>

            <Navbar selected={'home'} bg='white' bs={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} txtCol={'rgb(26 27 22)'} hoverClass={'DarkHover'} login={true}/>
            <div className={'container'}>
              <div className="leftcirclecontainer">

              </div>
              <div className="rightsquarecontainer">
                
              </div>
              

                <div className="hero"   >
                    <div className="carimage">
                        <img src="/images/redcarnew.png" alt="" />
                    </div>
                    <div className="hero-text">
                        <h1> <span>W</span>heels <span className='and'>&</span> <span>W</span>alls</h1>
                        <p>Rev Your Engines and Find Your Dream Home: The Ultimate Car and Real Estate Marketplace!</p>


                        <div className="getstarted" style={heroBottomStyle}>
                            <Link
                                activeClass="active"
                                to="sellnow"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                            ><p>GET STARTED</p></Link>
                        </div>

                    </div>
                    <div className="houseimage">
                        <img src="/images/redhouse.png" alt="" />
                    </div>

                    <div className="mobileimages">
                        <img src="/images/redcarnew.png" alt="" />
                        <img src="/images/redhouse.png" alt="" />
                    </div>

                </div>



                <div className="herobottom" style={heroBottomStyle}>
                    <div className="image">

                        <img src="/images/redhouse1.png" alt="" />


                        <p>Discover your dream home in our carefully curated selection of stunning houses</p>

                    </div>


                    <div className="image">

                        <img src="/images/dreamcar.jpg" alt="" />

                        <p>Find your dream ride with our selection of cars</p>

                    </div>


                </div>

            </div>
        </>

    )
}

export default HeroSection