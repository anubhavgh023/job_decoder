"use client";

import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import { Skill } from "@/types/types";

ChartJS.register(Tooltip, Legend, ArcElement);

export default function SkillsDemandPieChart({
  title,
  topSkills,
}: {
  title: string;
  topSkills: Skill[];
}) {
  const names = topSkills.map((skill) => skill.name);
  const count = topSkills.map((skill) => skill.count);

  console.log(names, count);

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "hsl(80, 20%, 94%)",
        },
        position: "bottom",
      },
    },
  };
  const pieChartData = {
    labels: names,
    datasets: [
      {
        label: "count",
        data: count,
        backgroundColor: [
          "hsla(85, 100%, 70%, 0.85)", // - Vibrant Green (Primary)
          "hsla(169, 40%, 67%, 0.85)", // - Muted Cyan (Accent)
          "hsla(210, 60%, 60%, 0.85)", // - Cool Blue
          "hsla(345, 80%, 70%, 0.85)", // - Warm Magenta
          "hsla(35, 100%, 65%, 0.85)", // - Yellow-Orange
        ],
        hoverOffset: 2,
        borderWidth: 0,
        spacing: 4,
      },
    ],
  };

  return (
    <div className="bg-secondary flex flex-col justify-center items-center gap-2 p-4 rounded-md">
      <h2 className="text-2xl font-semibold text-foreground text-center mb-4">
        {title}
      </h2>
      <Doughnut options={options as any} data={pieChartData} />
    </div>
  );
}
