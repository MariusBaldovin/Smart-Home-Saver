import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";

// Registering components required by Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const EnergyUsageChart = ({ data, type }) => {
  if (!data || data.length === 0) {
    // Handle the case where data is not available
    return <div>No data available</div>;
  }

  // Check the type and prepare the labels and data for the chart
  const labels = data.map((item) => {
    if (type === "weekly") {
      return `Week of ${format(item.week, "do MMM")}`;
    } else if (type === "monthly") {
      return format(item.month, "MMMM yyyy");
    }
    return "";
  });

  const electricityData = data.map((item) => item.electricity);
  const gasData = data.map((item) => item.gas);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Electricity Used",
        data: electricityData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
      {
        label: "Gas Used",
        data: gasData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "300px" }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default EnergyUsageChart;
