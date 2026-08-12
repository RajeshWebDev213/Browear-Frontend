import {
  IndianRupee,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

function RevenueCard({

  totalRevenue,

  averageOrderValue,

  growth,

}) {

  const isPositive = Number(growth) >= 0;

  return (

    <div
      className="
      bg-white
      border
      border-gray-200
      p-6
      "
    >

      <div
        className="
        flex
        justify-between
        items-start
        "
      >

        <div>

          <p className="text-xs uppercase tracking-widest text-gray-400">

            Total Revenue

          </p>

          <h2
            className="
            text-4xl
            font-bold
            text-black
            mt-3
            "
          >

            ₹{totalRevenue}

          </h2>

        </div>

        <div
          className="
          w-12
          h-12
          border
          border-gray-200
          flex
          items-center
          justify-center
          shrink-0
          "
        >

          <IndianRupee
            size={22}
            className="text-black"
          />

        </div>

      </div>

      <div
        className="
        mt-8
        grid
        grid-cols-2
        divide-x
        divide-gray-100
        border-t
        border-gray-100
        pt-6
        "
      >

        <div>

          <p className="text-xs uppercase tracking-widest text-gray-400">

            Avg Order

          </p>

          <h3
            className="
            text-xl
            font-semibold
            text-black
            mt-2
            "
          >

            ₹{averageOrderValue}

          </h3>

        </div>

        <div className="pl-6">

          <p className="text-xs uppercase tracking-widest text-gray-400">

            Growth

          </p>

          <div
            className="
            flex
            items-center
            gap-1.5
            mt-2
            "
          >

            {isPositive ? (

              <TrendingUp
                size={17}
                className="text-black"
              />

            ) : (

              <TrendingDown
                size={17}
                className="text-black"
              />

            )}

            <span
              className="
              text-xl
              font-semibold
              text-black
              "
            >

              {isPositive ? "+" : ""}
              {growth}%

            </span>

          </div>

        </div>

      </div>

    </div>

  );

}

export default RevenueCard;