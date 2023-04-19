import React, { useEffect, useState } from 'react'
import './Houses.scss'
import { Link } from 'react-router-dom'
const Houses = () => {

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };


  return (
    <div className="House-container" id='houses'>
      <h1>Houses</h1>
      <div className="cards-container">
        <Link to={'house/id'}>
          <div className="card">
            {/* <div className="hot">
              Hot
            </div> */}
            <div className="card-image">
              <img src="/images/House1.avif" alt="" />
            </div>
            <div className="card-details">
              <p className="place">Golden Sands Showhome, Pāpāmoa</p>
              <p className="price"><span>Price</span>&nbsp;15600000</p>
              <div className="icons">
                <div className="bed">
                  <img src="/images/bed.png" alt="" />
                  <p className="count">4</p>
                </div>
                <div className="bath">
                  <img src="/images/bathtub.png" alt="" />
                  <p className="count">2</p>
                </div>
                <div className="area">
                  <img src="/images/measuring.png" alt="" />
                  <p className="count">1800 sq ft</p>
                </div>
              </div>
              <div className="description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae similique neque nobis et unde? Tempore, modi? Dolor sit a dolore corporis blanditiis cumque accusamus quia earum? Praesentium, maxime molestiae.</p>
              </div>
            </div>
          </div>
        </Link>


        <Link to={'house/id'}>
          <div className="card">
            <div className="hot">
              Hot
            </div>
            <div className="card-image">
              <img src="/images/House2.avif" alt="" />
            </div>
            <div className="card-details">
              <p className="place">Lot 9 Western Ave, Omokoroa</p>
              <p className="price"><span>Price</span> 20000000</p>
              <div className="icons">
                <div className="bed">
                  <img src="/images/bed.png" alt="" />
                  <p className="count">4</p>
                </div>
                <div className="bath">
                  <img src="/images/bathtub.png" alt="" />
                  <p className="count">2</p>
                </div>
                <div className="area">
                  <img src="/images/measuring.png" alt="" />
                  <p className="count">2000 sq ft</p>
                </div>
              </div>
              <div className="description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae similique neque nobis et unde? Tempore, modi? Dolor sit a dolore corporis blanditiis cumque accusamus quia earum? Praesentium, maxime molestiae.</p>
              </div>
            </div>
          </div>
        </Link>


        <Link to={'house/id'}>
          <div className="card">
            {/* <div className="hot">
            Hot
          </div> */}
            <div className="card-image">
              <img src="/images/House3.avif" alt="" />
            </div>
            <div className="card-details">
              <p className="place">Lot 9 Western Ave, Omokoroa</p>
              <p className="price"><span>Price</span> 1000000</p>
              <div className="icons">
                <div className="bed">
                  <img src="/images/bed.png" alt="" />
                  <p className="count">4</p>
                </div>
                <div className="bath">
                  <img src="/images/bathtub.png" alt="" />
                  <p className="count">2</p>
                </div>
                <div className="area">
                  <img src="/images/measuring.png" alt="" />
                  <p className="count">1500 sq ft</p>
                </div>
              </div>
              <div className="description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, vitae similique neque nobis et unde? Tempore, modi? Dolor sit a dolore corporis blanditiis cumque accusamus quia earum? Praesentium, maxime molestiae.</p>
              </div>
            </div>
          </div>
        </Link>
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