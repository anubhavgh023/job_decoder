"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register chart elements
ChartJS.register(
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

export default function JobsExperienceLineGraph({
  title,
  lineGraphData,
}: {
  title: string;
  lineGraphData: { labels: string[]; data: number[] };
}) {
  // Line chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "hsl(80, 20%, 94%)",
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "hsl(80, 20%, 94%)",
        },
      },
      y: {
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
        ticks: {
          color: "hsl(80, 20%, 94%)",
        },
      },
    },
  };

  // Line chart data
  const lineChartData = {
    labels: lineGraphData.labels, // MinExperience levels
    datasets: [
      {
        label: "Job Count",
        data: lineGraphData.data, // Number of jobs for each experience level
        borderColor: "hsla(85, 100%, 70%, 0.85)", // Green color
        fill: false,
        tension: 0.3,
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        pointBackgroundColor: "hsl(85, 100%, 70%)",
      },
    ],
  };

  return (
    <div className="bg-secondary flex flex-col justify-center items-center gap-2 p-4 rounded-md">
      <h2 className="text-2xl font-semibold text-foreground text-center mb-4">
        {title}
      </h2>
      <div className="w-full h-[400px]">
        <Line options={options as any} data={lineChartData} />
      </div>
    </div>
  );
}