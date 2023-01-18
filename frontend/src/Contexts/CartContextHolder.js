import React, { useState } from "react";
import { createContext } from "react";
const CartContext = createContext();

const CartContextHolder = (props) => {
  const [cartValue, setCartValue] = useState(0);

  const changeCartHandler = (newCartValue) => {
    setCartValue(newCartValue);
  };

  return (
    <CartContext.Provider
      value={{ cartValue, changeCartHandler, facalities: [] }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
export default CartContextHolder;
export { CartContext };
