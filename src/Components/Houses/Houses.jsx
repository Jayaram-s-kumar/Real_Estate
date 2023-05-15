import React, { useEffect, useState, Component } from 'react'
import './Houses.scss'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
//import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
//
import { Carousel } from 'react-responsive-carousel';
const Houses = () => {

  const navigate = useNavigate()

  const [isActive, setIsActive] = useState(false);
  const [houseData, setHouseData] = useState([])

  const handleClick = () => {
    setIsActive(!isActive);
  };



  const api_base = 'http://localhost:3001'
  //const api_base = 'https://real-estate-backend-yuae.onrender.com'


  const fetchData = async () => {
    const response = await fetch(api_base + "/first3houses");
    const data = await response.json();

    setHouseData(data);
  }

  useEffect(() => {
    fetchData()
  }, [])




  return (
    <div className="House-container" id='houses'>
      <h1>Houses</h1>
      <div className="cards-container">

        
          {
            houseData.map((obj) => {
              return <Link to={`house/${obj._id}`} key={obj._id}>
                <div className="card">
                  <div className="card-image">
                    <img src={obj.image1Link} alt="" />
                  </div>
                  <div className="card-details">
                    <p className="place">{obj.propName}</p>
                    <p className="price"><span>Price Rs.</span>&nbsp;{obj.price}</p>
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


      <Link to={'/allhouses'}>
        <button className="loadmore">
          <p>Load More</p>
        </button>
      </Link>

    </div>
  )
}

export default Houses