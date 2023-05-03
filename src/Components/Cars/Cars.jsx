import React from 'react'
import './Cars.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

const Cars = () => {

    const navigate = useNavigate()



    const [backendData, setBackendData] = useState([])

    //const api_base = 'http://localhost:3001'
    const api_base = 'https://real-estate-backend-yuae.onrender.com'

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const response = await fetch(api_base + "/first3cars");
        const data = await response.json();
        setBackendData(data);

    }


    return (
        <div className="carscontainer">
            <h1>Cars</h1>
            <div className="cards_container">

                {
                    backendData.map((obj) => {
                        return <Link to={`car/${obj._id}`} key={obj._id}>
                            <div className="card">
                                <div className="cardimage">
                                    <img src={obj.image1Link} alt="" />
                                </div>
                                <div className="details">
                                    <p className="price">Rs {obj.price}</p>
                                    <p className="year">{obj.year} model , {obj.kmdriven} km</p>

                                    <p className="title">{obj.title}</p>
                                </div>
                            </div>
                        </Link>


                    })
                }



            </div>

            <Link to={'/allcars'}>
                <button className="loadmore">
                    <p>Load More</p>
                </button>
            </Link>


        </div>
    )
}

export default Cars