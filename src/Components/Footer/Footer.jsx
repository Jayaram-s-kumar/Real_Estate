import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <div className="footer_container">
      <div className="icons">
        <div>
          <img src="/images/instagram.png" alt="" />
          <p>instagram</p>
        </div>
        <div>
          <img src="/images/black.png" alt="" />
          <p>facebook</p>
        </div>
        <div>
          <img src="/images/twitter.png" alt="" />
          <p>twitter</p>
        </div>
      </div>
      <h2>Nest Homes</h2>
      <p><span>&copy; </span>2023 Nest Homes - All Rights Reserved</p>
    </div>
  )
}

export default Footer