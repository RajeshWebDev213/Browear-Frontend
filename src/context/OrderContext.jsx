import React, { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext();

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState(()=> {
    return JSON.parse(localStorage.getItem("orders")) || [];
  });
  useEffect(()=>{
    localStorage.setItem("orders",JSON.stringify(orders));
  },[orders]);

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  return (
    <OrdersContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
