import React from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      // display: false,
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Line Chart",
    },
  },
}

const labels = ["January", "February", "March", "April", "May", "June", "July"]

var chartDatasets = []

// Create 30 datasets with sample data
for (var i = 1; i <= 30; i++) {
  var dataset = {
    label: `Dataset ${i}`,
    borderColor: getRandomColor(),
    backgroundColor: "rgba(0, 0, 0, 0)", // Transparent background
    data: generateRandomData(10), // Generate an array of 10 random data points
  }
  chartDatasets.push(dataset)
}

// Function to generate random color
function getRandomColor() {
  return `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
    Math.random() * 256
  )}, ${Math.floor(Math.random() * 256)}, 1)`
}

// Function to generate an array of random data points
function generateRandomData(numPoints) {
  var data = []
  for (var i = 0; i < numPoints; i++) {
    data.push(Math.random() * 100) // Generate random data between 0 and 100
  }
  return data
}

const data = {
  labels,
  datasets: chartDatasets,
}

const LineChart = () => {
  return <Line options={options} data={data} />
}

export default LineChart
