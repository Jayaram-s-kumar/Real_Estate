
import House_page from "./Components/House Page/House_page";
import Homepage from "./Pages/Homepage";
import AllHouses from "./Components/AllHoues/AllHouses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./Pages/Gallery";
import Apartment_page from "./Components/Apartment Page/Apartment_page";
import AllApartments from "./Components/AllApartments/AllApartments";
import Footer from "./Components/Footer/Footer";
import SellnowPage from "./Components/SellnowPage/SellnowPage";
import Signinup from "./Components/Signinup/Signinup";
import UploadCar from "./Components/UploadCar/UploadCar"
import Carpage from "./Components/Car_page/Carpage";
import Allcars from "./Components/Allcars/Allcars";
import SellNow from "./Components/SellNow/SellNow";
import MyAccount from "./Components/MyAccount/MyAccount";
import SendRegEmail from "./Components/sendRegEmail/SendRegEmail";
import SendOtp from "./Components/SendOtp/SendOtp";
import PassReset from "./Components/PassReset/PassReset";
import { useEffect, useState } from "react";

//import {DotenvConfigOptions} from 'dotenv'

function App() {




  const isAuthenticated = ()=>{
    const user = (JSON.parse(localStorage.getItem('user'))) ? true : false;
    console.log(user)
    if (user) {
     return true
    } else {
      return false
    }
  }

  useEffect(() => {
   
  }, []);


  return (
    <div>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>

          <Route path="/signinup" element={<Signinup />}></Route>

          <Route path="/allhouses" element={ <AllHouses /> }></Route>

          <Route path="/house/:houseID" element={ <House_page /> }></Route>
          <Route path="sell/house/:houseID" element={ <House_page /> }></Route>


          <Route path="/allhouses/house/:houseID" element={ <House_page /> }></Route>
          <Route path="/myaccount/house/:houseID" element={ <House_page /> }></Route>



          <Route path="/allapartments" element={ <AllApartments /> }></Route>
          <Route path="/apartment/:apartmentID" element={ <Apartment_page /> }></Route>
          <Route path="sell/apartment/:apartmentID" element={ <Apartment_page /> }></Route>
 
          <Route path="/allapartments/apartment/:apartmentID" element={ <Apartment_page /> }></Route>
          <Route path="/myaccount/apartment/:apartmentID" element={ <Apartment_page /> }></Route>



          <Route path="apartment">
            <Route path=":apartmentID" element={ <Apartment_page /> }></Route>
          </Route>

          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/sell" element={ <SellnowPage /> }></Route>

          <Route path="/uploadcar" element={<UploadCar/>}></Route>

          <Route path="/allcars" element={ <Allcars/>  } ></Route>
          <Route path="/car/:carID" element={ <Carpage/> } ></Route>
          <Route path="uploadcar/car/:carID" element={ <Carpage/> } ></Route>
          <Route path="allcars/car/:carID" element={ <Carpage/> } ></Route>
          <Route path="/myaccount/car/:carID" element={ <Carpage/> } ></Route>


          <Route path="/sellnow" element={ <SellNow/> }></Route>

          <Route path="/sendRegEmail" element={<SendRegEmail/>}></Route>

          <Route path="/myaccount"  element={ <MyAccount/> }></Route>

          <Route path="/otppage/:email" element={<SendOtp/>}></Route>

          <Route path="/otppage/:email/newpass/:email" element={<PassReset/>}></Route>
        </Routes>
      </BrowserRouter>

      <Footer />

    </div>
  );
}

export default App;
