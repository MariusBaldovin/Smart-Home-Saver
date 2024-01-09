import React, { useState } from "react";
import "./NavBar.css";
import logo from "../../assets/logo.png";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../context/Authcontext"; // Import the useAuth hook
import { useCart } from "../../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";

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
      {/*Navbar links*/}
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

      {/*Sign In, Sign Out, Basket elements*/}
      <div className="smart-home__navbar-sign">
        {currentUser ? ( // Check if the user is logged in
          <>
            <div className="my-account-sign">
              <NavLink to="/MyAccount">
                <img
                  src={
                    currentUser.photoURL || require("../../assets/avatar.jpg")
                  }
                  alt="User"
                  className="user-profile-picture"
                />
              </NavLink>
              <div className="my-account-text">My Devices</div>
            </div>

            <div className="my-account-sign">
              <RiLogoutCircleLine
                onClick={signOut}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                  borderRadius: "20px",
                  transition: "fill ease-in 0.3s, color ease-in 0.3s",
                }}
                fill="black"
                color="black"
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#4caf50";
                  e.currentTarget.style.fill = "white";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.fill = "black";
                  e.currentTarget.style.color = "black";
                }}
              />
              <div className="my-account-text">Sign Out</div>
            </div>

            <div className="my-account-sign">
              <NavLink className="link" to="/Cart">
                <FaShoppingCart
                  size={24}
                  style={{ width: "40px", height: "40px" }}
                  onClick={hideMenu}
                />
                <p>{totalQuantity}</p>
              </NavLink>
              <div className="my-account-text">Basket</div>
            </div>
          </>
        ) : (
          <>
            <div className="my-account-sign">
              <NavLink to="/SignIn">
                <img
                  src={require("../../assets/avatar.jpg")}
                  alt="User"
                  className="user-profile-picture"
                />
              </NavLink>
              <div className="my-account-text">Sign In</div>
            </div>
            <div className="my-account-sign">
              <RiLogoutCircleLine
                onClick={signOut}
                style={{
                  backgroundColor: "white",
                  cursor: "pointer",
                  width: "40px",
                  height: "40px",
                  borderRadius: "20px",
                  transition: "fill ease-in 0.3s, color ease-in 0.3s",
                }}
                fill="black"
                color="black"
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = "#4caf50";
                  e.currentTarget.style.fill = "white";
                  e.currentTarget.style.color = "white";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = "white";
                  e.currentTarget.style.fill = "black";
                  e.currentTarget.style.color = "black";
                }}
              />
              <div className="my-account-text">Sign Out</div>
            </div>
            <div className="my-account-sign">
              <NavLink className="link" to="/Cart">
                <FaShoppingCart
                  size={24}
                  style={{
                    width: "40px",
                    height: "40px",
                  }}
                  onClick={hideMenu}
                />
                <p>{totalQuantity}</p>
              </NavLink>
              <div className="basket-label">Basket</div>
            </div>
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
                  <div onClick={hideMenu} className="my-account-sign">
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
                    <div className="my-account-text">My Devices</div>
                  </div>
                  <div onClick={hideMenu} className="my-account-sign">
                    <RiLogoutCircleLine
                      onClick={signOut}
                      style={{
                        backgroundColor: "white",
                        cursor: "pointer",
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                        transition: "fill ease-in 0.3s, color ease-in 0.3s",
                      }}
                      fill="black"
                      color="black"
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#4caf50";
                        e.currentTarget.style.fill = "white";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.fill = "black";
                        e.currentTarget.style.color = "black";
                      }}
                    />
                    <div className="my-account-text">Sign Out</div>
                  </div>
                  <div className="my-account-sign">
                    <NavLink className="link" to="/Cart">
                      <FaShoppingCart
                        size={24}
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={hideMenu}
                      />
                      <p>{totalQuantity}</p>
                    </NavLink>
                    <div className="my-account-text">Basket</div>
                  </div>
                </>
              ) : (
                <>
                  <div onClick={hideMenu} className="my-account-sign">
                    <NavLink to="/SignIn">
                      <img
                        src={require("../../assets/avatar.jpg")}
                        alt="User"
                        className="user-profile-picture"
                      />
                    </NavLink>
                    <div className="my-account-text">Sign In</div>
                  </div>
                  <div className="my-account-sign">
                    <RiLogoutCircleLine
                      onClick={signOut}
                      style={{
                        backgroundColor: "white",
                        cursor: "pointer",
                        width: "40px",
                        height: "40px",
                        borderRadius: "20px",
                        transition: "fill ease-in 0.3s, color ease-in 0.3s",
                      }}
                      fill="black"
                      color="black"
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = "#4caf50";
                        e.currentTarget.style.fill = "white";
                        e.currentTarget.style.color = "white";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = "white";
                        e.currentTarget.style.fill = "black";
                        e.currentTarget.style.color = "black";
                      }}
                    />
                    <div className="my-account-text">Sign Out</div>
                  </div>
                  <div className="my-account-sign">
                    <NavLink className="link" to="/Cart">
                      <FaShoppingCart
                        size={24}
                        style={{
                          width: "40px",
                          height: "40px",
                        }}
                        onClick={hideMenu}
                      />
                      <p>{totalQuantity}</p>
                    </NavLink>
                    <div className="basket-label">Basket</div>
                  </div>
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
