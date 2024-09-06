"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip, Legend, BarElement, CategoryScale, LinearScale,
} from "chart.js";
import { Skill } from "@/types/types";

// Register the necessary chart elements
ChartJS.register(Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default function SkillsDemandBarGraph({
  title,
  skills,
}: {
  title: string;
  skills: Skill[];
}) {
  const names = skills.map((skill) => skill.name);
  const count = skills.map((skill) => skill.count);

  // Function to generate dynamic monochromatic colors with transparency
  const generateColors = (numBars: number) => {
    const colors = [];
    const primaryHue = 85; 
    const primarySaturation = 100; 
    const transparency = 0.65; 

    for (let i = 0; i < numBars; i++) {
      // Vary the lightness between 30% and 70% for a range of shades
      const lightness = 30 + (i * 40) / numBars;
      colors.push(
        `hsla(${primaryHue}, ${primarySaturation}%, ${lightness}%, ${transparency})`
      );
    }
    return colors;
  };

  const backgroundColors = generateColors(names.length); // Generate colors based on the number of bars

  // Bar chart options
  const options = {
    indexAxis: "y", // Horizontal bars (set to 'y' for horizontal orientation)
    scales: {
      x: {
        beginAtZero: true,
        grid: {
          color: "rgba(255, 255, 255, 0.1)", // X-axis grid line color
        },
        ticks: {
          color: "hsl(80, 20%, 94%)", // X-axis text color
        },
      },
      y: {
        grid: {
          display: false, // Hide grid lines for y-axis
        },
        ticks: {
          color: "hsl(80, 20%, 94%)", // Y-axis text color
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide the legend for a bar graph
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `${context.dataset.label}: ${context.raw}`, // Tooltip format
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false, // Disable automatic aspect ratio
  };

  // Bar chart data
  const barChartData = {
    labels: names,
    datasets: [
      {
        label: "Count",
        data: count,
        backgroundColor: backgroundColors, // Dynamically generated colors
        borderRadius: 4, // Rounded corners for bars
        barThickness: 20, // Adjust the thickness of the bars
        maxBarThickness: 40,
        minBarLength:10,
      },
    ],
  };

  // Set height of each bar and total height dynamically
  const barHeight = 30; // Height for each bar
  const chartHeight = skills.length * barHeight; // Total height based on number of bars

  return (
    <div className="bg-secondary flex flex-col justify-center items-center gap-2 p-4 rounded-md">
      <h2 className="text-2xl font-semibold text-foreground text-center mb-4">
        {title}
      </h2>
      <div className="w-full overflow-y-auto" style={{ maxHeight: '500px' }}>
        {/* This will make the graph scrollable vertically if there are too many bars */}
        <div style={{ height: chartHeight }}>
          <Bar options={options as any} data={barChartData} />
        </div>
      </div>
    </div>
  );
}
