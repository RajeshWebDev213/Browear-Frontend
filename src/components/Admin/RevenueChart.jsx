import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

} from "recharts";

const data = [

  { month: "Jan", revenue: 12000 },

  { month: "Feb", revenue: 18000 },

  { month: "Mar", revenue: 25000 },

  { month: "Apr", revenue: 22000 },

  { month: "May", revenue: 31000 },

  { month: "Jun", revenue: 40000 },

];

function RevenueChart() {

  return (

    <div className="bg-white rounded-2xl border p-6">

      <h2 className="text-xl font-semibold mb-5">

        Revenue

      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >

        <LineChart data={data}>

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line

            type="monotone"

            dataKey="revenue"

          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default RevenueChart;