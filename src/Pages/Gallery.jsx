import React ,{useEffect} from 'react'
import './Gallery.scss'
import HeroSection from '../Components/HeroComp/HeroSection'
import Navbar from '../Components/Navabar/Navbar'
import { useNavigate } from 'react-router-dom'

const Gallery = () => {

    const navigate = useNavigate()

    useEffect(() => {
      if(!localStorage.getItem("user")){
        navigate('/')
      }
    
    }, [])
    


    return (
        <>
            <Navbar  bs={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} selected={'gallery'} bg='white' txtCol={'black'} hoverClass={'LightHover'} />       
            <div className="gallery_container">
                <h1>Gallery</h1>
                <p>Explore our extensive gallery of premium cars and properties, each hand-picked for their quality and value, and find your dream investment today.</p>
                <div className="photos">
                    <img src="/images/gallerycar1.jpg" alt="" />
                    <img src="/images/galleryhouse1.jpg" alt="" />
                    <img src="/images/gallerycar2.avif" alt="" />
                    <img src="/images/galleryhouse2.png" alt="" />
                    <img src="/images/gallerycar3.jpg" alt="" />
                    <img src="/images/galleryhouse3.jpg" alt="" />
                    <img src="/images/gallerycar4.jpg" alt="" />
                    <img src="/images/galleryhouse4.jpg" alt="" />
                    <img src="/images/galleryhouse5.jpg" alt="" />
                </div>
            </div>
        </>
    )
}

export default Gallery