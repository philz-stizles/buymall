import { useCallback, useState } from "react";
import { PieChart, Pie, Legend, ResponsiveContainer } from "recharts";

// const data = [
//   { name: "Group A", value: 400, fill: "#0088FE" },
//   { name: "Group B", value: 300, fill: "#00C49F" },
//   { name: "Group C", value: 300, fill: "#FFBB28" },
//   { name: "Group D", value: 200, fill: "#FF8042" },
// ];

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

// const renderColorfulLegendText = (value: string, entry: any) => {
//   return (
//     <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
//       {value}
//     </span>
//   );
// };

const AppDoughnut = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = useCallback(
    (_: any, index: number) => {
      setActiveIndex(index);
    },
    []
  );
  ;

  return (
      <PieChart width={350} height={400}>
        <Pie
          activeIndex={activeIndex}
          // activeShape={renderActiveShape}
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
        />
      </PieChart>
  );
  // return (
  //   <ResponsiveContainer>
  //     {" "}
  //     <PieChart onMouseEnter={() => {}}>
  //       <Legend
  //         height={36}
  //         iconType="circle"
  //         layout="vertical"
  //         verticalAlign="middle"
  //         iconSize={10}
  //         // padding={5}
  //         formatter={renderColorfulLegendText}
  //       />
  //       <Pie
  //         data={data}
  //         cx={120}
  //         cy={200}
  //         innerRadius={60}
  //         outerRadius={80}
  //         fill="#8884d8"
  //         paddingAngle={0}
  //         dataKey="value"
  //       >
  //         {/* {data.map((entry, index) => (
  //           <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  //         ))} */}
  //       </Pie>
  //     </PieChart>
  //   </ResponsiveContainer>
  // );
};


export default AppDoughnut;