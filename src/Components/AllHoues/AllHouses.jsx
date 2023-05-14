import React, { useState, useEffect } from 'react'
import './AllHouses.scss'
import { Link } from 'react-router-dom'
import Navbar from '../Navabar/Navbar'
import SellNow from '../SellNow/SellNow'
import { useNavigate } from 'react-router-dom'

const AllHouses = () => {

  //const api_base = 'http://localhost:3001'
   const api_base = 'https://real-estate-backend-yuae.onrender.com'

   const navigate = useNavigate()


    const [houseData, setHouseData] = useState([])


    const fetchData = async () => {
        console.log("function called")
        const response = await fetch(api_base + "/getallhouses");
        const data = await response.json();

        setHouseData(data);
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
            <Navbar  bs={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} selected={'houses'} bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="allhouses_container">
                <h1>Houses</h1>
                <div className="cards-container">
                    {
                         houseData.map((obj)=>{
                            return  <Link to={`house/${obj._id}`}>
                            <div className="card">
                              <div className="card-image">
                                <img src={obj.image1Link} alt="" />
                              </div>
                              <div className="card-details">
                                <p className="place">{obj.propName}</p>
                                <p className="price"><span>Price</span>&nbsp;{obj.price}</p>
                                <div className="icons">
                                  <div className="bed">
                                    <img src="/images/bed.png" alt="" />
                                    <p className="count">{obj.bedrooms}</p>
                                  </div>
                                  <div className="bath">
                                    <img src="/images/bathtub.png" alt="" />
                                    <p className="count">{obj.bathrooms}</p>
                                  </div>
                                  <div className="area">
                                    <img src="/images/measuring.png" alt="" />
                                    <p className="count">{obj.sqfeet} sq ft</p>
                                  </div>
                                </div>
                               
                              </div>
                            </div>
                          </Link>
                  
                          })
                    }



                </div>
            </div>

            <SellNow hidenavbar={true}/>
        </>

    )
}

export default AllHouses