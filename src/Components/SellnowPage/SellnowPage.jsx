import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navabar/Navbar'
import './SellnowPage.scss'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormGroup } from '@mui/material';
import { Checkbox } from '@mui/material';
import { FormControlLabel } from '@mui/material'
import * as Yup from 'yup'
import { CloudinaryContext, Image, } from 'cloudinary-react'


import { ScaleLoader } from 'react-spinners'
import { useFormik } from 'formik'
import { ClipLoader } from 'react-spinners';


const SellnowPage = () => {

    const navigate = useNavigate()

    const [makeButtonLoading, setMakeButtonLoading] = useState(false)


    useEffect(() => {

        if (!localStorage.getItem('user')) {
            navigate('/signinup', { replace: true })//This will replace the /sell rouote in history stack to /signinup.
            //so when pressing back button the previous page will be home page      
        }

    }, [])

    useEffect(() => {
        window.addEventListener('beforeunload', window.scrollTo(0, 0))

        return () => {
            window.removeEventListener('beforeunload', window.scrollTo(0, 0))
        }
    }, [])






     const api_base = 'http://localhost:3001'

    //const api_base = 'https://real-estate-backend-yuae.onrender.com'


    const cloudName = 'dfs1badkm'
    const uploadPreset = 'zomato'
    const apiKey = '994475553562163'

    const [image1Link, setImage1Link] = useState('')
    const [image2Link, setImage2Link] = useState('')
    const [image3Link, setImage3Link] = useState('')
    const [image4Link, setImage4Link] = useState('')
    const [image5Link, setImage5Link] = useState('')
    const [doc1Link, setDoc1Link] = useState('')
    const [doc2Link, setDoc2Link] = useState('')
    const [image1IsLoading, setImage1IsLoading] = useState(false)
    const [image2IsLoading, setImage2IsLoading] = useState(false)
    const [image3IsLoading, setImage3IsLoading] = useState(false)
    const [image4IsLoading, setImage4IsLoading] = useState(false)
    const [image5IsLoading, setImage5IsLoading] = useState(false)
    const [doc1IsLoading, setDoc1IsLoading] = useState(false)
    const [doc2IsLoading, setDoc2IsLoading] = useState(false)
    const [doc1Name, setDoc1Name] = useState('')
    const [doc2Name, setDoc2Name] = useState('')


    const [apartment, setApartment] = useState(false)//for changing options when aparatment is selected



    const [carPorch, setCarPorch] = useState(false)
    const [Ac, setAc] = useState(false)
    const [Laundary, setLaundary] = useState(false)
    const [Tv, setTv] = useState(false)
    const [storage, setStorage] = useState(false)
    const [internet, setInternet] = useState(false)
    const [pool, setPool] = useState(false)
    const [gate, setGate] = useState(false)
    const [camera, setCamera] = useState(false)
    const [garden, setGarden] = useState(false)
    const [fitness, setFitness] = useState(false)
    const [seaview, setSeaview] = useState(false)


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

    const handleDoc1Upload = () => {
        setDoc1IsLoading(true)
    }
    const handleDoc2Upload = () => {
        setDoc2IsLoading(true)
    }


    const initialValues = {
        propType: "",
        propName: "",
        price: "",
        phone: "",
        email: "",
        sqfeet: "",
        lotsize: "",
        year: "",
        streetAddress: "",
        city: "",
        state: "",
        postalCode: "",
        furnishType: "",
        storyType: "no value",
        ownName: '',
        bedrooms: "",
        bathrooms: "",
        internet,
        pool,
        seaview,
        carPorch,
        garden,
        fitness,
        Ac,
        Laundary,
        Tv,
        storage,
        gate,
        camera,
        description: "",
        image1Link: "",
        image2Link: "",
        image3Link: "",
        image4Link: "",
        image5Link: "",
        doc1Link: "",
        doc2Link: "",

    }


    const addPropSchema = Yup.object({
        propType: Yup.string().required("please select property type"),
        propName: Yup.string().required("please enter property name"),
        price: Yup.number().positive().required("please enter property price"),
        phone: Yup.string()
            .matches(
                /^(\+91[\-\s]?)?[0]?(91)?[6789]\d{9}$/,
                'Invalid phone number'
            )
            .required('Phone number is required'),
        email: Yup.string().email().required("please provide your email"),
        sqfeet: Yup.number().positive().required("please enter sqfeet"),
        lotsize:apartment ? Yup.number() : Yup.number().positive().required("please enter Lotsize"),
        year: Yup.number().required("please enter built year").min(1900, 'Year must be greater than or equal to 1900').max(new Date().getFullYear(), `Year can't be greater than current year`),
        streetAddress: Yup.string().required('Street address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string()
            .required('State is required'),
        postalCode: Yup.string()
            .required('Postal code is required')
            .matches(/^\d{6}$/, 'Invalid postal code'),
        furnishType: Yup.string().required("please select furnish type"),
        storyType: Yup.string(),
        ownName: Yup.string().required('please enter owner name'),
        bedrooms: Yup.number().positive().required("please enter number of bedrooms"),
        bathrooms: Yup.number().positive().required("please select number of bathrooms"),
        description: Yup.string().required("Please enter property description").min(5),
        internet: Yup.boolean(),
        pool: Yup.boolean(),
        carPorch: Yup.boolean(),
        garden: Yup.boolean(),
        Ac: Yup.boolean(),
        Laundary: Yup.boolean(),
        Tv: Yup.boolean(),
        storage: Yup.boolean(),
        gate: Yup.boolean(),
        camera: Yup.boolean(),
        image1Link: Yup.mixed().required('please upload property image1').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            }),
        image2Link: Yup.mixed().required('please upload property image2').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            }),
        image3Link: Yup.mixed().required('please upload property image3').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            }),
        image4Link: Yup.mixed().required('please upload property image4').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            }),
        image5Link: Yup.mixed().required('please upload property image5').test('fileFormat', 'Unsupported file format',
            (value) => {
                if (value) {
                    return ['image/jpeg', 'image/png'].includes(value.type)
                }
                return true
            }),
        doc1Link: Yup.mixed()
            .required('please upload document1')
            .test('fileFormat', 'Unsupported file format. Only PDF and DOCX files are allowed.', (value) => {
                if (value) {
                    return ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type);
                }
                return true;
            }),
        doc2Link: Yup.mixed()
            .required('please upload document2')
            .test('fileFormat', 'Unsupported file format. Only PDF and DOCX files are allowed.', (value) => {
                if (value) {
                    return ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type);
                }
                return true;
            })

    })


    const { values, errors, touched, handleBlur, handleChange, handleSubmit, setFieldValue } = useFormik({
        initialValues,
        validationSchema: addPropSchema,
        onSubmit: (values, actions) => {
            sendDetails(values)

            actions.resetForm()
        }
    })

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
                    setImage1Link(data.url.replace(/^http:\/\//i, 'https://'))
                    setImage1IsLoading(false)
                } else if (num === 2) {
                    setImage2Link(data.url.replace(/^http:\/\//i, 'https://'))
                    setImage2IsLoading(false)
                }
                else if (num === 3) {
                    setImage3Link(data.url.replace(/^http:\/\//i, 'https://'))
                    setImage3IsLoading(false)
                }
                else if (num === 4) {
                    setImage4Link(data.url.replace(/^http:\/\//i, 'https://'))
                    setImage4IsLoading(false)
                }
                else if (num === 5) {
                    setImage5Link(data.url.replace(/^http:\/\//i, 'https://'))
                    setImage5IsLoading(false)
                } else if (num === 6) {
                    setDoc1Link(data.url.replace(/^http:\/\//i, 'https://'))
                    setDoc1IsLoading(false)
                }
                else if (num === 7) {
                    setDoc2Link(data.url.replace(/^http:\/\//i, 'https://'))
                    setDoc2IsLoading(false)
                }


            })
            .catch((err) => {

            })

    }




    const sendDetails = async (formData) => {
        setMakeButtonLoading(true)
        formData.ownerID = JSON.parse(localStorage.getItem('user')).loginID
        formData.image1Link = image1Link
        formData.image2Link = image2Link
        formData.image3Link = image3Link
        formData.image4Link = image4Link
        formData.image5Link = image5Link
        formData.doc1Link = doc1Link
        formData.doc2Link = doc2Link




        let data = await (await fetch(api_base + "/uploadProp", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })).json()



        if (apartment) {
            navigate(`apartment/${data._id}`)
        } else {
            navigate(`house/${data._id}`)
        }

    }





    return (
        <>
            <Navbar bs={'rgba(149, 157, 165, 0.2) 0px 8px 24px'} selected={'sell'} bg='white' txtCol={'black'} hoverClass={'LightHover'} />

            <div className="sellNowContainer">
                <div className="animation">

                </div>
                <form onSubmit={(val) => {
                    handleSubmit(val)

                }}>
                    <h3>Upload Your Property Details</h3>
                    <Box sx={{}} style={{ width: '100%' }}>
                        <div className="proptype" >
                            <p className='labelclass'>Property type</p>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                                <Select
                                    value={values.propType}
                                    label="fdgfdghdf"
                                    name='propType'
                                    onChange={(e) => {
                                        // setPropType(e.target.value)
                                        handleChange(e)
                                        if (e.target.value === "Apartments") {
                                            setApartment(true)
                                        } else {
                                            setApartment(false)
                                        }
                                    }}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value={"House"}>Houses</MenuItem>
                                    {/* <MenuItem value={"Townhomes"}>Townhomes</MenuItem>
                                    <MenuItem value={"Multifamily"}>Multifamily</MenuItem> */}
                                    <MenuItem value={"Apartments"}>Apartments</MenuItem>
                                </Select>
                                <p className='error'>{errors.propType && touched.propType ? errors.propType : null}</p>
                            </FormControl>
                        </div>

                    </Box>


                    <div className='suboptions'>
                        <p>Property name</p>
                        <div>
                            <input type="text" name='propName' onChange={handleChange} onBlur={handleBlur} value={values.propName} />
                            <p className='error'>{errors.propName && touched.propName ? errors.propName : null}</p>
                        </div>
                    </div>
                    <div className='suboptions'>
                        <p>Owner name</p>
                        <div>
                            <input type="text" name='ownName' onChange={handleChange} onBlur={handleBlur} value={values.ownName} />
                            <p className='error'>{errors.ownName && touched.ownName ? errors.ownName : null}</p>
                        </div>
                    </div>
                    <div className="suboptions">
                        <p>Price Rs</p>
                        <div>
                            <input type="number" name='price' onChange={handleChange} onBlur={handleBlur} />
                            <p className='error'>{errors.price && touched.price ? errors.price : null}</p>
                        </div>
                    </div>
                    <div className="suboptions">
                        <p>Contact Phone</p>
                        <div>
                            <input type="text" name='phone' onChange={handleChange} onBlur={handleBlur} />
                            <p className='error'>{errors.phone && touched.phone ? errors.phone : null}</p>
                        </div>
                    </div>
                    <div className="suboptions">
                        <p>Contact Email</p>
                        <div>
                            <input type="text" name='email' onChange={handleChange} onBlur={handleBlur} />
                            <p>{errors.email && touched.email ? errors.email : null}</p>

                        </div>
                    </div>
                    <div className="suboptions">
                        <p>Sq feet</p>
                        <div>
                            <input type="number" name='sqfeet' onChange={handleChange} onBlur={handleBlur} />
                            <p>{errors.sqfeet && touched.sqfeet ? errors.sqfeet : null}</p>
                        </div>
                    </div>
                    {
                        !apartment && <div className="suboptions">
                            <p>Lot size</p>
                            <div>
                                <input type="number" name='lotsize' onChange={handleChange} onBlur={handleBlur} />
                                <p>{errors.lotsize && touched.lotsize ? errors.lotsize : null}</p>
                            </div>
                        </div>
                    }
                    <div className="suboptions">
                        <p>Year built</p>
                        <div>
                            <input type="number" name='year' onChange={handleChange} onBlur={handleBlur} />
                            <p>{errors.year && touched.year ? errors.year : null}</p>
                        </div>
                    </div>
                    <div className="suboptions">
                        <p>Street Address</p>
                        <div>
                            <input type="text" name='streetAddress' onChange={handleChange} onBlur={handleBlur} />
                            <p>{errors.streetAddress && touched.streetAddress ? errors.streetAddress : null}</p>
                        </div>
                    </div>
                    <div className="suboptions">
                        <p>City</p>
                        <div>
                            <input type="text" name='city' onChange={handleChange} onBlur={handleBlur} />
                            <p>{errors.city && touched.city ? errors.city : null}</p>
                        </div>
                    </div>
                    <div className="suboptions">
                        <p>State</p>
                        <div>
                            <input type="text" name='state' onChange={handleChange} onBlur={handleBlur} />
                            <p>{errors.state && touched.state ? errors.state : null}</p>
                        </div>
                    </div>
                    <div className="suboptions">
                        <p>Postal Code</p>
                        <div>
                            <input type="text" name='postalCode' onChange={handleChange} onBlur={handleBlur} />
                            <p>{errors.postalCode && touched.postalCode ? errors.postalCode : null}</p>
                        </div>
                    </div>

                    <div className="suboptions" style={{ marginTop: '15px', width: '80%' }}>
                        <p style={{ marginBottom: '12px' }}>Description</p>
                        <div style={{ width: '81%' }}>
                            <textarea name='description' style={{ height: "100px", width: '100%' }} onChange={handleChange} onBlur={handleBlur} value={values.description}></textarea>
                            <p>{errors.description && touched.description ? errors.description : null}</p>
                        </div>
                    </div>

                    <h3>Furter Details</h3>

                    <Box sx={{}} style={{ width: '100%' }}>
                        <div className="proptype" >
                            <p className='labelclass'>Furnishing</p>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Select</InputLabel>
                                <Select
                                    value={values.furnishType}
                                    label="fdgfdghdf"
                                    name='furnishType'
                                    onChange={(e) => {
                                        //// setFurnishType(e.target.value)
                                        handleChange(e)
                                    }}
                                    onBlur={handleBlur}
                                >
                                    <MenuItem value={"Furnished"}>Furnished</MenuItem>
                                    <MenuItem value={"Unfurnished"}>Unfurnished</MenuItem>
                                    <MenuItem value={"Partially furnished"}>Partially furnished</MenuItem>
                                </Select>
                                <p className='error'>{errors.furnishType && touched.furnishType ? errors.furnishType : null}</p>
                            </FormControl>
                        </div>

                    </Box>



                    <div className="suboptions">
                        <p>Bedrooms {apartment && '(In Single Unit)'}</p>
                        <div>
                            <input type="number" name='bedrooms' onChange={handleChange} onBlur={handleBlur} />
                            <p style={{ marginBottom: '16px' }}>{errors.bedrooms && touched.bedrooms ? errors.bedrooms : null}</p>
                        </div>
                    </div>

                    <div className="suboptions">
                        <p>Bathrooms {apartment && '(In Single Unit)'}</p>
                        <div>
                            <input type="number" name='bathrooms' onChange={handleChange} onBlur={handleBlur} />
                            <p>{errors.bathrooms && touched.bathrooms ? errors.bathrooms : null}</p>
                        </div>
                    </div>

                    {
                        !apartment && <Box sx={{}} style={{ width: '100%' }}>
                            <div className="proptype" >
                                <p className='labelclass'>Number of stories</p>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Select</InputLabel>
                                    <Select
                                        value={values.storyType}
                                        label="fdgfdghdf"
                                        name='storyType'
                                        onChange={(e) => {
                                            //// setStoryType(e.target.value)
                                            handleChange(e)
                                        }}
                                        onBlur={handleBlur}
                                    >
                                        <MenuItem value={"Single story"}>Single Story</MenuItem>
                                        <MenuItem value={"Two stories"}>Two Stories</MenuItem>
                                        <MenuItem value={"Three stories"}>Three Stories</MenuItem>
                                        <MenuItem value={"Four or more stories"}>Four Stories</MenuItem>
                                    </Select>
                                    <p>{errors.storyType && touched.storyType ? errors.storyType : null}</p>
                                </FormControl>
                            </div>

                        </Box>
                    }


                    <div className="suboptions makeitrow">
                        <p>High Speed Internet</p>
                        <div className="checking">
                            <FormGroup >
                                <FormControlLabel control={<Checkbox />} label="Yes" value={values.internet} onChange={handleChange} name='internet' />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="suboptions makeitrow">
                        <p>Swimming pool</p>
                        <div className="checking">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Yes" value={values.pool} onChange={handleChange} name='pool' />
                            </FormGroup>
                        </div>
                    </div>

                    {
                        apartment && <div className="suboptions makeitrow">
                            <p>Sea view</p>
                            <div className="checking">
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Yes" name='seaview' onChange={handleChange} value={values.seaview} />
                                </FormGroup>
                            </div>
                        </div>

                    }

                    <div className="suboptions makeitrow">
                        <p>Car porch</p>
                        <div className="checking">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Yes" name='carPorch' value={values.carPorch} onChange={handleChange} />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="suboptions makeitrow">
                        <p>Garden</p>
                        <div className="checking">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Yes" name='garden' onChange={handleChange} value={values.garden} />
                            </FormGroup>
                        </div>
                    </div>


                    {
                        apartment && <div className="suboptions makeitrow">
                            <p>Fitness center</p>
                            <div className="checking">
                                <FormGroup>
                                    <FormControlLabel control={<Checkbox />} label="Yes" name='fitness' onChange={handleChange} value={values.fitness} />
                                </FormGroup>
                            </div>
                        </div>

                    }

                    <div className="suboptions makeitrow">
                        <p>AC</p>
                        <div className="checking">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Yes" name='Ac' onChange={handleChange} value={values.Ac} />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="suboptions makeitrow">
                        <p>Laundary</p>
                        <div className="checking">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Yes" name='Laundary' onChange={handleChange} value={values.Laundary} />
                            </FormGroup>
                        </div>
                    </div>



                    <div className="suboptions makeitrow">
                        <p>Cable or Satellite TV</p>
                        <div className="checking">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Yes" name='Tv' onChange={handleChange} value={values.Tv} />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="suboptions makeitrow">
                        <p>Storage</p>
                        <div className="checking">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Yes" name='storage' onChange={handleChange} value={values.storage} />
                            </FormGroup>
                        </div>
                    </div>


                    <div className="suboptions makeitrow">
                        <p>Gated Entrance</p>
                        <div className="checking">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Yes" name='gate' onChange={handleChange} value={values.gate} />
                            </FormGroup>
                        </div>
                    </div>

                    <div className="suboptions makeitrow">
                        <p>Security Cameras</p>
                        <div className="checking">
                            <FormGroup>
                                <FormControlLabel control={<Checkbox />} label="Yes" name='camera' onChange={handleChange} value={values.camera} />
                            </FormGroup>
                        </div>
                    </div>






                    <h3>Upload images</h3>


                    <div className='inputbox'>
                        <input type="file" id='file1' name='image1Link' onChange={(event) => {
                            setFieldValue('image1Link', event.currentTarget.files[0])
                            handleImage1Upload()
                            uploadimage(event, 1)

                        }} className='inputfile' />

                        <p className='error'>{errors.image1Link && touched.image1Link ? errors.image1Link : null}</p>
                        <div className="uploadedimage">
                            {!image1IsLoading && !image1Link && <label htmlFor="file1">
                                <img src="/images/upload.png" alt="" />
                            </label>}
                            {
                                image1Link && <div className='deleteimage' onClick={() => {
                                    setImage1Link('')
                                    document.getElementById("file1").value = '';
                                    setFieldValue('image1Link', '')

                                }}>
                                    <img src="/images/delete.png" alt="" />
                                </div>
                            }
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



                    <div className='inputbox'>
                        <input type="file" id='file2' name='image2Link' onChange={(event) => {
                            setFieldValue('image2Link', event.currentTarget.files[0])
                            handleImage2Upload()
                            uploadimage(event, 2)

                        }} className='inputfile' />

                        <p className='error'>{errors.image2Link && touched.image2Link ? errors.image2Link : null}</p>
                        <div className="uploadedimage">
                            {!image2IsLoading && !image2Link && <label htmlFor="file2">
                                <img src="/images/upload.png" alt="" />
                            </label>}
                            {
                                image2Link && <div className='deleteimage' onClick={() => {
                                    setImage2Link('')
                                    document.getElementById("file2").value = '';
                                    setFieldValue('image2Link', '')

                                }}>
                                    <img src="/images/delete.png" alt="" />
                                </div>
                            }
                            {image2IsLoading && !image2Link ? <ScaleLoader
                                color="#80808087"
                                height={20}
                                loading
                                width={10}
                            /> : null}
                            {
                                image2Link && <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                                    <div style={{ width: "300px", height: "300px", overflow: "hidden" }}>
                                        <Image publicId={image2Link} />
                                    </div>
                                </CloudinaryContext>
                            }
                        </div>


                    </div>


                    <div className='inputbox'>
                        <input type="file" id='file3' name='image3Link' onChange={(event) => {
                            setFieldValue('image3Link', event.currentTarget.files[0])
                            handleImage3Upload()
                            uploadimage(event, 3)

                        }} className='inputfile' />

                        <p className='error'>{errors.image3Link && touched.image3Link ? errors.image3Link : null}</p>
                        <div className="uploadedimage">
                            {!image3IsLoading && !image3Link && <label htmlFor="file3">
                                <img src="/images/upload.png" alt="" />
                            </label>}
                            {
                                image3Link && <div className='deleteimage' onClick={() => {
                                    setImage3Link('')
                                    document.getElementById("file3").value = '';
                                    setFieldValue('image3Link', '')

                                }}>
                                    <img src="/images/delete.png" alt="" />
                                </div>
                            }
                            {image3IsLoading && !image3Link ? <ScaleLoader
                                color="#80808087"
                                height={20}
                                loading
                                width={10}
                            /> : null}
                            {
                                image3Link && <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                                    <div style={{ width: "300px", height: "300px", overflow: "hidden" }}>
                                        <Image publicId={image3Link} />
                                    </div>
                                </CloudinaryContext>
                            }
                        </div>

                    </div>


                    <div className='inputbox'>
                        <input type="file" id='file4' name='image4Link' onChange={(event) => {
                            setFieldValue('image4Link', event.currentTarget.files[0])
                            handleImage4Upload()
                            uploadimage(event, 4)

                        }} className='inputfile' />

                        <p className='error'>{errors.image4Link && touched.image4Link ? errors.image4Link : null}</p>
                        <div className="uploadedimage">
                            {!image4IsLoading && !image4Link && <label htmlFor="file4">
                                <img src="/images/upload.png" alt="" />
                            </label>}
                            {
                                image4Link && <div className='deleteimage' onClick={() => {
                                    setImage4Link('')
                                    document.getElementById("file4").value = '';
                                    setFieldValue('imageL4ink', '')

                                }}>
                                    <img src="/images/delete.png" alt="" />
                                </div>
                            }
                            {image4IsLoading && !image4Link ? <ScaleLoader
                                color="#80808087"
                                height={20}
                                loading
                                width={10}
                            /> : null}
                            {
                                image4Link && <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                                    <div style={{ width: "300px", height: "300px", overflow: "hidden" }}>
                                        <Image publicId={image4Link} />
                                    </div>
                                </CloudinaryContext>
                            }
                        </div>

                    </div>


                    <div className='inputbox'>
                        <input type="file" id='file5' name='image5Link' onChange={(event) => {
                            setFieldValue('image5Link', event.currentTarget.files[0])
                            handleImage5Upload()
                            uploadimage(event, 5)

                        }} className='inputfile' />

                        <p className='error'>{errors.image5Link && touched.image5Link ? errors.image5Link : null}</p>
                        <div className="uploadedimage">
                            {!image5IsLoading && !image5Link && <label htmlFor="file5">
                                <img src="/images/upload.png" alt="" />
                            </label>}
                            {
                                image5Link && <div className='deleteimage' onClick={() => {
                                    setImage5Link('')
                                    document.getElementById("file5").value = '';
                                    setFieldValue('image5Link', '')

                                }}>
                                    <img src="/images/delete.png" alt="" />
                                </div>
                            }
                            {image5IsLoading && !image5Link ? <ScaleLoader
                                color="#80808087"
                                height={20}
                                loading
                                width={10}
                            /> : null}
                            {
                                image5Link && <CloudinaryContext cloudName={cloudName} apiKey={apiKey}>
                                    <div style={{ width: "300px", height: "300px", overflow: "hidden" }}>
                                        <Image publicId={image5Link} />
                                    </div>
                                </CloudinaryContext>
                            }
                        </div>

                    </div>
                    <h3>Upload documents</h3>


                    <div className="uploadbox">
                        <div className="uploadedfile">
                            {
                                !doc1Link && !doc1IsLoading && <label htmlFor="docfile1">
                                    <img src="/images/upload-file.png" alt="" />
                                </label>
                            }
                            {
                                doc1Link && <img src="/images/google-docs.png" alt="" />

                            }
                            {
                                doc1Link && <p>{doc1Name}</p>

                            }

                            {
                                doc1Link && <img src="/images/multiply.png" alt="" className='deletebutton' onClick={() => {
                                    setFieldValue('doc1Link', '')
                                    setDoc1Name('')
                                    setDoc1Link('')
                                    document.getElementById('docfile1').value = ''
                                }} />

                            }
                            <input type="file" id='docfile1' name='doc1Link' onChange={(event) => {
                                setFieldValue('doc1Link', event.currentTarget.files[0])
                                setDoc1Name(event.currentTarget.files[0].name)
                                handleDoc1Upload()
                                uploadimage(event, 6)
                            }} />
                            {doc1IsLoading && !doc1Link ? <ScaleLoader
                                color="#80808087"
                                height={20}
                                loading
                                width={10}
                            /> : null}
                            <p className='error'>{errors.doc1Link && touched.doc1Link ? errors.doc1Link : null}</p>

                        </div>

                        <div className="uploadedfile">
                            {
                                !doc2Link && !doc2IsLoading && <label htmlFor="docfile2">
                                    <img src="/images/upload-file.png" alt="" />
                                </label>
                            }
                            {
                                doc2Link && <img src="/images/google-docs.png" alt="" />

                            }
                            {
                                doc2Link && <p>{doc2Name}</p>

                            }

                            {
                                doc2Link && <img src="/images/multiply.png" alt="" className='deletebutton' onClick={() => {
                                    setFieldValue('doc2Link', '')
                                    setDoc2Name('')
                                    setDoc2Link('')
                                    document.getElementById('docfile2').value = ''
                                }} />

                            }

                            <input type="file" id='docfile2' name='doc2Link' onChange={(event) => {
                                setFieldValue('doc2Link', event.currentTarget.files[0])
                                setDoc2Name(event.currentTarget.files[0].name)
                                handleDoc2Upload()
                                uploadimage(event, 7)
                            }} onBlur={handleBlur} />
                            {doc2IsLoading && !doc2Link ? <ScaleLoader
                                color="#80808087"
                                height={20}
                                loading
                                width={10}
                            /> : null}
                            <p className='error'>{errors.doc2Link && touched.doc2Link ? errors.doc2Link : null}</p>

                        </div>

                    </div>

                    <div className="button_div">

                        <button type='submit' disabled={makeButtonLoading}>
                            <ClipLoader color="#ffffff" className='loading' size={15} loading={makeButtonLoading} />
                            <p>POST</p>
                        </button>

                    </div>

                </form>
            </div>



        </>
    )
}




export default SellnowPage