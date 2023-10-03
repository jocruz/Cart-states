import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  CLEAR_CART,
  REMOVE,
  INCREASE,
  DECREASE,
  LOADING,
  DISPLAY_ITEMS,
} from "./actions";

import reducer from "./reducer";

const GlobalContext = createContext();

const initialState = {
  loading: false,
  cart: new Map(),
};

const url = "https://www.course-api.com/react-useReducer-cart-project";

const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const getData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: DISPLAY_ITEMS, payload: data });
    } catch (e) {
      console.log(`There was an error, error:${e}`);
    }
  };

  const increase = (id) => {
    dispatch({ type: INCREASE, payload: { id } });
  };
  const decrease = (id) => {
    dispatch({ type: DECREASE, payload: { id } });
  };

  const remove = (id) => dispatch({ type: REMOVE, payload: { id } });

  const clear = () => {
    dispatch({ type: CLEAR_CART });
  };

  const getTotals = (cart) => {
    //the amount * price
    // total amount of each object
    let totalCost = 0;
    let totalAmount = 0;

    for (let { amount, price } of cart.values()) {
      totalCost += price * amount;
      totalAmount += amount;
    }

    return { totalCost, totalAmount };
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ increase, decrease, remove, clear, getTotals, ...state }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
export const useGlobalContext = () => useContext(GlobalContext);
