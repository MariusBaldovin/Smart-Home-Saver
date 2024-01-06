import React, { useState } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/Authcontext"; // Import the useAuth hook
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const { cart } = useCart();
  const { currentUser, signOut } = useAuth(); // Get the user's authentication status and signOut function

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);

  const hideMenu = () => {
    setToggleMenu(false);
  }; // const to hide toggle menu on mobile version after click

  return (
    <div className="smart-home__navbar">
      <div className="smart-home__navbar-links">
        <div className="smart-home__navbar-links_logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="smart-home__navbar-links_container">
          <p>
            <NavLink to="/">Home</NavLink>
          </p>
          <p>
            <NavLink to="/Devices">Devices</NavLink>
          </p>
          <p>
            <NavLink to="/Automation">Automation</NavLink>
          </p>
          <p>
            <NavLink to="/EnergyTracker">Energy Tracker</NavLink>
          </p>
          <p>
            <NavLink to="/Chat">Chat</NavLink>
          </p>
          <p>
            <NavLink to="/AboutUs">About Us</NavLink>
          </p>
        </div>
      </div>
      <div className="smart-home__navbar-sign">
        {currentUser ? ( // Check if the user is logged in
          <>
            <NavLink className="link" to="/Cart">
              <FaShoppingCart
                size={24}
                style={{ marginLeft: 5 }}
                onClick={hideMenu}
              />
              <p>{totalQuantity}</p>
            </NavLink>
            <NavLink to="/MyAccount">
              <img
                src={currentUser.photoURL || require("../../assets/avatar.jpg")}
                alt="User"
                className="user-profile-picture"
              />
            </NavLink>
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <>
            <NavLink className="link" to="/Cart">
              <FaShoppingCart
                size={24}
                style={{ marginLeft: 5 }}
                onClick={hideMenu}
              />
              <p>{totalQuantity}</p>
            </NavLink>
            <NavLink to="/SignIn">
              <p>Log in</p>
            </NavLink>
            <NavLink to="/SignUp">
              <button type="button">Sign up</button>
            </NavLink>
          </>
        )}
      </div>
      <div className="smart-home__navbar-menu">
        <RiMenu3Line
          color="#fff"
          size={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className="smart-home__navbar-menu_container scale-up-center">
            <RiCloseLine
              className="close-button"
              color="#fff"
              size={40}
              onClick={() => setToggleMenu(false)}
            />
            <div className="smart-home__navbar-menu_container-links">
              {/* Phones and tablets menu links */}
              <p onClick={hideMenu}>
                <NavLink to="/">Home</NavLink>
              </p>

              <p onClick={hideMenu}>
                <NavLink to="/Devices">Devices</NavLink>
              </p>
              <p onClick={hideMenu}>
                <NavLink to="/Automation">Automation</NavLink>
              </p>
              <p onClick={hideMenu}>
                <NavLink to="/EnergyTracker">Saving Tips</NavLink>
              </p>
              <p onClick={hideMenu}>
                <NavLink to="/Chat">Chat</NavLink>
              </p>
              <p onClick={hideMenu}>
                <NavLink to="/AboutUs">About Us</NavLink>
              </p>
            </div>
            <div className="smart-home__navbar-menu_container-links-sign">
              {currentUser ? ( // Check if the user is logged in for mobile version
                <>
                  <NavLink className="link" to="/Cart">
                    <FaShoppingCart
                      size={24}
                      style={{ marginLeft: 5 }}
                      onClick={hideMenu}
                    />
                    <p>{totalQuantity}</p>
                  </NavLink>
                  <NavLink to="/MyAccount">
                    <img
                      src={
                        currentUser.photoURL ||
                        require("../../assets/avatar.jpg")
                      }
                      alt="User"
                      className="user-profile-picture"
                    />
                  </NavLink>
                  <button onClick={signOut}>Sign Out</button>
                </>
              ) : (
                <>
                  <NavLink className="link" to="/Cart">
                    <FaShoppingCart
                      size={24}
                      style={{ marginLeft: 5 }}
                      onClick={hideMenu}
                    />
                    <p>{totalQuantity}</p>
                  </NavLink>
                  <NavLink to="/SignIn">
                    <p onClick={hideMenu}>Log in</p>
                  </NavLink>
                  <NavLink to="/SignUp">
                    <button type="button" onClick={hideMenu}>
                      Sign up
                    </button>
                  </NavLink>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
