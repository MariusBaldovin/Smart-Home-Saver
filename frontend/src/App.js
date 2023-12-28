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
  SavingTips,
  AboutUs,
  SignUp,
  SignIn,
} from "./components/index";
import "./App.css";
import { AuthContextProvider } from "./context/Authcontext";

const App = () => {
  return (
    <>
      <Router>
        <AuthContextProvider>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Devices" element={<Devices />} />
            <Route path="/Automation" element={<Automation />} />
            <Route path="/SavingTips" element={<SavingTips />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            // Catch all unmatched routes
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthContextProvider>

        <Footer />
      </Router>
    </>
  );
};
export default App;
