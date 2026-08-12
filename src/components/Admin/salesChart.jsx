// import {
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
// } from "recharts";

// function SalesChart({ data }) {

//   return (

//     <div
//       className="
//       bg-white
//       rounded-xl
//       border
//       border-gray-200
//       shadow-sm
//       p-6
//       h-96
//       "
//     >

//       <h2
//         className="
//         text-xl
//         font-semibold
//         mb-6
//         "
//       >

//         Monthly Sales

//       </h2>

//       <ResponsiveContainer
//         width="100%"
//         height="85%"
//       >

//         <LineChart data={data}>

//           <CartesianGrid strokeDasharray="3 3" />

//           <XAxis dataKey="month" />

//           <YAxis />

//           <Tooltip />

//           <Line
//             type="monotone"
//             dataKey="sales"
//             stroke="#000000"
//             strokeWidth={3}
//           />

//         </LineChart>

//       </ResponsiveContainer>

//     </div>

//   );

// }

// export default SalesChart;