import React, { useState } from 'react'
import './Signinup.scss'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import Navbar from '../Navabar/Navbar'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

const Signinup = () => {

    //window.location.reload()

    const [signin, setSignin] = useState(true)
    const [signup, setSignup] = useState(false)
    const [popup, setPopup] = useState(false)
    const [exist, setExist] = useState(false)
    const [route, setRoute] = useState('')

    const navigate = useNavigate()

    //const api_base = 'http://127.0.0.1:3001'
    const api_base = 'https://real-estate-backend-yuae.onrender.com'

    
    


    const [emailErr, setEmailErr] = useState(false)
    const [passErr, setPassErr] = useState(false)


    const initialValues = {
        name: '',
        email: '',
        password: '',
    }

    const signUpSchema = Yup.object({
        email: Yup.string().email().required("please enter your email"),
        password: Yup.string().min(4).required("please enter your password"),
    })


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: (values, action) => {
            sendDetails(values)
            action.resetForm()
        }
    })

    const sendDetails = async (formData) => {
        // setPopup(false)
        let data = await (await fetch(`${api_base}${route}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({

                email: formData.email,
                password: formData.password

            }) 
        })).json()

        if (data.message === "email already exist") {
            setExist(true)
        } else if (data.message === "user created") {
            navigate('/')
        } else if (data.message === "signed in") {
            navigate('/')
            localStorage.setItem("user", JSON.stringify({
                email: data.email,
                loginID: data.loginID
            }))
            document.body.classList.remove('overlay')
        } else if (data.message === "password error") {
            setPassErr(true)
        } else if (data.message === "email not registerd") {
            setEmailErr(true)
        }
    }
    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />
            <div className="signinup_container">
                <div className="signinupbox">
                    <div className="topbar">
                        <div className="signup" onClick={() => {
                            setSignin(false)
                            setSignup(true)

                        }} style={signin ? { background: '#00000017' } : {}}>
                            <p>signup</p>
                        </div>
                        <div className="signin" onClick={() => {
                            setSignin(true)
                            setSignup(false)
                        }} style={signup ? { background: '#00000017' } : {}}>
                            <p>signin</p>
                        </div>
                    </div>
                    {
                        signup && <div className="signupform">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} onClick={() => {
                                    setExist(false)
                                }} autoComplete='off' />
                                <p className='error'>{exist && 'email already exist'}</p>
                                <p  className='error'>{errors.email && touched.email ? errors.email : null}</p><br /><br />

                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                                <p  className='error'> {errors.password && touched.password ? errors.password : null}</p><br /><br />


                                <button onClick={() => {
                                    setRoute('/signup')
                                }}>
                                    <p>Sign up</p>
                                </button>
                            </form>
                        </div>
                    }

                    {
                        signin && <div className="signinform">
                            <form onSubmit={handleSubmit}>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' value={values.email} onChange={handleChange} onBlur={handleBlur} onClick={() => {
                                    setExist(false)
                                    setEmailErr(false)
                                }} autoComplete='off' />
                                <p  className='error'>{emailErr && 'Email not Registerd'}</p>
                                <p  className='error'>{errors.email && touched.email ? errors.email : null}</p><br /><br />

                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete='off' onClick={() => {
                                    setPassErr(false)
                                }} />
                                <p  className='error'>{passErr && 'Password error'}</p>
                                <p  className='error'> {errors.password && touched.password ? errors.password : null}</p><br /><br />


                                <button onClick={() => {
                                    setRoute('/signin')
                                }}>
                                    <p>Sign In</p>
                                </button>

                                <Link to={'/sendRegEmail'}> <p>Forget password?</p></Link>

                            </form>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Signinup