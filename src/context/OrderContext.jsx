import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  getMyOrders,
  placeOrder as placeOrderService,
  cancelOrder as cancelOrderService,
} from "../services/orderService";

export const OrdersContext =
  createContext();

export const OrdersProvider = ({
  children,
}) => {

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  /*
  =========================================
  LOAD ORDERS
  =========================================
  */

  const refreshOrders = async () => {

    const token =
      localStorage.getItem("token");

    if (!token) {

      setOrders([]);

      setLoading(false);

      return;

    }

    try {

      setLoading(true);

      const data =
        await getMyOrders();

      setOrders(
        data.orders || data
      );

    }

    catch (err) {

      console.error(err);

    }

    finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    refreshOrders();

  }, []);

  /*
  =========================================
  PLACE ORDER
  =========================================
  */

  const placeOrder = async (
    orderData
  ) => {

    const data =
      await placeOrderService(
        orderData
      );

    await refreshOrders();

    return data;

  };

  /*
  =========================================
  CANCEL ORDER
  =========================================
  */

  const cancelOrder = async (
    orderId
  ) => {

    await cancelOrderService(
      orderId
    );

    await refreshOrders();

  };

  return (

    <OrdersContext.Provider
      value={{

        orders,

        loading,

        placeOrder,

        cancelOrder,

        refreshOrders,

      }}
    >

      {children}

    </OrdersContext.Provider>

  );

};