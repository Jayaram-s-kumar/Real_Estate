import React from 'react'
import './AllApartments.scss'
import { Link } from 'react-router-dom'
import Navbar from '../Navabar/Navbar'

const AllApartments = () => {

    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="AllApartments_container">
                <h1>Apartments</h1>
                <div className="cards-container">
                    <Link to={'apartment/id'}>
                        <div className="card">
                            {/* <div className="hot">
              Hot
            </div> */}
                            <div className="card-image">
                                <img src="/images/Apartment2.avif" alt="" />
                            </div>
                            <div className="card-details">
                                <p className="place">Golden Sands Showhome, Pāpāmoa</p>
                                <p className="price"><span>Price</span>&nbsp;15600000</p>
                                <div className="icons">
                                    <div className="bed">
                                        <img src="/images/wifi.png" alt="" />
                                        <p className="count">free wifi</p>
                                    </div>

                                    <div className="bed">
                                        <img src="/images/parking.png" alt="" />
                                        <p className="count">Parking</p>
                                    </div>

                                    <div className="bed">
                                        <img src="/images/dumbbell.png" alt="" />
                                        <p className="count">Fitness</p>
                                    </div>

                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae similique neque nobis et unde? Tempore, modi? Dolor sit a dolore corporis blanditiis cumque accusamus quia earum? Praesentium, maxime molestiae.</p>
                                </div>
                            </div>
                        </div>
                    </Link>


                    <Link to={'apartment/id'}>
                        <div className="card">
                            <div className="hot">
                                Hot
                            </div>
                            <div className="card-image">
                                <img src="/images/Apartment1.jpg" alt="" />
                            </div>
                            <div className="card-details">
                                <p className="place">Lot 9 Western Ave, Omokoroa</p>
                                <p className="price"><span>Price</span> 20000000</p>
                                <div className="icons">
                                    <div className="bed">
                                        <img src="/images/wifi.png" alt="" />
                                        <p className="count">free wifi</p>
                                    </div>
                                    <div className="bed">
                                        <img src="/images/beach.png" alt="" />
                                        <p className="count">Beach view</p>
                                    </div>
                                    <div className="bed">
                                        <img src="/images/dumbbell.png" alt="" />
                                        <p className="count">fitness</p>
                                    </div>

                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae similique neque nobis et unde? Tempore, modi? Dolor sit a dolore corporis blanditiis cumque accusamus quia earum? Praesentium, maxime molestiae.</p>
                                </div>
                            </div>
                        </div>
                    </Link>


                    <Link to={'apartment/id'}>
                        <div className="card">
                            {/* <div className="hot">
            Hot
          </div> */}
                            <div className="card-image">
                                <img src="/images/Apartment3.jpg" alt="" />
                            </div>
                            <div className="card-details">
                                <p className="place">Lot 9 Western Ave, Omokoroa</p>
                                <p className="price"><span>Price</span> 1000000</p>
                                <div className="icons">
                                    <div className="bed">
                                        <img src="/images/wifi.png" alt="" />
                                        <p className="count">free wifi</p>
                                    </div>
                                    <div className="bed">
                                        <img src="/images/swimming.png" alt="" />
                                        <p className="count">Swimming</p>
                                    </div>
                                    <div className="bed">
                                        <img src="/images/parking.png" alt="" />
                                        <p className="count">parking</p>
                                    </div>

                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae similique neque nobis et unde? Tempore, modi? Dolor sit a dolore corporis blanditiis cumque accusamus quia earum? Praesentium, maxime molestiae.</p>
                                </div>
                            </div>
                        </div>
                    </Link>

                    <Link to={'apartment/id'}>
                        <div className="card">
                            {/* <div className="hot">
              Hot
            </div> */}
                            <div className="card-image">
                                <img src="/images/Apartment2.avif" alt="" />
                            </div>
                            <div className="card-details">
                                <p className="place">Golden Sands Showhome, Pāpāmoa</p>
                                <p className="price"><span>Price</span>&nbsp;15600000</p>
                                <div className="icons">
                                    <div className="bed">
                                        <img src="/images/wifi.png" alt="" />
                                        <p className="count">free wifi</p>
                                    </div>

                                    <div className="bed">
                                        <img src="/images/parking.png" alt="" />
                                        <p className="count">Parking</p>
                                    </div>

                                    <div className="bed">
                                        <img src="/images/dumbbell.png" alt="" />
                                        <p className="count">Fitness</p>
                                    </div>

                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae similique neque nobis et unde? Tempore, modi? Dolor sit a dolore corporis blanditiis cumque accusamus quia earum? Praesentium, maxime molestiae.</p>
                                </div>
                            </div>
                        </div>
                    </Link>


                    <Link to={'apartment/id'}>
                        <div className="card">
                            <div className="hot">
                                Hot
                            </div>
                            <div className="card-image">
                                <img src="/images/Apartment1.jpg" alt="" />
                            </div>
                            <div className="card-details">
                                <p className="place">Lot 9 Western Ave, Omokoroa</p>
                                <p className="price"><span>Price</span> 20000000</p>
                                <div className="icons">
                                    <div className="bed">
                                        <img src="/images/wifi.png" alt="" />
                                        <p className="count">free wifi</p>
                                    </div>
                                    <div className="bed">
                                        <img src="/images/beach.png" alt="" />
                                        <p className="count">Beach view</p>
                                    </div>
                                    <div className="bed">
                                        <img src="/images/dumbbell.png" alt="" />
                                        <p className="count">fitness</p>
                                    </div>

                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae similique neque nobis et unde? Tempore, modi? Dolor sit a dolore corporis blanditiis cumque accusamus quia earum? Praesentium, maxime molestiae.</p>
                                </div>
                            </div>
                        </div>
                    </Link>


                    <Link to={'apartment/id'}>
                        <div className="card">
                            {/* <div className="hot">
            Hot
          </div> */}
                            <div className="card-image">
                                <img src="/images/Apartment3.jpg" alt="" />
                            </div>
                            <div className="card-details">
                                <p className="place">Lot 9 Western Ave, Omokoroa</p>
                                <p className="price"><span>Price</span> 1000000</p>
                                <div className="icons">
                                    <div className="bed">
                                        <img src="/images/wifi.png" alt="" />
                                        <p className="count">free wifi</p>
                                    </div>
                                    <div className="bed">
                                        <img src="/images/swimming.png" alt="" />
                                        <p className="count">Swimming</p>
                                    </div>
                                    <div className="bed">
                                        <img src="/images/parking.png" alt="" />
                                        <p className="count">parking</p>
                                    </div>

                                </div>
                                <div className="description">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae similique neque nobis et unde? Tempore, modi? Dolor sit a dolore corporis blanditiis cumque accusamus quia earum? Praesentium, maxime molestiae.</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default AllApartments