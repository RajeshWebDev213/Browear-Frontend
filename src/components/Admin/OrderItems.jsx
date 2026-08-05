function OrderItems({ items = [] }) {

  return (

    <div className="bg-white rounded-2xl border p-6">

      <h2 className="text-xl font-semibold mb-4">

        Ordered Products

      </h2>

      <div className="space-y-4">

        {

          items.map((item) => (

            <div
              key={item._id}
              className="flex justify-between border-b pb-4"
            >

              <div>

                <h3 className="font-semibold">

                  {item.product?.name}

                </h3>

                <p>

                  Qty: {item.quantity}

                </p>

              </div>

              <div>

                ₹{item.price}

              </div>

            </div>

          ))

        }

      </div>

    </div>

  );

}

export default OrderItems;