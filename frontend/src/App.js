import React from 'react';
import Header from "./components/pages/Header/Header.js";
import MainPage from "./components/Home";
import Register from "./components/pages/Register/Register.js"
import Login from "./components/pages/Login/Login.js";
import Warehouse from "./components/pages/Warehouse/Warehouse.js";
import AboutSection from "./components/pages/About/About.js"
import ContactSection from "./components/pages/Contact/Contact.js";
import Footer from "./components/pages/Footer/Footer.js";
import Partner from "./components/pages/Partner/Partner.js";
import Storage from "./components/Storage";
import Map from "./components/pages/Map/Map"
import Careers from "./components/pages/Careers/Careers"
import Cart from "./components/pages/Cart/Cart";
import YourOrders from "./components/pages/Profile/YourOrders";
import AdminDashboard from './components/pages/AdminDashboard/AdminDashboard.js';
import Live from "./components/live.js";
import AllImageSection from "./components/pages/Warehouse/AllImageSection";
import Underconstruction from "./components/pages/Underconstruction/Underconstruction";
import CheckoutSection from "./components/Checkout";
import Profile from "./components/pages/Profile/Profile";
import Refund from "./components/pages/Refund/Refund.js";
import ListedSpace from "./components/pages/ListedSpace/ListedSpace.js";
import AllListedSpace from './components/pages/allListedSpace/allListedSpace.js';
import PaymentSuccess from './components/pages/PaymentSuccess/PaymentSuccess.js';
import { Routes, Route } from "react-router-dom";
import "./components/css/Style.css";
import "./Contexts/context";
import Provider from "./provider";
// import Test from "./components/Test.js";

const App = () =>
{
  return (
    <Provider>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/register" element={ <Register /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/" element={ <MainPage /> } />
          <Route path="/storage" element={ <Storage /> } />
          <Route path="/warehouse" element={ <Warehouse /> } />
          <Route path="/partner" element={ <Partner /> } />
          <Route path="/locations" element={ <Map /> } />
          <Route path="/careers" element={ <Careers /> } />
          <Route path="/about" element={ <AboutSection /> } />
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/orders" element={ <YourOrders /> } />
          <Route path="/refund" element={ <Refund /> } />
          <Route path="/listedSpace" element={ <ListedSpace /> } />
          <Route path="/contact" element={ <ContactSection /> } />
          <Route path="/allImages" element={ <AllImageSection /> } />
          <Route path="/live" element={ <Live /> } />
          <Route path="/checkout" element={ <CheckoutSection /> } />
          <Route path="/test" element={ <Profile /> } />
          <Route path="/underConstruction" element={ <Underconstruction /> } />
          <Route path="/allListedSpace" element={<AllListedSpace/>}/>
          <Route path="/admin" element={<AdminDashboard/>}/>
          <Route path="/paymentsuccess" element={<PaymentSuccess/>}></Route>
        </Routes>
        <Footer />
      </div>
    </Provider>
  );
};

export default App;
