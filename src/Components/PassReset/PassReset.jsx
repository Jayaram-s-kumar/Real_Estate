import React from 'react'
import './PassReset.scss'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navabar/Navbar'


const PassReset = () => {
    const navigate = useNavigate()
    const { email } = useParams()

   // const api_base = 'http://localhost:3001'
    const api_base = 'https://real-estate-backend-yuae.onrender.com'


    const [pass, setPass] = useState('')

    const updatePassword = async (formData) => {
        await fetch(api_base + `/updatepass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                password: pass,
                email

            })
        })
        navigate('/')
    }

    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="passcontainer">
                <form onSubmit={(e) => {
                    e.preventDefault()
                    updatePassword()
                }}>
                    <label htmlFor="newpass">Enter new password</label>
                    <input type="text" name='newpass' onChange={(e) => {
                        setPass(e.target.value)

                    }} value={pass} />

                    <button>Update</button>
                </form>
            </div>
        </>
    )


}

export default PassReset