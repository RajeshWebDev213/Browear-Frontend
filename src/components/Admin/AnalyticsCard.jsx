function AnalyticsCard({

  title,

  value,

  icon,

  color,

}) {

  return (

    <div
      className="
      bg-white
      rounded-2xl
      border
      p-6
      shadow-sm
      "
    >

      <div className="flex justify-between">

        <div>

          <p className="text-gray-500">

            {title}

          </p>

          <h2 className="text-3xl font-bold mt-2">

            {value}

          </h2>

        </div>

        <div
          className={`
          w-14
          h-14
          rounded-xl
          flex
          items-center
          justify-center
          ${color}
          `}
        >

          {icon}

        </div>

      </div>

    </div>

  );

}

export default AnalyticsCard;