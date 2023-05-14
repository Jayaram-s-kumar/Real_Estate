import React from 'react'
import { Link } from 'react-router-dom'
import './SellNow.scss'
import Navbar from '../Navabar/Navbar'

const SellNow = ({hidenavbar}) => {


    return (
        <>
            {!hidenavbar &&<Navbar  bs={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} selected={'sell'} bg='white' txtCol={'black'} hoverClass={'LightHover'} />
}
            <div className="sellnow_container" id='sellnow'>
                <div className="left">
                    <img src="/images/sellhouse.jpg" alt="" />
                </div>
                <div className="right">
                    <div className="buttons">
                        {
                            <Link to={'/sell'}>
                                <button>
                                    <p>Sell Properties</p>
                                </button>
                            </Link>
                        }
                        {
                            <Link to={'/uploadcar'}>
                                <button>
                                    <p>Sell Cars</p>
                                </button>
                            </Link>
                        }
                    </div>
                    <div className="description">
                        <p>Get the best price for your property with our expert selling solutions</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SellNow