import React from 'react'
import './MyAccount.scss'
import Navbar from '../Navabar/Navbar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SellNow from '../SellNow/SellNow'

const MyAccount = () => {

    //const api_base = 'http://localhost:3001'
    const api_base = 'https://real-estate-backend-yuae.onrender.com'

    const navigate = useNavigate()

    const [propertyData, setPropertyData] = useState([])
    const [cardata, setCardata] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
     
        if(!localStorage.getItem('user')){
          navigate('/signinup')
        }
       
      }, [])

    const fetchData = async () => {
        const response = await fetch(api_base + `/getmyproperties/${(JSON.parse(localStorage.getItem('user'))).loginID}`);
        const data = await response.json();
        setPropertyData(data);

        const response1 = await fetch(api_base + `/getmycars/${(JSON.parse(localStorage.getItem('user'))).loginID}`);
        const data1 = await response1.json();
        setCardata(data1)

    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/')
       
    };

    const deleteProp = async (ID) => {
        await fetch(api_base + `/deleteprop/${ID}`)
        window.location.reload()
        this.forceUpdate()
    }


    const deleteCar = async (ID) => {
        await fetch(api_base + `/deletecar/${ID}`)
        window.location.reload()
        this.forceUpdate()
    }

    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="myaccount_container">
                <div className="top">
                    <h3>{JSON.parse((localStorage.getItem('user'))).email}</h3>
                    <button onClick={() => {
                        handleLogout()
                    }}>LOGOUT</button>
                </div>
                <div className="myproperties">
                    <h3>My properties</h3>
                    <div className="details">
                        {
                            propertyData.length === 0 ?
                                <p>No properties</p>
                                :
                                propertyData.map((obj) => {
                                    return <>
                                        <div className='name' onClick={() => {
                                            navigate(obj.propType == 'Apartments' ? `apartment/${obj._id}` : `house/${obj._id}`)
                                        }}>
                                            <p>{obj.propName}</p>
                                        </div>
                                        <div className="buttondiv">
                                            <button onClick={() => {
                                                deleteProp(obj._id)
                                                window.location.reload()
                                            }}>
                                                <p>DELETE POST</p>
                                            </button>
                                        </div>
                                    </>
                                })
                        }


                    </div>
                </div>

                <div className="mycars">
                    <h3>My cars</h3>
                    <div className="details">
                        {
                            cardata.length === 0 ?
                                <p>No cars</p>
                                :
                                cardata.map((obj) => {
                                    return <div>
                                        <div className="name">
                                            <p>{obj.title}</p>
                                        </div>
                                        <div className="buttondiv">
                                            <button onClick={() => {
                                                deleteCar(obj._id)
                                                window.location.reload()
                                            }}>
                                                <p>DELETE POST</p>
                                            </button>
                                        </div>
                                    </div>
                                })
                        }


                    </div>
                </div>
            </div>

            <SellNow/>
        </>
    )
}

export default MyAccount