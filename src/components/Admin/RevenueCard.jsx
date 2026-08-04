import {
  IndianRupee,
  TrendingUp,
} from "lucide-react";

function RevenueCard({

  totalRevenue,

  averageOrderValue,

  growth,

}) {

  return (

    <div
      className="
      bg-white
      rounded-2xl
      border
      border-gray-200
      shadow-sm
      p-6
      "
    >

      <div
        className="
        flex
        justify-between
        items-center
        "
      >

        <div>

          <p className="text-gray-500">

            Total Revenue

          </p>

          <h2
            className="
            text-4xl
            font-bold
            mt-3
            "
          >

            ₹{totalRevenue}

          </h2>

        </div>

        <div
          className="
          w-16
          h-16
          rounded-2xl
          bg-green-100
          flex
          items-center
          justify-center
          "
        >

          <IndianRupee
            size={32}
            className="text-green-600"
          />

        </div>

      </div>

      <div
        className="
        mt-8
        grid
        grid-cols-2
        gap-6
        "
      >

        <div>

          <p className="text-gray-500">

            Avg Order

          </p>

          <h3
            className="
            text-2xl
            font-semibold
            mt-2
            "
          >

            ₹{averageOrderValue}

          </h3>

        </div>

        <div>

          <p className="text-gray-500">

            Growth

          </p>

          <div
            className="
            flex
            items-center
            gap-2
            mt-2
            "
          >

            <TrendingUp
              size={20}
              className="text-green-600"
            />

            <span
              className="
              text-xl
              font-semibold
              text-green-600
              "
            >

              {growth}%

            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default RevenueCard;