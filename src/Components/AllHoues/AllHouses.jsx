import React, { useState, useEffect } from 'react'
import './AllHouses.scss'
import { Link } from 'react-router-dom'
import Navbar from '../Navabar/Navbar'
import SellNow from '../SellNow/SellNow'
import { useNavigate } from 'react-router-dom'
import { Radio, Select } from 'antd';


const AllHouses = () => {

  const api_base = process.env.REACT_APP_API_URL
  //const api_base = 'https://real-estate-backend-yuae.onrender.com'

  const navigate = useNavigate()

  const [copy, setcopy] = useState([])
  const [placement, setPlacement] = useState('')
  const placementChange = async (e) => {

    setHouseData(copy)

    if (e === "clear") {
      setHouseData(copy)
      setPlacement('')
    } else {
      const filteredData = copy.filter((item) => {
        return item.bhk === e.target.value;
      });
      setHouseData(filteredData);
      setPlacement(e.target.value)
    }



  };


  const [houseData, setHouseData] = useState([])


  const fetchData = async () => {
    console.log("function called")
    const response = await fetch(api_base + "/getallhouses", {
      headers: {
        Authorization: (JSON.parse(localStorage.getItem('user'))).token
      }
    });
    const data = await response.json();

    setHouseData(data);
    setcopy(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {

    if (!localStorage.getItem('user', { replace: true })) {
      navigate('/signinup', { replace: true })
    }

  }, [])

  useEffect(() => {
    window.addEventListener('beforeunload', window.scrollTo(0, 0))

    return () => {
      window.removeEventListener('beforeunload', window.scrollTo(0, 0))
    }
  }, [])


  return (
    <>
      <Navbar bs={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} selected={'houses'} bg='white' txtCol={'black'} hoverClass={'LightHover'} />

      <div className="allhouses_container">
        <h1>Houses</h1>
        <div className='bhk'>

          {
            placement !== '' && <div onClick={() => { placementChange("clear") }} >
              <img className='bhkclose' src="/images/cancel.png" alt="" />
            </div>
          }

          <Radio.Group onChange={placementChange} value={placement}>
            <Radio.Button value="1">1 BHK</Radio.Button>
            <Radio.Button value="2">2 BHK</Radio.Button>
            <Radio.Button value="3">3 BHK</Radio.Button>
            <Radio.Button value="3+">3+ BHK</Radio.Button>
          </Radio.Group>
          <br />
          <br />

        </div>
        <div className="cards-container">
          { houseData.length ? 
            houseData.map((obj) => {
              return <Link to={`house/${obj._id}`}>
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

            }) : <p>No Houses</p>
          }



        </div>
      </div>

      <SellNow hidenavbar={true} />
    </>

  )
}

export default AllHouses