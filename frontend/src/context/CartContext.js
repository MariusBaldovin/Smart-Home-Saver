import React, { createContext, useContext, useEffect, useReducer } from "react";
import CartReducer from "./CartReducer";
import { useAuth } from "./Authcontext"; // Import useAuth hook from AuthContext

const CartContext = createContext();

const initialState = {
  items: [],
};

export const CartProvider = ({ children }) => {
  const { currentUser } = useAuth(); // Use useAuth hook to get the current user
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
    // Determine the key for localStorage based on user login status
    const cartKey = currentUser ? `cart_${currentUser.uid}` : "cart";
    const localData = localStorage.getItem(cartKey);
    if (localData) {
      dispatch({ type: "SET_CART_ITEMS", items: JSON.parse(localData) });
    }
  }, [currentUser]);

  useEffect(() => {
    // Save cart to localStorage using the appropriate key
    const cartKey = currentUser ? `cart_${currentUser.uid}` : "cart";
    localStorage.setItem(cartKey, JSON.stringify(state.items));
  }, [state.items, currentUser]);

  const addToCart = (item) => {
    dispatch({
      type: "ADD_TO_CART",
      item: item,
    });
  };

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      id: id,
    });
  };

  const adjustQuantity = (id, amount) => {
    dispatch({
      type: "ADJUST_QUANTITY",
      id: id,
      amount: amount,
    });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    const cartKey = currentUser ? `cart_${currentUser.uid}` : "cart";
    localStorage.removeItem(cartKey);
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        dispatch,
        addToCart,
        removeFromCart,
        adjustQuantity,
        clearCart,
      }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
