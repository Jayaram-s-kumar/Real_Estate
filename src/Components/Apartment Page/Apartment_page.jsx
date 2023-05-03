import React from 'react'
import './Apartment_page.scss'
import CDatePicker from "react-datepicker";
import FsLightbox from "fslightbox-react";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import Navbar from '../Navabar/Navbar';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Apartment_page = () => {

  const navigate = useNavigate()

  useEffect(() => {

    if (!localStorage.getItem('user')) {
      navigate('/signinup')
    }

  }, [])

  const { apartmentID } = useParams()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  async function handlesubmit(e) {
    e.preventDefault()
    const form = e.target;
    const formData = new FormData();
    formData.name = name
    formData.email = email
    formData.phone = phone
    formData.message = message
    formData.propName = apartmentData.propName
    formData.ownerEmail = JSON.parse(localStorage.getItem('user')).email
    await (await fetch(api_base + "/sendinforeq", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })).json()
    
  }

  const date = new Date()
  const [selectedDate, setSelectedDate] = useState();
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [video, setVideo] = useState(false)
  const [inperson, setInperson] = useState(false)
  const [toggler, setToggler] = useState(false);
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

  const [apartmentData, setApartmentData] = useState([])

  //const api_base = 'http://localhost:3001'
  const api_base = 'https://real-estate-backend-yuae.onrender.com'


  const fetchData = async () => {
    const response = await fetch(api_base + `/getPropData/${apartmentID}`);
    const data = await response.json();
    setApartmentData(data);
  }

  useEffect(() => {
    fetchData()
  }, [])

  const excludedKeys = ['Tv', 'storage', 'gate', 'camera']

  const trueFeatures = Object.entries(apartmentData)
    .filter(([key, value]) => value === true && !excludedKeys.includes(key))
    .map(([key, _]) => key)
    .slice(0, 8);


  return (

    <>
      <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />
      <div className="Apartmentpage_container">
        <div className="topsection">

          <div className="address">
            <h2>{apartmentData.propName}</h2>
            <div>
              <img src="/images/location.png" alt="" />
              <p>{apartmentData.city}</p>
            </div>
          </div>

          <div className="details">
            <h2><span>Price </span>Rs {apartmentData.price}</h2>
            <div className="area">
              <img src="/images/measuring.png" alt="" />
              <p>{apartmentData.sqfeet} sq feet</p>
            </div>
          </div>

        </div>

        <div className="image_section">
          <div className="large_image">
            <img src={apartmentData.image1Link} alt="" />
          </div>
          <div className="two_small">
            <>
              <FsLightbox
                toggler={toggler}
                sources={[
                  `${apartmentData.image1Link}`,
                  `${apartmentData.image2Link}`,
                  `${apartmentData.image3Link}`,
                  `${apartmentData.image4Link}`,
                  `${apartmentData.image5Link}`,
                ]}
              />
            </>






            <div className="first">
              <img src={apartmentData.image2Link} alt="" />
            </div>
            <div className="second">
              <p onClick={() => {
                setToggler(!toggler)
              }}>+2 more</p>
              <div className="image_overlay" onClick={() => {
                setToggler(!toggler)
              }}></div>
              <img src={apartmentData.image3Link} alt="" />
            </div>



          </div>

          <div className="mobileimages">
            <div>
              <img src={apartmentData.image2Link} alt="" />
            </div>
            <div>
              <img src={apartmentData.image3Link} alt="" />
            </div>
            <div>
              <img src={apartmentData.image4Link} alt="" />
            </div>
            <div>
              <img src={apartmentData.image5Link} alt="" />
            </div>
          </div>
        </div>





        <div className="icons_section">

          {
            trueFeatures.map((feature) => {
              return <>
                {
                  feature === 'internet' && <div className="bedroom">
                    <div className="icons">
                      <img src="/images/wifi.png" alt="" />
                      <p></p>
                    </div>
                    <p>Wifi</p>
                  </div>

                }

                {
                  feature === 'fitness' && <div className="bedroom">
                    <div className="icons">
                      <img src="/images/dumbbell.png" alt="" />
                      <p></p>
                    </div>
                    <p>fitness</p>
                  </div>

                }

                {
                  feature === 'carPorch' && <div className="bedroom">
                    <div className="icons">
                      <img src="/images/parking.png" alt="" />
                      <p></p>
                    </div>
                    <p>Parking</p>
                  </div>

                }

                {
                  feature === 'Ac' && <div className="bedroom">
                    <div className="icons">
                      <img src="/images/Ac.png" alt="" />
                      <p></p>
                    </div>
                    <p>AC</p>
                  </div>

                }


                {
                  feature === 'Laundary' && <div className="bedroom">
                    <div className="icons">
                      <img src="/images/washing-machine.png" alt="" />
                      <p></p>
                    </div>
                    <p>Laundary</p>
                  </div>

                }

                {
                  feature === 'seaview' && <div className="bedroom">
                    <div className="icons">
                      <img src="/images/beach.png" alt="" />
                      <p></p>
                    </div>
                    <p>Sea view</p>
                  </div>

                }

                {
                  feature === 'pool' && <div className="bedroom">
                    <div className="icons">
                      <img src="/images/swimming.png" alt="" />
                      <p></p>
                    </div>
                    <p>Swimming pool</p>
                  </div>

                }

                {
                  feature === 'garden' && <div className="bedroom">
                    <div className="icons">
                      <img src="/images/gardening.png" alt="" />
                      <p></p>
                    </div>
                    <p>Gardening</p>
                  </div>

                }
              </>
            })
          }








        </div>

        <div className="description">

          <h3>Description</h3>
          <p>{apartmentData.description}</p>

        </div>


        <div className="documents_container">
          <h3>Property Documents</h3>
          <div className='documents'>
            <div>
              <div>
                <img src="/images/document.png" alt="" />
                <p>Document 1</p>
              </div>

              <a href={apartmentData.doc1Link} ><p>Download</p></a>
            </div>

            <div>
              <div>
                <img src="/images/document.png" alt="" />
                <p>Document 2</p>
              </div>

              <a href={apartmentData.doc2Link} ><p>Download</p></a>
            </div>


          </div>
        </div>


        <div className="details_section">
          <h3>Details</h3>
          <div className="container">
            <div>
              <p>Price:</p>
              <p>Rs {apartmentData.price}</p>
            </div>
            <div>
              <p>Property Size:</p>
              <p>{apartmentData.sqfeet} sq ft</p>
            </div>
            <div>
              <p>Bedroom:</p>
              <p>{apartmentData.bedrooms}</p>
            </div>
            <div>
              <p>Bathroom:</p>
              <p>{apartmentData.bathrooms}</p>
            </div>
            <div>
              <p>Lot size:</p>
              <p>{apartmentData.lotsize} sq ft</p>
            </div>
            <div>
              <p>Year built:</p>
              <p>{apartmentData.year}</p>
            </div>
            <div>
              <p>Furnishing</p>
              <p>{apartmentData.furnishType}</p>
            </div>
            <div>
              <p>Owner Name</p>
              <p>{apartmentData.ownName}</p>
            </div>
            <div>
              <p>Contact</p>
              <p>{apartmentData.phone}</p>
            </div>
          </div>
        </div>



        <div className="additional_details">
          <h3>Additional Details</h3>

          <div className="container">
            <div>
              <p>Car Porch:</p>
              <p>{apartmentData.carPorch ? 'Yes' : 'No'}</p>
            </div>

            <div>
              <p>Internet:</p>
              <p>{apartmentData.internet ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Laundary:</p>
              <p>{apartmentData.Laundary ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Storage:</p>
              <p>{apartmentData.storage ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Swimming Pool:</p>
              <p>{apartmentData.pool ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Cable or Satellite Tv:</p>
              <p>{apartmentData.Tv ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>AC</p>
              <p>{apartmentData.Ac ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Garden</p>
              <p>{apartmentData.garden ? 'Yes' : 'No'}</p>
            </div>

            <div>
              <p>Gated Entrance:</p>
              <p>{apartmentData.gate ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Security Cameras:</p>
              <p>{apartmentData.camera ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Sea view:</p>
              <p>{apartmentData.seaview ? 'Yes' : 'No'}</p>
            </div>
            <div>
              <p>Fitness:</p>
              <p>{apartmentData.fitness ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </div>

        {/* <div className="tour_container">
          <div className="image">
            <img src="/images/Apartment9.jpg" alt="" />
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


        {<div className="tour_container">

          <div className="tour">
            <h3>Request Info</h3>
            <div className="photo">
              <div>
              </div>
              <div className="account">
                <img src="/images/profile.png" alt="" />
                <p>{apartmentData.ownName}</p>
              </div>

            </div>
            <form onSubmit={(e) => {
              handlesubmit(e)
              setMessage('')
              setName('')
              setPhone('')
              setEmail('')
            }}>
              <input type="text" placeholder='Name' required name='name' value={name} onChange={(e) => setName(e.target.value)} />
              <input type="text" placeholder='Phone' required name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input type="text" placeholder='Email' required name='email' value={email} onChange={(e) => setEmail(e.target.value)} />
              <textarea id="" cols="30" rows="10" placeholder='Message' required name='message' value={message} onChange={(e) => (setMessage(e.target.value))}></textarea>
              <div className="buttons_container">
                <button type='submit'>
                  <p style={{ color: 'white', textDecoration: 'none', fontFamily: '"Lato", sans-serif', fontSize: '12px' }}>Send Message</p>
                </button>
                <button>
                  <a href={`tel:${apartmentData.phone}`} style={{ color: 'white', textDecoration: 'none', fontFamily: '"Lato", sans-serif', fontSize: '12px' }}>
                    Call Now
                  </a>
                </button>
              </div>
            </form>
          </div>

          <div className="image">
            <img src="/images/Apartment10.avif" alt="" />
          </div>

        </div>}


        <div className="address_section">
          <div>

            <h3>Address</h3>


          </div>

          <div className="container">
            <div>
              <p>Address</p>
              <p>{apartmentData.streetAddress}</p>
            </div>
            <div>
              <p>State</p>
              <p>{apartmentData.state}</p>
            </div>
            <div>
              <p>City</p>
              <p>{apartmentData.city}</p>
            </div>

            <div>
              <p>Postal code</p>
              <p>{apartmentData.postalCode}</p>
            </div>
          </div>


        </div>





      </div>

    </>


  )
}

export default Apartment_page