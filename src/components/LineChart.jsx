import React, { useState, useEffect, useRef } from "react"
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

var years = []

// Loop through the years and add them to the array
for (var year = 1980; year <= 1990; year++) {
  years.push(year)
}
var chartDatasets = []

//Create 30 datasets with sample data
for (var i = 1; i <= 1; i++) {
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

const LineChart = ({ selectedMonitoringLocation, data: data2 }) => {
  console.log("🚀 ~ LineChart ~ data:", data2)
  const [data, setData] = useState({
    labels: years,
    datasets: [
      {
        //label: "All Locations",
        borderColor: getRandomColor(),
        backgroundColor: "rgba(0, 0, 0, 0)",
        data: [],
      },
    ],
  })
  const chartRef = useRef(null)

  useEffect(() => {
    const filteredData = data2.filter(
      (data) =>
        data.node.monitoring_location_identifier ===
        selectedMonitoringLocation?.monitoring_location_identifier
    )
    // if (Boolean(filteredData.length)) {
    const transformedDataset = [
      {
        label: selectedMonitoringLocation?.monitoring_location_identifier,

        borderColor: getRandomColor(),
        backgroundColor: "rgba(0, 0, 0, 0)",
        data: Boolean(filteredData.length)
          ? filteredData.map((data) => +data.node.result_measure_value)
          : [0, 0, 0, 0, 0, 0, 0, 0],
      },
    ]
    console.log("🚀 ~ useEffect ~ transformedDataset:", transformedDataset)

    setData({ labels: years, datasets: transformedDataset })
    const chart = chartRef.current
    chart.update()
    console.log(
      "🚀 ~ LineChart ~ selectedMonitoringLocation:",
      selectedMonitoringLocation
    )
    // }
  }, [selectedMonitoringLocation])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { suggestedMin: 0, suggestedMax: 1 } },
    plugins: {
      legend: {
        display: selectedMonitoringLocation,
        position: "top",
      },
      title: {
        display: false,
      },
    },
  }

  return (
    <React.Fragment
      style={{
        position: "relative",
      }}
    >
      <Line ref={chartRef} options={options} data={data} />
      {!selectedMonitoringLocation && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "100%",
            background: "hsla(0,0%,0%,.5",
            position: "absolute",
          }}
        >
          <p style={{ fontSize: "1.5rem", color: "white" }}>
            Select monitoring location to display chart data
          </p>
        </div>
      )}
    </React.Fragment>
  )
}

export default LineChart
