import React from 'react'
import './SendRegEmail.scss'
import Navbar from '../Navabar/Navbar'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


  const api_base = process.env.REACT_APP_API_URL
  //const api_base = 'https://real-estate-backend-yuae.onrender.com'


const SendRegEmail = () => {
    const [error, setError] = useState(false)

    const navigate = useNavigate()

    const sendDetails = async (values)=>{
       const data =await (await fetch(api_base+'/sendregemail',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            email:values.email
        })
       })).json()

       if(data.message=='email not registerd'){
        setError(true)
       }else{
        navigate(`/otppage/${values.email}`)
       }
     
    }

    const initialValues = {
        email:''
    }

    const schema = Yup.object({
        email:Yup.string().required("Please enter regirsterd email")
    })

    const {errors,handleChange,handleBlur,handleSubmit,values,touched,} = useFormik({
        initialValues,
        validationSchema:schema,
        onSubmit:(values,action)=>{
            sendDetails(values)
            action.resetForm()
        }
    })


    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="regEmailcontainer">
                <form onSubmit={handleSubmit}>
                    <p>Enter your registed email </p>
                    <input type="email" name="email" id="" onChange={handleChange} onBlur={handleBlur} onSubmit={handleSubmit} value={values.email}/>
                    <p className='error'>{errors.email && touched.email ? errors.email : null}{error && 'Email not registerd'}</p>
                  
                    <button>
                        <p>SEND OTP</p>
                    </button>
                </form>
            </div>
        </>
    )
}

export default SendRegEmail

