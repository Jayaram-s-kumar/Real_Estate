import React from 'react'
import { Link } from 'react-router-dom'
import './SellNow.scss'

const SellNow = () => {
    return (
        <div className="sellnow_container">
            <div className="left">
                <img src="/images/sellhouse.jpg" alt="" />
            </div>
            <div className="right">
                {
                     <Link to={'/sell'}>
                        <button>
                            <p>Sell Now</p>
                        </button>
                    </Link>
                }
                <div className="description">
                    <p>Get the best price for your property with our expert selling solutions</p>
                </div>
            </div>
        </div>
    )
}

export default SellNow