"use client";

import React from "react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const generateCurveData = (percentage: number) => {
  const data = [];
  const points = 20;

  const isRising = percentage >= 45;

  for (let i = 0; i < points; i++) {
    const x = i / (points - 1);

    let y;
    if (isRising) {
      y = 0.2 + 0.3 * Math.sin(Math.PI * x) + 0.5 * x;
    } else {
      y = 0.8 - 0.3 * Math.sin(Math.PI * x) - 0.5 * x;
    }

    data.push({ x, y });
  }
  return data;
};

export default function StatsBox({
  heading,
  amount,
  percentage,
  percentClass = "",
}: {
  heading: string;
  amount: string;
  percentage: number;
  percentClass?: string;
}) {
  const color = heading === "Pending Payout" ? "#707070" : "#7B4F3A";

  return (
    <div className="flex justify-between gap-7 px-6 py-14 border border-[#E3E2D9] rounded-lg w-full">
      <div className="mb-2">
        <h3 className="text-[#898989] text-xs font-medium">{heading}</h3>
        <p className="text-2xl font-semibold mt-1">{amount}</p>
        <p
          className={percentClass || `text-[${color}]`}
          style={{
            color: percentClass ? undefined : color,
            fontSize: "0.75rem",
            fontWeight: 500,
            marginTop: "0.25rem",
          }}
        >
          {percentage}%
        </p>
      </div>

      <div className="h-12 w-full mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={generateCurveData(percentage)}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
            <Line
              type="natural"
              dataKey="y"
              stroke={color}
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
