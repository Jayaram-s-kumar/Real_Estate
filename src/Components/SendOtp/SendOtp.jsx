import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import './sendOtp.scss'
import Navbar from '../Navabar/Navbar'

const SendOtp = () => {

  const [time, setTime] = useState(10)


  const { email } = useParams()


  const [otp, setOtp] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()
   //const api_base = 'http://localhost:3001'
   const api_base = 'https://real-estate-backend-yuae.onrender.com'




  useEffect(() => {
    decreasetime()
  })

  const decreasetime = () => {
    time > 0 && setTimeout(() => {
      setTime(time - 1)
    }, 1000);
  }



  const resendOtp = async (email) => {
    setTime(10)
    decreasetime()
    await fetch(api_base + "/resend-otp", {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
      })
    })
  }



  const verifyotp = async () => {
    if (otp) {
      let data = await (await fetch(api_base + "/verify-otp", {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          otp: otp,
          email
        })
      })).json()

      if (data.message == 'otp match') {
        navigate(`newpass/${email}`)
      } else {
        setError(true)
      }

    }
  }

  return (
    <>
      <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />

      <div className="otpcontainer">
        <p>Please Check your email for OTP</p><br /><br />
        <form onSubmit={(e) => {
          e.preventDefault()
        }}>
          <input type="number" name="otp" id="" onChange={(e) => {
            setOtp(e.target.value)
            setError(false)
          }} value={otp} required /><br />
          {error && <p className='error'>Otp incorrect</p>}
          <button onClick={verifyotp} style={{ "marginBottom": "30px" }}><p>VERIFY</p>
</button>
        </form>

        <p><button disabled={time > 0 ? "something" : ""} onClick={() => {
          resendOtp(email)
        }}>        <p>Resend otp</p>
        </button> {time !== 0 ? `in ${time} seconds` : null}</p>
      </div>
    </>
  )
}

export default SendOtp