"use client";
import { PieChart, Pie, Cell, Legend, Tooltip, Label } from "recharts";
import React from "react";
import useFetch from "@/hooks/useFetch";

const COLORS = ["#7CA9ED", "#93E5AF"];

const SpaceUsageRate = () => {
  // const handleMouseEnter = () => {
  //   // 空函數 - 不做任何事情
  // };
  const { data, isLoading, error } = useFetch("get_space_usage_rate");

  if (isLoading) {
    return <h1>Loading</h1>;
  }

  if (error) {
    return <h1>Error</h1>;
  }

  // 獲取all_floor的usage rate
  const all_floor_data = data.find((entry) => entry.floor === "all");

  if (!all_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const all_pie_data = [
    { name: "Occupied", value: all_floor_data.occupied },
    { name: "Vacant", value: all_floor_data.vacant },
  ];
  // 獲取f2_floor的usage rate
  const f2_floor_data = data.find((entry) => entry.floor === "2F");

  if (!f2_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const f2_pie_data = [
    { name: "Occupied", value: f2_floor_data.occupied },
    { name: "Vacant", value: f2_floor_data.vacant },
  ];
  // 獲取f1_floor的usage rate
  const f1_floor_data = data.find((entry) => entry.floor === "1F");

  if (!f1_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const f1_pie_data = [
    { name: "Occupied", value: f1_floor_data.occupied },
    { name: "Vacant", value: f1_floor_data.vacant },
  ];
  // 獲取b1_floor的usage rate
  const b1_floor_data = data.find((entry) => entry.floor === "B1");

  if (!b1_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const b1_pie_data = [
    { name: "Occupied", value: b1_floor_data.occupied },
    { name: "Vacant", value: b1_floor_data.vacant },
  ];
  // 獲取b2_floor的usage rate
  const b2_floor_data = data.find((entry) => entry.floor === "B2");

  if (!b2_floor_data) {
    return null; // 若找不到符合條件的數據，也可以返回null或其他UI
  }

  const b2_pie_data = [
    { name: "Occupied", value: b2_floor_data.occupied },
    { name: "Vacant", value: b2_floor_data.vacant },
  ];

  const RADIAN = Math.PI / 180;
  const allCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "28px",
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  const eachFloorCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        style={{
          fontSize: "10px",
        }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="flex flex-row items-center gap-x-4">
      <PieChart width={436} height={200}>
        <Pie
          data={all_pie_data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={allCustomizedLabel}
          labelLine={false}

          // onMouseEnter={handleMouseEnter} // 設置為空函數
        >
          {all_pie_data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <text
          x="35.5%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          style={{
            fontSize: "32px",
            fontFamily: "serif",
            fontWeight: "bold",
            fill: "#696969",
          }}
        >
          All
        </text>
        <Tooltip />
        <Legend
          verticalAlign="middle" // 設置圖例在底部
          align="right" // 水平居中對齊
          layout="vertical" // 使用水平排列方式
          wrapperStyle={{ fontSize: "20px" }}
          iconSize={20}
          iconType="square"
          // wrapperStyle={{
          //   paddingTop: "20px", // 調整圖例與圓餅圖的垂直距離
          //   margin: "0 auto", // 調整圖例的外邊距，使其水平居中
          // }}
        />
      </PieChart>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <PieChart width={108} height={100}>
            <Pie
              data={f2_pie_data}
              dataKey="value"
              nameKey="name"
              cx="42.5%"
              cy="46%"
              outerRadius={46}
              label={eachFloorCustomizedLabel}
              labelLine={false}
              // onMouseEnter={handleMouseEnter} // 設置為空函數
            >
              {f2_pie_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <text
              x="42.5%"
              y="46%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "14px",
                fontFamily: "serif",
                fontWeight: "bold",
                fill: "#696969",
              }}
            >
              2F
            </text>
            <Tooltip />
          </PieChart>
          <PieChart width={108} height={100}>
            <Pie
              data={f1_pie_data}
              dataKey="value"
              nameKey="name"
              cx="57.5%"
              cy="46%"
              outerRadius={46}
              label={eachFloorCustomizedLabel}
              labelLine={false}
              // onMouseEnter={handleMouseEnter} // 設置為空函數
            >
              {f1_pie_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <text
              x="57.5%"
              y="46%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "14px",
                fontFamily: "serif",
                fontWeight: "bold",
                fill: "#696969",
              }}
            >
              F1
            </text>
            <Tooltip />
          </PieChart>
        </div>
        <div className="flex flex-row items-center justify-center">
          <PieChart width={108} height={100}>
            <Pie
              data={b1_pie_data}
              dataKey="value"
              nameKey="name"
              cx="42.5%"
              cy="54%"
              outerRadius={46}
              label={eachFloorCustomizedLabel}
              labelLine={false}
              // onMouseEnter={handleMouseEnter} // 設置為空函數
            >
              {b1_pie_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <text
              x="42.5%"
              y="54%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "14px",
                fontFamily: "serif",
                fontWeight: "bold",
                fill: "#696969",
              }}
            >
              B1
            </text>
            <Tooltip />
          </PieChart>
          <PieChart width={108} height={100}>
            <Pie
              data={b2_pie_data}
              dataKey="value"
              nameKey="name"
              cx="57.5%"
              cy="54%"
              outerRadius={46}
              label={eachFloorCustomizedLabel}
              labelLine={false}
              // onMouseEnter={handleMouseEnter} // 設置為空函數
            >
              {b2_pie_data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <text
              x="57.5%"
              y="54%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "14px",
                fontFamily: "serif",
                fontWeight: "bold",
                fill: "#696969",
              }}
            >
              B2
            </text>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default SpaceUsageRate;
