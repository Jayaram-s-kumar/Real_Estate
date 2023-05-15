import React from 'react'
import HeroSection from '../Components/HeroComp/HeroSection'
import Houses from '../Components/Houses/Houses'
import About from '../Components/About/About'
import Apartments from '../Components/Apartments/Apartments'
import SellNow from '../Components/SellNow/SellNow'
import Cars from '../Components/Cars/Cars'
import { useEffect } from 'react'

const Homepage = () => {
  useEffect(() => {
    window.addEventListener('beforeunload',window.scrollTo(0,0))
  
    return () => {
      window.removeEventListener('beforeunload',window.scrollTo(0,0))
    }
  }, [])
  
  return (
    <div>
        <HeroSection bgContent={'/images/bgVideo.mp4'} />
        <SellNow hidenavbar={true}/>
        <Houses/>
        <Apartments/>
        <Cars/>
        <About/>
    </div>
  )
}

export default Homepage