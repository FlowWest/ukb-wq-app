import React from "react"
import Plot from "react-plotly.js"
import { useStaticQuery, graphql } from "gatsby"
import { Dropdown } from "semantic-ui-react"

const WQPlot = () => {
  const characteristicName = "pH" // TODO move to state

  const data = useStaticQuery(
    graphql`
      query {
        results: allRiverCsv {
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
        characteristicOptions: allRiverCsv {
          distinct(field: Characteristic_Name)
        }
      }
    `
  )
  
  const characteristicNames = data.characteristicOptions.distinct
  
  const characteristicOptions = characteristicNames.map(
    characteristic => {
      let option = {}
      option.key = characteristic
      option.value = characteristic
      option.text = characteristic
      return option
    }
  )

  const filteredData = data.results.edges.filter(
    edge => edge.node.Characteristic_Name === characteristicName
  )

  const dates = filteredData.map(edge => edge.node.Activity_Start_Date)
  const values = filteredData.map(edge => edge.node.Result_Value)

  return (
    <div>
      <Dropdown
        placeholder="Select Analyte"
        fluid
        selection
        options={characteristicOptions} //TODO update characteristicName state based on selection 
      />
      <Plot
        data={[
          {
            x: dates,
            y: values,
            type: "scatter",
            mode: "lines",
            marker: { color: "green" },
          },
        ]}
        layout={{
          title: characteristicName,
          xaxis: {
            tickformat: "%Y", // TODO figure out date formatting
          },
        }}
      />
    </div>
  )
}

export default WQPlot
