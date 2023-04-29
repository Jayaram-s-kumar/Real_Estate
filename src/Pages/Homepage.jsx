import React from 'react'
import HeroSection from '../Components/HeroComp/HeroSection'
import Houses from '../Components/Houses/Houses'
import About from '../Components/About/About'
import Apartments from '../Components/Apartments/Apartments'
import SellNow from '../Components/SellNow/SellNow'
import Cars from '../Components/Cars/Cars'

const Homepage = () => {
  return (
    <div>
        <HeroSection bgContent={'/images/bgVideo.mp4'} />
        <About/>
        <SellNow/>
        <Houses/>
        <Apartments/>
        <Cars/>
    </div>
  )
}

export default Homepage