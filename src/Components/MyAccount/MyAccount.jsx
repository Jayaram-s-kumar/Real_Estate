import React from 'react'
import './MyAccount.scss'
import Navbar from '../Navabar/Navbar'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SellNow from '../SellNow/SellNow'
import { BeatLoader } from 'react-spinners'
import { CloudinaryContext, Image, } from 'cloudinary-react'
import { ClipLoader } from 'react-spinners'

const MyAccount = () => {

    const api_base = process.env.REACT_APP_API_URL
    //const api_base = 'https://real-estate-backend-yuae.onrender.com'

    const navigate = useNavigate()

    const [propertyData, setPropertyData] = useState([])
    const [cardata, setCardata] = useState([])
    const [editAddresss, setEditAddresss] = useState(false)
    const [profileData, setProfileData] = useState({})
    const [address, setAddress] = useState('')


    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {

        if (!localStorage.getItem('user')) {
            navigate('/signinup', { replace: true })
        }

    }, [])

    useEffect(() => {
        window.addEventListener('beforeunload', window.scrollTo(0, 0))

        return () => {
            window.removeEventListener('beforeunload', window.scrollTo(0, 0))
        }
    }, [])

    const [addAnim, setAddAnim] = useState(false)

    const fetchData = async () => {

        setAddAnim(true)

        console.log("fetchdata is called")

        const response = await fetch(api_base + `/getmyproperties/${(await JSON.parse(localStorage.getItem('user'))).loginID}`, {
            headers: {
                Authorization: (JSON.parse(localStorage.getItem('user'))).token
            }
        });
        const data = await response.json();
        setPropertyData(data);

        const response1 = await fetch(api_base + `/getmycars/${(await JSON.parse(localStorage.getItem('user'))).loginID}`, {
            headers: {
                Authorization: (JSON.parse(localStorage.getItem('user'))).token
            }
        });
        const data1 = await response1.json();
        setCardata(data1)


        const response2 = await fetch(api_base + `/getprofimg/${await (JSON.parse(localStorage.getItem('user'))).loginID}`, {
            headers: {
                Authorization: (JSON.parse(localStorage.getItem('user'))).token
            }
        })
        const data2 = await response2.json()
        setProfileData(data2)
        setAddAnim(false)
        if (data2.profimgLink) {
            setProfileimglink(data2.profimgLink)
        }
        if (data2.address) {
            setAddress(data2.address)

        }

    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/')

    };

    const deleteProp = async (ID) => {
        await fetch(api_base + `/deleteprop/${ID}`,{
            headers:{
                Authorization:(JSON.parse(localStorage.getItem('user'))).token
            }
        })


    }


    const deleteCar = async (ID) => {
        await fetch(api_base + `/deletecar/${ID}`,{
            headers:{
                Authorization:(JSON.parse(localStorage.getItem('user'))).token
            }
        })

        console.log("delete car funcion called")

    }


    const DeleteCarButton = ({ object }) => {
        const [carbuttonloading, setCarbuttonloading] = useState(false)

        const handleClick = async () => {
            await deleteCar(object._id);
            fetchData()
        };

        return <>
            <button onClick={() => {
                setCarbuttonloading(true);
                handleClick()
            }} disabled={carbuttonloading}>
                <p>{!carbuttonloading && "Delete post"}</p>
                <ClipLoader color="#ffffff" className='loading' size={10} loading={carbuttonloading} />

            </button>
        </>

    }

    const DeletePropButton = ({ object }) => {
        const [propbuttonloading, setPropbuttonloading] = useState(false)
        const handleClick = async () => {
            await deleteProp(object._id);
            fetchData()
        };
        return <>
            <button onClick={() => {
                setPropbuttonloading(true);
                handleClick()
            }} disabled={propbuttonloading}>
                <p>{!propbuttonloading && "Delete post"}</p>
                <ClipLoader color="#ffffff" className='loading' size={10} loading={propbuttonloading} />
            </button>
        </>
    }

    const cloudName = 'dfs1badkm'
    const uploadPreset = 'zomato'
    const apiKey = '994475553562163'

    const [profileimgload, setProfileimgload] = useState(false)
    const [profileimglink, setProfileimglink] = useState('')



    const uploadiamge = async (event) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', uploadPreset)
        formData.append('cloud_name', cloudName)
        await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        }).then(response => response.json())
            .then(data => {
                setProfileimgload(false)
                setProfileimglink(data.url)
                console.log("data.url is", data.url)
                sendDetails(data.url)
            }).catch(err => console.log(err))
    }


    const sendDetails = async (url) => {
        await fetch(`${api_base}/upprofimg`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:(JSON.parse(localStorage.getItem('user'))).token
            },
            body: JSON.stringify({
                profileimg: url,
                loginID: (JSON.parse(localStorage.getItem('user'))).loginID
            })
        })
    }

    const sendAddress = async () => {
        await fetch(`${api_base}/addaddress`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:(JSON.parse(localStorage.getItem('user'))).token
            },
            body: JSON.stringify({
                address,
                loginID: (JSON.parse(localStorage.getItem('user'))).loginID
            })
        })

    }




    return (
        <>
            <Navbar bs={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} selected={'myaccount'} bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="myaccount_container">
                <div className="topsection">
                    <div className="profile_wrapper">
                        <input type="file" name='profileimage' id='profileimage'
                            style={{ display: "none" }}
                            onChange={(event => {

                                setProfileimglink('')
                                uploadiamge(event)
                                setProfileimgload(true)
                            })} />
                        <div className="profile_container">
                            {!profileimglink && !profileimgload && !(profileData.profimgLink) && <img src="/images/account.png" alt="" className='profile' />
                            }
                            {
                                !profileimglink && profileimgload && <BeatLoader color="#36d7b7" />
                            }
                            {
                                profileimglink && <img src={profileimglink} alt="" className='profile' />
                            }
                            {
                                !profileimgload && <label htmlFor="profileimage">
                                    <img src="/images/up-loading.png" alt="" />
                                </label>
                            }
                        </div>
                    </div>
                    <div className="top">
                        <div className='signin'>

                            <h3>signed in as  {JSON.parse((localStorage.getItem('user'))).email}</h3>
                            <button onClick={() => {
                                handleLogout()
                            }}>
                                <img src="/images/power.png" alt="" />
                                <p>logout</p>
                            </button>
                        </div>
                        {
                            profileData.address && !editAddresss && <div className="addressbox">
                                <label htmlFor="address">Address</label>
                                <p>{addAnim && "Updating . . ."}</p>
                                <p>{!addAnim && profileData.address}</p>
                                <div onClick={() => {
                                    setEditAddresss(true)
                                }}>
                                    <img src="/images/edit (1).png" alt="" />
                                </div>
                            </div>
                        }
                        {
                            (!(profileData.address) ? true : (editAddresss ? true : false)) && <div className="addressinput">
                                <label htmlFor="address">Address</label>
                                <div>
                                    <input type="text" name='address' placeholder='Address' onChange={(e) => {
                                        setAddress(e.target.value)


                                    }} value={address} />
                                    <button onClick={() => {
                                        setEditAddresss(false)
                                        sendAddress()
                                        fetchData()
                                    }} disabled={address.length > 13 ? false : true}><p>save</p></button>

                                </div>
                            </div>
                        }

                    </div>
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
                                        <div className='name'>
                                            <div className="image" onClick={() => {
                                                navigate(obj.propType == 'Apartments' ? `apartment/${obj._id}` : `house/${obj._id}`)
                                            }}>
                                                <img src={obj.image1Link} alt="" />
                                            </div>
                                            <div className="detailssmall">
                                                <div>
                                                    <p>{obj.propName}</p>
                                                    <p>Rs {obj.price}</p>
                                                </div>
                                                <div className="buttondiv">
                                                    <DeletePropButton object={obj} />
                                                </div>


                                            </div>
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
                                        <div className="name" >
                                            <div className="image" onClick={() => {
                                                navigate(`car/${obj._id}`)
                                            }}>
                                                <img src={obj.image1Link} alt="" />
                                            </div>
                                            <div className="detailssmall">
                                                <div>
                                                    <p>{obj.title}</p>
                                                    <p>Rs {obj.price}</p>
                                                </div>
                                                <div className="buttondiv">
                                                    <DeleteCarButton object={obj} />
                                                </div>


                                            </div>
                                        </div>

                                    </div>
                                })
                        }


                    </div>
                </div>
            </div>

            <SellNow hidenavbar={true} />
        </>
    )
}

export default MyAccount