import { useEffect, useState } from "react";

import Loader from "../../components/common/Loader";
import OrdersTable from "../../components/admin/OrdersTable";

import { getAllOrders } from "../../services/orderService";

function Orders() {

  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {

    try {

      const data = await getAllOrders();

      setOrders(data.orders || data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Orders

        </h1>

        <p className="text-gray-500 mt-2">

          Manage customer orders

        </p>

      </div>

      <OrdersTable
        orders={orders}
      />

    </div>

  );

}

export default Orders;