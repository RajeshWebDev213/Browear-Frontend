import { TrendingUp } from "lucide-react";

function DashboardCard({

  title,

  value,

  icon: Icon,

  color,

  iconColor,

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
      flex
      justify-between
      items-center
      hover:shadow-md
      transition
      "
    >

      <div>

        <p className="text-gray-500">

          {title}

        </p>

        <h2
          className="
          text-3xl
          font-bold
          mt-2
          "
        >

          {value}

        </h2>

        <div
          className="
          flex
          items-center
          gap-1
          mt-3
          text-green-600
          text-sm
          "
        >

          <TrendingUp size={16} />

          <span>

            +0%

          </span>

        </div>

      </div>

      <div
        className={`
          w-16
          h-16
          rounded-2xl
          flex
          items-center
          justify-center
          ${color}
        `}
      >

        <Icon
          size={30}
          className={iconColor}
        />

      </div>

    </div>

  );

}

export default DashboardCard;