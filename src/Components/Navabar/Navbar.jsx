import React from 'react'
import { useState, useEffect } from 'react'
import './Navbar.scss'
import { Link, Navigate } from 'react-router-dom'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
//import {Link} from 'react-scroll'
import { ClipLoader } from 'react-spinners'

const Navbar = ({ bg, bs, txtCol, selected, hoverClass, display }) => {

  useEffect(() => {
    setExist(false)
  }, [])

  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)

  const [open, setOpen] = useState(false)
  const [close, setClose] = useState(false)
  const [signin, setSignin] = useState(true)
  const [signup, setSignup] = useState(false)
  const [popup, setPopup] = useState(false)
  const [exist, setExist] = useState(false)
  const [route, setRoute] = useState('')
  const [emailErr, setEmailErr] = useState(false)
  const [passErr, setPassErr] = useState(false)
  const [user, setUser] = useState(null);


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
      setLoading(true)
      sendDetails(values)
      action.resetForm()

    }
  })

  //const api_base = 'http://127.0.0.1:3001'
  const api_base = 'https://real-estate-backend-yuae.onrender.com'

  const sendDetails = async (formData) => {
    // setPopup(false)
    console.log("Enterd into sendDetails")
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

    if (data.message === "signed in") {
      setPopup(false)
      // window.location.reload()
      localStorage.setItem("user", JSON.stringify({
        email: data.email,
        loginID: data.loginID
      }))
      setLoading(false)
      document.body.classList.remove('overlay')
      // window.location.reload()
    } else if (data.message === "password error") {
      setPassErr(true)
      setLoading(false)
    } else if (data.message === "email not registerd") {
      setEmailErr(true)
      setLoading(false)
    } else if (data.message === "user created") {
      setPopup(false)
      setLoading(false)
    } else if (data.message === "email already exist") {
      setExist(true)
      setLoading(false)
    }

    console.log(data.message)
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, [localStorage.getItem('user')]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    document.body.classList.remove('overlay')
    navigate('/')
    window.location.reload()
  };

  const selectedStyle = { color: 'white', background: '#ff0000cc', borderStyle: 'solid', borderWidth: '1px', borderRadius: '30px', margin: '0px 10px', borderColor: 'black' }


  return (
    <>


      <div className={'navcontainer'} style={{ boxShadow: bs, background: bg }}>
        <div className="hamburger">
          <img src={txtCol === 'white' ? '/images/hamburger_white.png' : '/images/hamburger_black.png'} alt="" onClick={() => {
            setOpen(!open)
            document.body.style.overflow = 'hidden'
            document.body.style.background = 'ash'
            if (open) {
              setClose(true)
            }
          }} />
        </div>
        {
          localStorage.getItem('user') ? <div className="profile">
            <Link to={'/myaccount'}>
              <img src={txtCol === 'white' ? '/images/user_white.png' : '/images/user_black.png'} alt="" />
            </Link>

          </div> : <div className="profile" onClick={()=>{
            
             document.body.classList.add('overlay')
             document.body.style.overflow = 'unset'
             setPopup(true)
          }}>
          
              <p>LOGIN</p>
          
          </div>

        }



        <div className="logo">
          <h2 >W<span>&</span>W</h2>
        </div>
        <div>
          <div className="options">
            <ul>

              <Link to={'/'}>
                <li style={selected == "home" ? selectedStyle : null} className={hoverClass}>
                  HOME
                </li>
              </Link>

              {
                user && <Link to={'/sellnow'}>
                  <li style={selected == "sell" ? selectedStyle : null} className={hoverClass}>
                    SELL
                  </li>
                </Link>
              }
              <Link to={'/allhouses'}>
                <li style={selected == "houses" ? selectedStyle : null} className={hoverClass}>
                  HOUSES
                </li>
              </Link>

              <Link to={'/allapartments'}>
                <li style={selected == "apartments" ? selectedStyle : null} className={hoverClass}>
                  APARTMENTS
                </li>
              </Link>

              <Link to={'/allcars'}>
                <li style={selected == "cars" ? selectedStyle : null} className={hoverClass}>
                  CARS
                </li>
              </Link>

              <Link to={'/gallery'}>
                <li style={selected == "gallery" ? selectedStyle : null} className={hoverClass}>
                  GALLERY
                </li>
              </Link>





              {
                !user
                &&

                <Link to={'/'} onClick={() => {
                  // document.body.classList.add('overlay')
                  setPopup(true)
                }} >
                  <li style={selected == "signin" ? selectedStyle : null} className={hoverClass}>
                    SIGN IN
                  </li>
                </Link>
              }

              {
                user
                &&

                <Link to={'/myaccount'} >
                  <li style={selected == "myaccount" ? selectedStyle : null} className={hoverClass}>
                    PROFILE
                  </li>
                </Link>
              }



            </ul>
          </div>

        </div>

      </div>


      <div className={open ? 'mobile_navbar open' : close ? 'mobile_navbar close' : 'mobile_navbar'} style={open ? { display: 'block' } : { display: 'none' }}>
        <div className="close_button">
          <img src="/images/close.png" alt="" onClick={() => {
            setOpen(!open)
            setClose(false)
            document.body.style.overflow = 'unset'
          }} />

        </div>

        <div className="options">
          <ul>

            {
              !user && <li style={{ color: txtCol }} className={hoverClass} onClick={() => {
                setOpen(!open)
                setClose(false)
                document.body.classList.add('overlay')
                document.body.style.overflow = 'unset'
                setPopup(true)
              }}>
                <Link to={'/'}>SIGN IN</Link>
              </li>

            }

            <li onClick={() => {
              setOpen(!open)
              setClose(false)
              document.body.style.overflow = 'unset'
              navigate('/')
            }}>
              <Link>HOME</Link >
            </li>

            <li onClick={() => {
              setOpen(!open)
              setClose(false)
              document.body.style.overflow = 'unset'
            }}>
              <Link to={'/gallery'}>GALLERY</Link >
            </li>

            <li onClick={() => {
              setOpen(!open)
              setClose(false)
              document.body.style.overflow = 'unset'
            }}>
              <Link to={'/allhouses'}>HOUSES</Link >
            </li>

            <li onClick={() => {
              setOpen(!open)
              setClose(false)
              document.body.style.overflow = 'unset'
            }}>
              <Link to={'/allapartments'}>APARTMENTS</Link >
            </li>

            <li onClick={() => {
              setOpen(!open)
              setClose(false)
              document.body.style.overflow = 'unset'
            }}>
              <Link to={'/allcars'}>CARS</Link >
            </li>


            {
              user && <li onClick={() => {
                setOpen(!open)
                setClose(false)
                document.body.style.overflow = 'unset'
              }}>
                <Link to={'/sell'}>SELL PROPERTIES</Link >
              </li>
            }

            {
              user && <li onClick={() => {
                setOpen(!open)
                setClose(false)
                document.body.style.overflow = 'unset'
              }}>
                <Link to={'/uploadcar'}>SELL CARS</Link >
              </li>
            }




            {
              user && <li style={{ color: txtCol }} className={hoverClass} onClick={() => {
                setOpen(!open)
                setClose(false)
                //  document.body.classList.add('overlay')
                document.body.style.overflow = 'unset'

              }}>
                <Link to={'/myaccount'}>PROFILE</Link>
              </li>
            }

            {
              user && <li style={{ color: txtCol }} className={hoverClass} onClick={() => {
                setOpen(!open)
                setClose(false)
                document.body.style.overflow = 'unset'

              }}>
                <Link to={'/'} onClick={() => {
                  handleLogout()
                  document.body.classList.remove('overlay')
                }}>LOGOUT</Link>
              </li>
            }


          </ul>
        </div>
      </div>

      <div className="overlay" style={popup ? { display: 'block' } : { display: 'none' }} onClick={() => {
        setPopup(false)
        document.body.classList.remove('overlay')
      }}></div>

      {
        popup && <div className="signinup">
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
                <p className='error'>{errors.email && touched.email ? errors.email : null}</p><br /><br />

                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete='off' />
                <p className='error'> {errors.password && touched.password ? errors.password : null}</p><br /><br />


                <button onClick={() => {
                  setRoute('/signup')
                }} disabled={loading}>
                  <p>Sign up</p><ClipLoader color="#ffffff" size={15} loading={loading} />
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
                <p className='error'>{emailErr && 'Email not Registerd'}</p>
                <p className='error'>{errors.email && touched.email ? errors.email : null}</p><br /><br />

                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={values.password} onChange={handleChange} onBlur={handleBlur} autoComplete='off' onClick={() => {
                  setPassErr(false)
                }} />
                <p className='error'>{passErr && 'Password error'}</p>
                <p className='error'> {errors.password && touched.password ? errors.password : null}</p><br /><br />


                <button onClick={() => {
                  setRoute('/signin')


                }} disabled={loading} >
                  <p>Sign In</p><ClipLoader color="#ffffff" size={15} loading={loading} />
                </button>
                <Link to={'/sendRegEmail'} onClick={() => {
                  document.body.classList.remove('overlay')
                }}> <p>Forget password?</p></Link>
              </form>
            </div>
          }
        </div>
      }
    </>
  )
}

export default Navbar