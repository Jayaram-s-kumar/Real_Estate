
import House_page from "./Components/House Page/House_page";
import Homepage from "./Pages/Homepage";
import AllHouses from "./Components/AllHoues/AllHouses";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Gallery from "./Pages/Gallery";
import Apartment_page from "./Components/Apartment Page/Apartment_page";
import AllApartments from "./Components/AllApartments/AllApartments";
import Footer from "./Components/Footer/Footer";
function App() {
  return (
    <div>


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}></Route>

          <Route path="/allhouses" element={<AllHouses />}></Route>

          <Route path="/house/:houseID" element={<House_page/>}></Route>


          <Route path="/allhouses/house/:houseID" element={<House_page/>}></Route>

         

          <Route path="/allapartments" element={<AllApartments/>}></Route>
          <Route path="/apartment/:apartmentID" element={<Apartment_page/>}></Route>

          <Route path="/allapartments/apartment/:apartmentID" element={<Apartment_page/>}></Route>

         

          <Route path="apartment">
            <Route path=":apartmentID" element={<Apartment_page />}></Route>
          </Route>

          <Route path="/gallery" element={<Gallery />}></Route>
        </Routes>
      </BrowserRouter>

      <Footer/>

    </div>
  );
}

export default App;
