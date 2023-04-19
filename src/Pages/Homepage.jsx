import React from 'react'
import HeroSection from '../Components/HeroComp/HeroSection'
import Houses from '../Components/Houses/Houses'
import Navbar from '../Components/Navabar/Navbar'
import About from '../Components/About/About'
import Apartments from '../Components/Apartments/Apartments'


const Homepage = () => {
  return (
    <div>
        <HeroSection bgContent={'/images/bgVideo.mp4'} />
        <About/>
        <Houses/>
        <Apartments/>
    </div>
  )
}

export default Homepage