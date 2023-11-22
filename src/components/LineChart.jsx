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
  TimeScale,
} from "chart.js"
import { Line } from "react-chartjs-2"
import dayjs from "dayjs"
import "chartjs-adapter-dayjs-4/dist/chartjs-adapter-dayjs-4.esm"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
)

function generateYearLabels(startDate, endDate) {
  let years = []
  const startYear = dayjs(startDate || "1980-1-1").year()
  const endYear = dayjs(endDate || Date.now()).year()

  // Loop through the years and add them to the array
  for (let year = startYear; year <= endYear; year++) {
    years.push(year)
  }
  return years
}

//Create 30 datasets with sample data
// x

// Function to generate random color
function getRandomColor() {
  return `hsla(${Math.floor(Math.random() * 256)}, 100%, 30%, 1)`
}

// Function to generate an array of random data points
// function generateRandomData(numPoints) {
//   var data = []
//   for (var i = 0; i < numPoints; i++) {
//     data.push(Math.random() * 100) // Generate random data between 0 and 100
//   }
//   return data
// }

const LineChart = ({ selectedFilters, data }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    // labels: generateYearLabels(new Date("1980-1-1"), Date.now()),
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
    const filteredData = data.filter(
      (data) =>
        data.monitoring_location_identifier ===
          selectedFilters?.monitoringLocation && data.activity_start_date
    )

    // if (Boolean(filteredData.length)) {
    const transformedDataset = [
      {
        label: `${selectedFilters.monitoringLocation} (${selectedFilters.characteristicName})`,

        borderColor: getRandomColor(),
        backgroundColor: "rgba(0, 0, 0, 0)",
        data: filteredData.map((data) => data.result_measure_value),
      },
    ]

    setChartData({
      labels: filteredData.map(
        (data) =>
          `${data.activity_start_date} ${
            data.activity_start_time_time === "NA"
              ? "12:00:00"
              : data.activity_start_time_time
          }`
      ),
      datasets: transformedDataset,
    })
    // }
  }, [data])

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: {
          displayFormats: {
            quarter: "MMM YYYY",
            unit: "quarter",
          },
        },
      },
      //y: { suggestedMin: 0, suggestedMax: 1 },
    },
    plugins: {
      legend: {
        display: selectedFilters?.monitoringLocation,
        position: "top",
      },
      title: {
        display: false,
      },
    },
  }

  return (
    <>
      <Line ref={chartRef} options={options} data={chartData} />
      {!selectedFilters?.monitoringLocation && (
        <div className="line-chart-overlay">
          <p style={{ fontSize: "1.5rem", color: "white" }}>
            Select monitoring location to display chart data
          </p>
        </div>
      )}
    </>
  )
}

export default LineChart
