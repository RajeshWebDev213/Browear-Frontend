function CustomerInfo({ customer }) {

  return (

    <div className="bg-white rounded-2xl border p-6">

      <h2 className="text-xl font-semibold mb-4">

        Customer Information

      </h2>

      <p>

        <strong>Name:</strong> {customer?.fullname}

      </p>

      <p>

        <strong>Email:</strong> {customer?.email}

      </p>

      <p>

        <strong>Phone:</strong> {customer?.phonenumber}

      </p>

    </div>

  );

}

export default CustomerInfo;