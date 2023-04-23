import React,{useState,useEffect} from 'react'
import './AllApartments.scss'
import { Link } from 'react-router-dom'
import Navbar from '../Navabar/Navbar'

const AllApartments = () => {

    const [apartmentsdata, setApartmentsdata] = useState([])

    const api_base = 'http://localhost:3001'

    const fetchData = async () => {
        console.log("function called")
        const response = await fetch(api_base + "/getallapartments");
        const data = await response.json();
        setApartmentsdata(data);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="AllApartments_container">
                <h1>Apartments</h1>
                <div className="cards-container">
                    {
                        apartmentsdata.map((obj) => {

                            const excludedKeys = ['Tv', 'storage', 'gate', 'camera']

                            const trueFeatures = Object.entries(obj)
                                .filter(([key, value]) => value === true && !excludedKeys.includes(key))
                                .map(([key, _]) => key)
                                .slice(0, 3);

                            console.log(trueFeatures);

                            return <Link to={`apartment/${obj._id}`}>


                                <div className="card">

                                    <div className="card-image">
                                        <img src={obj.image1Link} alt="" />
                                    </div>
                                    <div className="card-details">
                                        <p className="place">{obj.propName}</p>
                                        <p className="price"><span>Price</span>&nbsp;{obj.price}</p>
                                        <div className="icons">



                                            {
                                                trueFeatures.map((feature) => {

                                                    return <>
                                                        {
                                                            feature === 'internet' && <div className="bed">
                                                                <img src="/images/wifi.png" alt="" />
                                                                <p className="count">free wifi</p>
                                                            </div>
                                                        }

                                                        {
                                                            feature === 'fitness' && <div className="bed">
                                                                <img src="/images/dumbbell.png" alt="" />
                                                                <p className="count">Fitness</p>
                                                            </div>

                                                        }

                                                        {
                                                            feature === 'carPorch' && <div className="bed">
                                                                <img src="/images/parking.png" alt="" />
                                                                <p className="count">Parking</p>
                                                            </div>

                                                        }

                                                        {
                                                            feature === 'Ac' && <div className="bed">
                                                                <img src="/images/Ac.png" alt="" />
                                                                <p className="count">AC</p>
                                                            </div>

                                                        }


                                                        {
                                                            feature === 'Laundary' && <div className="bed">
                                                                <img src="/images/washing-machine.png" alt="" />
                                                                <p className="count">Laundary</p>
                                                            </div>

                                                        }






                                                        {
                                                            feature === 'seaview' && <div className="bed">
                                                                <img src="/images/beach.png" alt="" />
                                                                <p className="count">Sea view</p>
                                                            </div>

                                                        }


                                                        {
                                                            feature === 'pool' && <div className="bed">
                                                                <img src="/images/swimming.png" alt="" />
                                                                <p className="count">pool</p>
                                                            </div>

                                                        }


                                                        {/* {
                                                            feature === 'gate' && <div className="bed">
                                                                <img src="/images/" alt="" />
                                                                <p className="count"></p>
                                                            </div>
    
                                                        } */}



                                                        {/* {
                                                            feature === 'camera' && <div className="bed">
                                                                <img src="/images/" alt="" />
                                                                <p className="count"></p>
                                                            </div>
    
                                                        } */}

                                                        {
                                                            feature === 'garden' && <div className="bed">
                                                                <img src="/images/gardening.png" alt="" />
                                                                <p className="count">Garden</p>
                                                            </div>

                                                        }



                                                    </>
                                                })
                                            }


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

export default AllApartments