
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

import { useEffect, useState } from "react";

function App() {



  const [isAuthenticated, setisAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setisAuthenticated(true);
    } else {
      setisAuthenticated(false);
    }
  }, []);


  return (
    <div>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>

          <Route path="/signinup" element={<Signinup />}></Route>

          <Route path="/allhouses" element={isAuthenticated ? <AllHouses /> : <Signinup />}></Route>

          <Route path="/house/:houseID" element={isAuthenticated ? <House_page /> : <Signinup />}></Route>
          <Route path="sell/house/:houseID" element={isAuthenticated ? <House_page /> : <Signinup />}></Route>


          <Route path="/allhouses/house/:houseID" element={isAuthenticated ? <House_page /> : <Signinup />}></Route>



          <Route path="/allapartments" element={isAuthenticated ? <AllApartments /> : <Signinup />}></Route>
          <Route path="/apartment/:apartmentID" element={isAuthenticated ? <Apartment_page /> : <Signinup />}></Route>
          <Route path="sell/apartment/:apartmentID" element={isAuthenticated ? <Apartment_page /> : <Signinup />}></Route>

          <Route path="/allapartments/apartment/:apartmentID" element={isAuthenticated ? <Apartment_page /> : <Signinup />}></Route>



          <Route path="apartment">
            <Route path=":apartmentID" element={isAuthenticated ? <Apartment_page /> : <Signinup />}></Route>
          </Route>

          <Route path="/gallery" element={<Gallery />}></Route>
          <Route path="/sell" element={isAuthenticated ? <SellnowPage /> : <Signinup />}></Route>
        </Routes>
      </BrowserRouter>

      <Footer />

    </div>
  );
}

export default App;
