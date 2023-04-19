import React from 'react'
import './Gallery.scss'
import HeroSection from '../Components/HeroComp/HeroSection'
import Navbar from '../Components/Navabar/Navbar'

const Gallery = () => {
    return (
        <>
            <HeroSection heroBottomStyle={{ display: 'none' }} />
            <div className="gallery_container">
                <h1>Gallery</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorem, doloremque possimus soluta vero unde facere quo amet!</p>
                <div className="photos">
                    <img src="/images/gallery1.jpg" alt="" />
                    <img src="/images/gallery2.jpg" alt="" />
                    <img src="/images/gallery3.jpg" alt="" />
                    <img src="/images/gallery4.jpg" alt="" />
                    <img src="/images/gallery5.jpg" alt="" />
                    <img src="/images/gallery6.jpg" alt="" />
                    <img src="/images/gallery7.jpg" alt="" />
                    <img src="/images/heroimage1.jpg" alt="" />
                    <img src="/images/heroimage2.jpg" alt="" />
                </div>
            </div>
        </>
    )
}

export default Gallery