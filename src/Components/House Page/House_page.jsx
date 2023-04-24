import React, { useState, useEffect } from 'react'
import './House_page.scss'
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import {DatePicker} from '@mui/material/DatePicker'
// import {CAccordionCollapse} from '@coreui/react'
//import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FsLightbox from "fslightbox-react";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from '../Navabar/Navbar';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const House_page = () => {

  const { houseID } = useParams()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handlesubmit(e) {
    //e.preventDefault()
    const form = e.target;
    const formData = new FormData();
    formData.name = name
    formData.email = email
    formData.phone = phone
    formData.message = message
    formData.propName = houseData.propName
    formData.ownerEmail = JSON.parse(localStorage.getItem('user')).email
    await (await fetch(api_base + "/sendinforeq", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })).json()
    setMessage('')
    setName('')
    setPhone('')
    setEmail('')
  }


  const [houseData, setHouseData] = useState([])

  //const api_base = 'http://localhost:3001'
  const api_base = 'https://real-estate-backend-yuae.onrender.com'


  const fetchData = async () => {
    console.log("function called")
    const response = await fetch(api_base + `/getPropData/${houseID}`);
    const data = await response.json();
    console.log(data)
    setHouseData(data);
  }

  useEffect(() => {
    fetchData()
  }, [])


  const date = new Date()
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [toggler, setToggler] = useState(false);
  const [video, setVideo] = useState(false)
  const [inperson, setInperson] = useState(false)

  const timeOptions = [
    { value: '10:00', label: '10:00 AM' },
    { value: '10:30', label: '10:30 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '11:30', label: '11:30 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '12:30', label: '12:30 PM' },
    { value: '1:00', label: '1:00 PM' },
    { value: '1:30', label: '1:30 PM' },
    { value: '2:00', label: '2:00 PM' },
    { value: '2:30', label: '2:30 PM' },
    { value: '3:00', label: '3:00 PM' },
    { value: '3:30', label: '3:30 PM' },
    { value: '4:00', label: '4:00 PM' },
    { value: '4:00', label: '4:30 PM' },
    { value: '5:00', label: '5:00 PM' },
  ];

  const [selectedTimeOption, setSelectedTimeOption] = useState(timeOptions[0]);






  return (

    <>
      <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />
      <div className="Housepage_container">
        <div className="topsection">

          <div className="address">
            <h2>{houseData.propName}</h2>
            <div>
              <img src="/images/location.png" alt="" />
              <p>{houseData.city}</p>
            </div>
          </div>

          <div className="details">
            <h2><span>Price </span>Rs {houseData.price}</h2>
            <div className="area">
              <img src="/images/measuring.png" alt="" />
              <p>{houseData.sqfeet} sq feet</p>
            </div>
          </div>

        </div>

        <div className="image_section">
          <div className="large_image">
            <img src={houseData.image1Link} alt="" />
          </div>
          <div className="two_small">
            <>
              <FsLightbox
                toggler={toggler}
                sources={[
                  `${houseData.image1Link}`,
                  `${houseData.image2Link}`,
                  `${houseData.image3Link}`,
                  `${houseData.image4Link}`,
                  `${houseData.image5Link}`,
                ]}
              />
            </>


            <div className="first">
              <img src={houseData.image2Link} alt="" />
            </div>
            <div className="second">
              <p onClick={() => {
                setToggler(!toggler)
              }}>+2 more</p>
              <div className="image_overlay" onClick={() => {
                setToggler(!toggler)
              }}></div>
              <img src={houseData.image3Link} alt="" />
            </div>



          </div>
        </div>


        <div className="icons_section">
          <div className="bedroom">
            <div className="icons">
              <img src="/images/bed.png" alt="" />
              <p>{houseData.bedrooms}</p>
            </div>
            <p>Bedroom</p>
          </div>

          <div className="bathroom">
            <div className="icons">
              <img src="/images/bathtub.png" alt="" />
              <p>{houseData.bathrooms}</p>
            </div>
            <p>Bathroom</p>
          </div>

          <div className="garage">
            <div className="icons">
              <img src="/images/area.png" alt="" />
              <p>{houseData.lotsize} m²</p>
            </div>
            <p>Lot Size </p>
          </div>

          <div className="area">
            <div className="icons">
              <img src="/images/measuring.png" alt="" />
              <p style={{ color: 'white' }}>0</p>
            </div>
            <p>{houseData.sqfeet} sqfeet</p>
          </div>

          <div className="calendar">
            <div className="icons">
              <img src="/images/calendar.png" alt="" />
              <p style={{ marginLeft: '10px' }}>{houseData.year}</p>
            </div>
            <p>Year built</p>
          </div>



        </div>

        <div className="description">

          <h3>Description</h3>
          <p>{houseData.description}</p>

        </div>


        <div className="documents_container">
          <h3>Property Documents</h3>
          <div className='documents'>
            <div>
              <div>
                <img src="/images/document.png" alt="" />
                <p>Document 1</p>
              </div>

              <a href={houseData.doc1Link} target='_blank'>Download</a>
            </div>

            <div>
              <div>
                <img src="/images/document.png" alt="" />
                <p>Document 2</p>
              </div>

              <a href={houseData.doc1Link}  target='_blank'>Download</a>
            </div>


          </div>
        </div>


        <div className="details_section">
          <h3>Details</h3>
          <div className="container">
            <div>
              <p>Price:</p>
              <p>Rs {houseData.price}</p>
            </div>
            <div>
              <p>Property Size:</p>
              <p>{houseData.sqfeet} sq ft</p>
            </div>
            <div>
              <p>Bedroom:</p>
              <p>{houseData.bedrooms}</p>
            </div>
            <div>
              <p>Bathroom:</p>
              <p>{houseData.bathrooms}</p>
            </div>
            <div>
              <p>Lot size:</p>
              <p>{houseData.lotsize} sq ft</p>
            </div>
            <div>
              <p>Year built:</p>
              <p>{houseData.year}</p>
            </div>
            <div>
              <p>Furnishing</p>
              <p>{houseData.furnishType}</p>
            </div>
            <div>
              <p>Story Type</p>
              <p>{houseData.storyType}</p>
            </div>
            <div>
              <p>Owner Name</p>
              <p>{houseData.ownName}</p>
            </div>
            <div>
              <p>Contact</p>
              <p>{houseData.phone}</p>
            </div>
          </div>
        </div>


        <div className="additional_details">
          <h3>Additional Details</h3>

          <div className="container">
            <div>
              <p>Car Porch:</p>
              <p>{houseData.carPorch ? 'Yes' : 'No'}</p>
            </div>

            <div>
              <p>Internet:</p>
              <p>{houseData.internet ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Laundary:</p>
              <p>{houseData.Laundary ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Storage:</p>
              <p>{houseData.storage ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Swimming Pool:</p>
              <p>{houseData.pool ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Cable or Satellite Tv:</p>
              <p>{houseData.Tv ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>AC</p>
              <p>{houseData.Ac ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Garden</p>
              <p>{houseData.garden ? 'Yes' : 'No'}</p>
            </div>

            <div>
              <p>Gated Entrance:</p>
              <p>{houseData.gate ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Security Cameras:</p>
              <p>{houseData.camera ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>

        {/* <div className="tour_container">
          <div className="image">
            <img src="/images/heroimage1.jpg" alt="" />
          </div>
          <div className="tour">
            <h3>Schedule a tour</h3>
            <CDatePicker selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              placeholderText='Select a Date' />
            <h3>Tour Type</h3>
            <div className="tour_type" >
              <div className="video_chat" style={video ? { borderWidth: '3px' } : { borderWidth: '1px' }} onClick={() => {
                setVideo(true)
                setInperson(false)
              }}>
                <p>Video Chat</p>
              </div>
              <div className="inperson" style={inperson ? { borderWidth: '3px' } : { borderWidth: '1px' }} onClick={() => {
                setVideo(false)
                setInperson(true)
              }}>
                <p>In Person</p>
              </div>
            </div>

            <div className="time">
              <p>Time</p>
              <Select
                options={timeOptions}
                value={selectedTimeOption}
                onChange={(option) => setSelectedTimeOption(option)}
              />
            </div>

            <input type="text" className='name' placeholder='Name' style={{ marginBottom: '10px' }} />
            <input type="text" className='phone' placeholder='Phone' style={{ marginBottom: '10px' }} />
            <input type="email" className='email' placeholder='Email' style={{ marginBottom: '10px' }} />

            <button><p>Submit Your Request</p></button>



          </div>
        </div> */}

        <div className="tour_container">

          <div className="tour">
            <h3>Request Info</h3>
            <div className="photo">
              <div>
              </div>
              <div className="account">
                <img src="/images/profile.png" alt="" />
                <p>{houseData.ownName}</p>
              </div>

            </div>
            <form onSubmit={handlesubmit}>
              <input type="text" placeholder='Name' required name='name' value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder='Phone' required name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input type="text" placeholder='Email' required name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <textarea id="" cols="30" rows="10" placeholder='Message' required name='message' value={message} onChange={(e) => (setMessage(e.target.value))}></textarea>
              <div className="buttons_container">
                <button type='submit'>
                  <p style={{ color: 'white', textDecoration: 'none', fontFamily: '"Lato", sans-serif', fontSize: '12px' }}>Send Message</p>
                </button>
                <button>
                  <a href={`tel:${houseData.phone}`} style={{ color: 'white', textDecoration: 'none', fontFamily: '"Lato", sans-serif', fontSize: '12px' }}>
                    Call Now
                  </a>
                </button>
              </div>
            </form>

          </div>

          <div className="image">
            <img src="/images/hotel.webp" alt="" />
          </div>

        </div>


        <div className="address_section">
          <div>

            <h3>Address</h3>
          </div>

          <div className="container">
            <div>
              <p>Street Adress</p>
              <p>{houseData.streetAddress} </p>
            </div>
            <div>
              <p>City</p>
              <p>{houseData.city}</p>
            </div>
            <div>
              <p>State</p>
              <p>{houseData.state}</p>
            </div>
            <div>
              <p>Postal code</p>
              <p>{houseData.postalCode}</p>
            </div>
          </div>

        </div>





      </div>

    </>


  )
}

export default House_page