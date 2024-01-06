import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  NavBar,
  Footer,
  Automation,
  Chat,
  Devices,
  Home,
  NotFound,
  EnergyTracker,
  AboutUs,
  MyAccount,
  SignUp,
  SignIn,
  ResetPassword,
} from "./components/index";
import "./App.css";
import { AuthContextProvider } from "./context/Authcontext";
import { CartProvider } from "./context/CartContext"; // Import CartProvider
import Cart from "./pages/cart/Cart";

const App = () => {
  return (
    <AuthContextProvider>
      <CartProvider>
        {" "}
        <Router>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Devices" element={<Devices />} />
            <Route path="/Automation" element={<Automation />} />
            <Route path="/EnergyTracker" element={<EnergyTracker />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/ResetPassword" element={<ResetPassword />} />
            <Route path="/MyAccount" element={<MyAccount />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </CartProvider>
    </AuthContextProvider>
  );
};

export default App;
