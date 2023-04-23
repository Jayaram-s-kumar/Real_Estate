import React, { useState, useEffect } from 'react'
import './AllHouses.scss'
import { Link } from 'react-router-dom'
import Navbar from '../Navabar/Navbar'

const AllHouses = () => {

    const api_base = 'http://localhost:3001'

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

    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />

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
                                <div className="description">
                                  <p>{obj.description}</p>
                                </div>
                              </div>
                            </div>
                          </Link>
                  
                          })
                    }



                </div>
            </div>
        </>

    )
}

export default AllHouses