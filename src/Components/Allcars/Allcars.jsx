import React from 'react'
import './Allcars.scss'
import Navbar from '../Navabar/Navbar'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SellNow from '../SellNow/SellNow'
import { useNavigate } from 'react-router-dom'


const Allcars = () => {

    const [carData, setCarData] = useState([])

    const navigate = useNavigate()

    //const api_base = 'http://localhost:3001'
     const api_base = 'https://real-estate-backend-yuae.onrender.com'

    const fetchData = async () => {
        console.log("function called")
        const response = await fetch(api_base + "/getallcars");
        const data = await response.json();
        setCarData(data);
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
     
        if(!localStorage.getItem('user')){
          navigate('/signinup')
        }
       
      }, [])

    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />       
            <div className="allcarcontainer">
            <h1>Cars</h1>
                <div className="cards_container">
                    {
                        carData.map((obj) => {
                            return <Link to={`car/${obj._id}`}>
                                <div className="card">
                                    <div className="cardimage">
                                        <img src={obj.image1Link} alt="" />
                                    </div>
                                    <div className="details">
                                        <p className="title">{obj.title}</p>
                                        <p className="price">Rs {obj.price}</p>
                                        <p className="year">{obj.year} model , {obj.kmdriven} km</p>

                                    </div>
                                </div>
                            </Link>


                        })
                    }
                </div>
            </div>
            <SellNow/>
        </>
    )
}

export default Allcars