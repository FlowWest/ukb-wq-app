import React from "react"
import Plot from "react-plotly.js"
import { useStaticQuery, graphql } from "gatsby"

const WQPlot = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allRiverCsv(filter: { Characteristic_Name: { eq: "pH" } }) {
          edges {
            node {
              id
              Activity_Start_Date
              Monitoring_Location_ID
              Characteristic_Name
              Result_Value
              Result_Unit
              Result_Detection_Condition
            }
          }
        }
      }
    `
  )
  const dates = data.allRiverCsv.edges.map(edge => edge.node.Activity_Start_Date)
  const values = data.allRiverCsv.edges.map(edge => edge.node.Result_Value)

  return (
    <Plot
      data={[
        {
          x: dates,
          y: values,
          type: 'scatter',
          mode: 'lines+markers',
          marker: {color: 'green'}
        }
      ]}
    />
  )
}

export default WQPlot
