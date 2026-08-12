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
    <div className="mx-auto w-full max-w-7xl space-y-6 px-3 sm:px-5 lg:px-6 xl:px-0">
      {/* Header */}
      <div className="border-b border-gray-200 pb-6">
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-400">
          Management
        </span>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl lg:text-4xl">
          Orders
        </h1>
        <p className="mt-1 text-sm text-gray-500 sm:mt-2">
          Manage customer orders
        </p>
      </div>

      {/* Orders Table */}
      <div className="w-full overflow-hidden border border-gray-200">
        <div className="w-full overflow-x-auto">
          <OrdersTable orders={orders} />
        </div>
      </div>
    </div>
  );
}

export default Orders;