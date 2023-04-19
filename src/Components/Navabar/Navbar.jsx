import React from 'react'
import { useState } from 'react'
import './Navbar.scss'
import { Link } from 'react-router-dom'



const Navbar = ({ bg, bs, txtCol, hoverClass }) => {


  const [open, setOpen] = useState(false)
  const [close, setClose] = useState(false)

  return (
    <>

      <div className={'navcontainer'} style={{ boxShadow: bs, background: bg }}>
        <div className="hamburger">
          <img src={txtCol == 'white' ? '/images/hamburger_white.png' : '/images/hamburger_black.png'} alt="" onClick={()=>{
            setOpen(!open)
            document.body.style.overflow = 'hidden'
            document.body.style.background='ash'
            if(open){
              setClose(true)
            }
          }} />
        </div>
        <div className="logo">
          <h2 style={{ color: txtCol }}>Nest Homes</h2>
        </div>
        <div>
          <div className="options">
            <ul>
             
                <Link to={'/'} style={{color:txtCol}}>
                <li style={{ color: txtCol }} className={hoverClass}>
                  HOME
                </li>
                </Link>
             
             
                <Link to={'/gallery'} style={{color:txtCol}}>
                <li style={{ color: txtCol }} className={hoverClass}>
                  GALLERY
                </li>
                </Link>
                <Link to={'/allapartments'} style={{color:txtCol}}>
                <li style={{ color: txtCol }} className={hoverClass}>
                  APARTMENTS
                </li>
                </Link>
                <Link to={'/allhouses'} style={{color:txtCol}}>
                <li style={{ color: txtCol }} className={hoverClass}>
                 HOUSES
                </li>
                </Link>
            </ul>
          </div>
        
        </div>
       
      </div>

      <div className={open ? 'mobile_navbar open' : close ? 'mobile_navbar close' : 'mobile_navbar'}>
          <div className="close_button">
            <img src="/images/close.png" alt="" onClick={()=>{
              setOpen(!open)
              setClose(false)
              document.body.style.overflow='unset'
            }} />
           
          </div>

          <div className="options">
              <ul>

               <li onClick={()=>{
                 setOpen(!open)
                 setClose(false)
                 document.body.style.overflow='unset'
               }}>
                <Link to={'/'}>HOME</Link >
               </li>

               <li onClick={()=>{
                 setOpen(!open)
                 setClose(false)
                 document.body.style.overflow='unset'
               }}>
                <Link to={'/gallery'}>GALLERY</Link >
               </li>

               <li onClick={()=>{
                 setOpen(!open)
                 setClose(false)
                 document.body.style.overflow='unset'
               }}>
                <Link to={'/allhouses'}>HOUSES</Link >
               </li>

               <li onClick={()=>{
                 setOpen(!open)
                 setClose(false)
                 document.body.style.overflow='unset'
               }}>
                <Link to={'/allapartments'}>APARTMENTS</Link >
               </li>

              </ul>
            </div>
      </div>
    </>
  )
}

export default Navbar