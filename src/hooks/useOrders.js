import { useContext } from "react";
import { OrdersContext } from "../context/OrderContext";

export const useOrders = () => {
  return useContext(OrdersContext);
};