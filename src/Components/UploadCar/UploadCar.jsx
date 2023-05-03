import React from 'react'
import './UploadCar.scss'
import { useState,useEffect } from 'react'
import { ScaleLoader } from 'react-spinners'
import { CloudinaryContext, Image, } from 'cloudinary-react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import Navbar from '../Navabar/Navbar'



const UploadCar = () => {

    //const api_base = 'http://localhost:3001'

    const api_base = 'https://real-estate-backend-yuae.onrender.com'

    const navigate = useNavigate()

    useEffect(() => {
     
        if(!localStorage.getItem('user')){
          navigate('/signinup')
        }
       
      }, [])


    const [fueltype, setFueltype] = useState('')
    const [transmission, setTransmission] = useState('')
    const [noofowners, setNoofowners] = useState('')

    const [image1Link, setImage1Link] = useState('')
    const [image2Link, setImage2Link] = useState('')
    const [image3Link, setImage3Link] = useState('')
    const [image4Link, setImage4Link] = useState('')
    const [image5Link, setImage5Link] = useState('')

    const [image1IsLoading, setImage1IsLoading] = useState(false)
    const [image2IsLoading, setImage2IsLoading] = useState(false)
    const [image3IsLoading, setImage3IsLoading] = useState(false)
    const [image4IsLoading, setImage4IsLoading] = useState(false)
    const [image5IsLoading, setImage5IsLoading] = useState(false)

    const cloudName = 'dfs1badkm'
    const uploadPreset = 'zomato'
    const apiKey = '994475553562163'




    const handleImage1Upload = () => {
        setImage1IsLoading(true)
    }
    const handleImage2Upload = () => {
        setImage2IsLoading(true)
    }
    const handleImage3Upload = () => {
        setImage3IsLoading(true)
    }
    const handleImage4Upload = () => {
        setImage4IsLoading(true)
    }
    const handleImage5Upload = () => {
        setImage5IsLoading(true)
    }

    const uploadimage = async (event, num) => {
        const file = event.target.files[0]
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', uploadPreset)
        formData.append('cloud_name', cloudName)
        await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        })
            .then(response => response.json())
            .then(data => {
                if (num === 1) {
                    setImage1Link(data.url)
                } else if (num === 2) {
                    setImage2Link(data.url)
                }
                else if (num === 3) {
                    setImage3Link(data.url)
                }
                else if (num === 4) {
                    setImage4Link(data.url)
                }
                else if (num === 5) {
                    setImage5Link(data.url)
                }

            })
            .catch((err) => {
            })

    }

    const initialValues = {
        carbrand: '',
        year: '',
        fueltype,
        transmission,
        noofowners,
        kmdriven: '',
        title: '',
        price: '',
        address: '',
        location: '',
        phone: '',
        description: '',
        image1Link: "",
        image2Link: "",
        image3Link: "",
        image4Link: "",
        image5Link: "",
    }



    const sendDetails = async (formData) => {
        formData.ownerID = (JSON.parse(localStorage.getItem('user'))).loginID
        formData.image1Link = image1Link
        formData.image2Link = image2Link
        formData.image3Link = image3Link
        formData.image4Link = image4Link
        formData.image5Link = image5Link


       
        let data = await (await fetch(api_base + "/uploadCar", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })).json()



        navigate(`car/${data._id}`)

    }



    const uploadCarSchema = Yup.object({
        carbrand: Yup.string().required("please select brand name"),
        price: Yup.number().positive().required("please enter car price"),
        phone: Yup.string()
            .matches(
                /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
                'Invalid phone number'
            )
            .required('Phone number is required'),
        year: Yup.number().required("please enter built year").min(1900, 'Year must be greater than or equal to 1900').max(new Date().getFullYear(), `Year can't be greater than current year`),
        address: Yup.string().required('address is required'),
        location: Yup.string().required('Place is required'),
        description: Yup.string().required("Please enter property description").min(5),
        kmdriven: Yup.number().positive().required("please enter km driven"),
        fueltype: Yup.string().required('please select fuel type'),
        transmission: Yup.string().required('please select no of owners'),
        noofowners: Yup.string().required('please select no of owners'),
        title: Yup.string().required('Please enter the title'),


        image1Link: Yup.mixed().required('please upload car image1').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            }),
        image2Link: Yup.mixed().required('please upload car image2').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            }),
        image3Link: Yup.mixed().required('please upload car image3').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            }),
        image4Link: Yup.mixed().required('please upload car image4').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            }),
        image5Link: Yup.mixed().required('please upload car image5').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            })
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: uploadCarSchema,
        onSubmit: (values, actions) => {
            sendDetails(values)
          
            actions.resetForm()
        }
    })



    return (
        <>
            <Navbar bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="carupload_container">
                <h3>Post your car</h3>


                <form onSubmit={handleSubmit}>
                    <div className="carbrand">
                        <label htmlFor="carbrand">Select your brand</label>
                        <select onChange={handleChange} onBlur={handleBlur} value={values.carbrand} name='carbrand'>
                            <option value="">Select a car brand</option>
                            <option value="Maruti Suzuki">Maruti Suzuki</option>
                            <option value="Hyundai">Hyundai</option>
                            <option value="Tata">Tata</option>
                            <option value="Mahindra">Mahindra</option>
                            <option value="Kia">Kia</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Honda">Honda</option>
                            <option value="Ford">Ford</option>
                            <option value="Volkswagen">Volkswagen</option>
                            <option value="Renault">Renault</option>
                            <option value="Nissan">Nissan</option>
                            <option value="Skoda">Skoda</option>
                            <option value="MG">MG</option>
                            <option value="Jeep">Jeep</option>
                            <option value="BMW">BMW</option>
                            <option value="Mercedes-Benz">Mercedes-Benz</option>
                            <option value="Audi">Audi</option>
                            <option value="Volvo">Volvo</option>
                        </select>
                        <p className='error'>{errors.carbrand && touched.carbrand ? errors.carbrand : null}</p>
                    </div>

                    <div className="year">
                        <label htmlFor="year">Year</label>
                        <input type="number" name='year' onChange={handleChange} onBlur={handleBlur} value={values.year} />
                        <p className='error'>{errors.year && touched.year ? errors.year : null}</p>

                    </div>

                    <div className="fueltype">
                        <p>Fuel Type</p>
                        <div className="allfuels">
                            <div className="cnghybrids" style={fueltype == 'cnghybrids' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setFueltype('cnghybrids')
                                setFieldValue('fueltype', 'cnghybrids')
                            }}>
                                <p>CNG & Hybrids</p>
                            </div>
                            <div className="diesel" style={fueltype == 'diesel' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setFueltype('diesel')
                                setFieldValue('fueltype', 'diesel')
                            }}>
                                <p>Diesel</p>
                            </div>
                            <div className="electric" style={fueltype == 'electric' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setFueltype('electric')
                                setFieldValue('fueltype', 'electric')
                            }}>
                                <p>Electric</p>
                            </div>
                            <div className="LPG" style={fueltype == 'LPG' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setFueltype('LPG')
                                setFieldValue('fueltype', 'LPG')
                            }}>
                                <p>LPG</p>
                            </div>
                            <div className="petrol" style={fueltype == 'petrol' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setFueltype('petrol')
                                setFieldValue('fueltype', 'petrol')
                            }}>
                                <p>Petrol</p>
                            </div>
                        </div>
                        <p className='error'>{errors.fueltype && touched.fueltype ? errors.fueltype : null}</p>

                    </div>

                    <div className="transmission">
                        <p>Transmission</p>
                        <div className="types">
                            <div className="automatic" style={transmission == 'automatic' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setTransmission('automatic')
                                setFieldValue('transmission', 'automatic')
                            }}>
                                <p>Automatic</p>
                            </div>
                            <div className="manual" style={transmission == 'manual' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setTransmission('manual')
                                setFieldValue('transmission', 'manual')
                            }}>
                                <p>Manual</p>
                            </div>
                        </div>
                        <p className='error'>{errors.transmission && touched.transmission ? errors.transmission : null}</p>

                    </div>

                    <div className="kmdriven">
                        <label htmlFor="kmdriven">kmdriven</label>
                        <input type="number" name='kmdriven' onChange={handleChange} onBlur={handleBlur} value={values.kmdriven} />
                        <p className='error'>{errors.kmdriven && touched.kmdriven ? errors.kmdriven : null}</p>

                    </div>

                    <div className="owners">
                        <p>No of owners</p>
                        <div className="number">
                            <div style={noofowners == '1st' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setNoofowners('1st')
                                setFieldValue('noofowners', '1st')
                            }}>
                                <p>1</p>
                            </div>
                            <div style={noofowners == '2nd' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setNoofowners('2nd')
                                setFieldValue('noofowners', '2nd')
                            }}>
                                <p>2</p>
                            </div>
                            <div style={noofowners == '3rd' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setNoofowners('3rd')
                                setFieldValue('noofowners', '3rd')
                            }}>
                                <p>3</p>
                            </div>
                            <div style={noofowners == '3+' ? { background: '#d5ebff', borderWidth: '2px' } : {}} onClick={() => {
                                setNoofowners('3+')
                                setFieldValue('noofowneres', '3+')
                            }}>
                                <p>3 +</p>
                            </div>

                        </div>
                        <p className='error'>{errors.noofowners && touched.noofowners ? errors.noofowners : null}</p>

                    </div>

                    <div className="title">
                        <label htmlFor="title">Title</label>
                        <input type="text" name='title' onChange={handleChange} onBlur={handleBlur} value={values.title} />
                        <p className='error'>{errors.title && touched.title ? errors.title : null}</p>

                    </div>

                    <div className="price">
                        <label htmlFor="price">Price</label>
                        <input type="number" name='price' onChange={handleChange} onBlur={handleBlur} value={values.price} />
                        <p className='error'>{errors.price && touched.price ? errors.price : null}</p>

                    </div>

                    <div className="price">
                        <label htmlFor="phone">Place</label>
                        <input type="text" name='location' onChange={handleChange} onBlur={handleBlur} value={values.location} />
                        <p className='error'>{errors.location && touched.location ? errors.location : null}</p>

                    </div>

                    <div className="price">
                        <label htmlFor="price">Address</label>
                        <input type="text" name='address' onChange={handleChange} onBlur={handleBlur} value={values.address} />
                        <p className='error'>{errors.address && touched.address ? errors.address : null}</p>

                    </div>

                    <div className="price">
                        <label htmlFor="phone">Phone</label>
                        <input type="number" name='phone' onChange={handleChange} onBlur={handleBlur} value={values.phone} />
                        <p className='error'>{errors.phone && touched.phone ? errors.phone : null}</p>

                    </div>




                    <div className="description">
                        <label htmlFor="description">Description</label>
                        <textarea name="description" id="" cols="30" rows="10" onChange={handleChange} onBlur={handleBlur} value={values.description}></textarea>
                        <p className='error'>{errors.description && touched.description ? errors.description : null}</p>

                    </div>




                    <div className="car_image_upload_container">
                        <div className="carimage">
                            <input type="file" id='file1' name='image1Link' onChange={(event) => {
                                setFieldValue('image1Link', event.currentTarget.files[0])
                                handleImage1Upload()
                                uploadimage(event, 1)

                            }} className='inputfile' />

                            <p className='error'>{errors.image1Link && touched.image1Link ? errors.image1Link : null}</p>
                            <div className="uploadedimage">
                                {image1IsLoading && !image1Link ? <ScaleLoader
                                    color="#80808087"
                                    height={20}
                                    loading
                                    width={10}
                                /> : null}
                                {image1Link && <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                                    <div style={{ width: "300px", height: "300px", overflow: "hidden" }}>
                                        <Image publicId={image1Link} />
                                    </div>
                                </CloudinaryContext>}
                            </div>
                        </div>

                        <div className="carimage">
                            <input type="file" id='file1' name='image2Link' onChange={(event) => {
                                setFieldValue('image2Link', event.currentTarget.files[0])
                                handleImage2Upload()
                                uploadimage(event, 2)

                            }} className='inputfile' />

                            <p className='error'>{errors.image2Link && touched.image2Link ? errors.image2Link : null}</p>
                            <div className="uploadedimage">
                                {image2IsLoading && !image2Link ? <ScaleLoader
                                    color="#80808087"
                                    height={20}
                                    loading
                                    width={10}
                                /> : null}
                                {image2Link && <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                                    <div style={{ width: "300px", height: "300px", overflow: "hidden" }}>
                                        <Image publicId={image2Link} />
                                    </div>
                                </CloudinaryContext>}
                            </div>
                        </div>

                        <div className="carimage">
                            <input type="file" id='file1' name='image3Link' onChange={(event) => {
                                setFieldValue('image3Link', event.currentTarget.files[0])
                                handleImage3Upload()
                                uploadimage(event, 3)

                            }} className='inputfile' />

                            <p className='error'>{errors.image3Link && touched.image3Link ? errors.image3Link : null}</p>
                            <div className="uploadedimage">
                                {image3IsLoading && !image3Link ? <ScaleLoader
                                    color="#80808087"
                                    height={20}
                                    loading
                                    width={10}
                                /> : null}
                                {image3Link && <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                                    <div style={{ width: "300px", height: "300px", overflow: "hidden" }}>
                                        <Image publicId={image3Link} />
                                    </div>
                                </CloudinaryContext>}
                            </div>
                        </div>

                        <div className="carimage">
                            <input type="file" id='file1' name='image4Link' onChange={(event) => {
                                setFieldValue('image4Link', event.currentTarget.files[0])
                                handleImage4Upload()
                                uploadimage(event, 4)

                            }} className='inputfile' />

                            <p className='error'>{errors.image4Link && touched.image4Link ? errors.image4Link : null}</p>
                            <div className="uploadedimage">
                                {image4IsLoading && !image4Link ? <ScaleLoader
                                    color="#80808087"
                                    height={20}
                                    loading
                                    width={10}
                                /> : null}
                                {image4Link && <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                                    <div style={{ width: "300px", height: "300px", overflow: "hidden" }}>
                                        <Image publicId={image4Link} />
                                    </div>
                                </CloudinaryContext>}
                            </div>
                        </div>

                        <div className="carimage">
                            <input type="file" id='file5' name='image5Link' onChange={(event) => {
                                setFieldValue('image5Link', event.currentTarget.files[0])
                                handleImage5Upload()
                                uploadimage(event, 5)

                            }} className='inputfile' />

                            <p className='error'>{errors.image5Link && touched.image5Link ? errors.image5Link : null}</p>
                            <div className="uploadedimage">
                                {image5IsLoading && !image5Link ? <ScaleLoader
                                    color="#80808087"
                                    height={20}
                                    loading
                                    width={10}
                                /> : null}
                                {image5Link && <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                                    <div style={{ width: "300px", height: "300px", overflow: "hidden" }}>
                                        <Image publicId={image5Link} />
                                    </div>
                                </CloudinaryContext>}
                            </div>
                        </div>


                    </div>


                    <div className="button_div">

                        <button type='submit'>
                            <p>POST</p>
                        </button>

                    </div>



                </form>
            </div>
        </>
    )
}

export default UploadCar