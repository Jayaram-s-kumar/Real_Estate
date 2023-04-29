import React from 'react'
import './Carpage.scss'
import { useState, useEffect } from 'react';
import FsLightbox from "fslightbox-react";
import Navbar from '../Navabar/Navbar';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Carpage() {
    const [toggler, setToggler] = useState(false);
    const [data, setData] = useState({})

    const { carID } = useParams()

    useEffect(() => {
        fetchData()
    }, [])

    const navigate = useNavigate()

    useEffect(() => {
     
        if(!localStorage.getItem('user')){
          navigate('/signinup')
        }
       
      }, [])


   // const api_base = 'http://localhost:3001'
    const api_base = 'https://real-estate-backend-yuae.onrender.com'

    const fetchData = async () => {
        const response = await fetch(api_base + `/getcardata/${carID}`)

        const data = await response.json()

        setData(data)

        console.log(data)

    }

    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="carpage_container">
                <div className="topsection">
                    <p>{data.title}</p>
                    <p>Rs: {data.price}</p>
                </div>
                <div className="image_section">
                    <div className="large_image">
                        <img src={data.image1Link} alt="" />
                    </div>
                    <div className="two_small">
                        <>
                            <FsLightbox
                                toggler={toggler}
                                sources={[
                                    `${data.image1Link}`,
                                    `${data.image2Link}`,
                                    `${data.image3Link}`,
                                    `${data.image4Link}`,
                                    `${data.image5Link}`,]}
                            />
                        </>
                        <div className="first">
                            <img src={data.image2Link} alt="" />
                        </div>
                        <div className="second">
                            <p onClick={() => {
                                setToggler(!toggler)
                            }}>+2 more</p>
                            <div className="image_overlay" onClick={() => {
                                setToggler(!toggler)
                            }}></div>
                            <img src={data.image3Link} alt="" />
                        </div>
                    </div>

                </div>


                <div className="location">
                    <div>
                        <img src="/images/location.png" alt="" />
                        <p>{data.location}</p>
                    </div>
                    <p>{data.carbrand} </p>
                </div>



                <div className="features">
                    <div className="icons_container">
                        <div className="owner">
                            <div>
                                <img src="/images/employee.png" alt="" />

                            </div>
                            <div>
                                <p>owner</p>
                                <p>{data.noofowners}</p>
                            </div>

                        </div>
                        <div className="year">
                            <div>
                                <img src="/images/calendar.png" alt="" />
                            </div>
                            <div>
                                <p>Model</p>
                                <p>{data.year}</p>
                            </div>
                        </div>
                        <div className="kmdriven">
                            <div>
                                <img src="/images/dashboard.png" alt="" />
                            </div>
                            <div>
                                <p>{data.kmdriven} km</p>
                            </div>
                        </div>
                        <div className="fuel">
                            <div>
                                <img src="/images/gas-station.png" alt="" />
                            </div>
                            <div>
                                <p>Fuel</p>
                                <p>{data.fueltype}</p>
                            </div>
                        </div>
                        <div className="transmission">
                            <div>
                                <img src="/images/gearbox.png" alt="" />
                            </div>
                            <div>
                                <p>{data.transmission}</p>
                            </div>
                        </div>


                    </div>
                </div>

                <div className="image_section">
                    <div className="mobileimages">
                        <div>
                            <img src={data.image2Link} alt="" />
                        </div>
                        <div>
                            <img src={data.image3Link} alt="" />
                        </div>
                        <div>
                            <img src={data.image4Link} alt="" />
                        </div>
                        <div>
                            <img src={data.image5Link} alt="" />
                        </div>
                    </div>
                </div>

                <div className="description">
                    <h3>Description</h3>

                    <p>{data.description}</p>

                </div>

                <div className="contact">
                    <h3>Contact</h3>

                    <div>
                        <div className="telephone">
                            <div className='icon'>
                                <img src="/images/telephone.png" alt="" />
                            </div>

                            <div className='number'>
                                <p>{data.phone}</p>
                            </div>
                        </div>

                        <div className="callbutton">
                            <a href={`tel:${data.phone}`}>
                                <button>
                                    <p>Call Now</p>
                                </button>
                            </a>
                        </div>

                    </div>
                </div>

                <div className="address">
                    <h3>Address</h3>
                    <div>
                        <img src="/images/location.png" alt="" />
                        <p>{data.address}</p>
                    </div>
                </div>




            </div>
        </>
    )
}

export default Carpage