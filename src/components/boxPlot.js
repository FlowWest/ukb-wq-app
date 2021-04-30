import React, { useState } from "react"
import Plot from "react-plotly.js"
import { useStaticQuery, graphql } from "gatsby"
import { Dropdown } from "semantic-ui-react"

const BoxPlot = () => {
  const [characteristicName, setCharacteristicName] = useState("pH")

  const handleSelectCharacteristic = (e, data) =>
    setCharacteristicName(data.value)

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
        monitoringLocations: allRiverCsv {
          distinct(field: Monitoring_Location_ID)
        }
      }
    `
  )

  const characteristicNames = data.characteristicOptions.distinct
  const monitoringLocations = data.monitoringLocations.distinct

  const characteristicOptions = characteristicNames.map(characteristic => {
    let option = {}
    option.key = characteristic
    option.value = characteristic
    option.text = characteristic
    return option
  })

  const allLocationData = monitoringLocations.reduce(
    (locationObject, currentLocation) => (
      (locationObject[currentLocation] = { y: [], type: "box" }), locationObject
    ),
    {}
  )

  data.results.edges.forEach(edge => {
    if (edge.node.Characteristic_Name === characteristicName) {
      allLocationData[edge.node.Monitoring_Location_ID].y.push(edge.node.Result_Value)
    }
  })

  // array of all monitoriing location data objects
  const allPlotData = Object.values(allLocationData)

  var plotData = [allLocationData["SR0040"], allLocationData["SR0050"]] //TODO manage selection thru state

  return (
    <div>
      <Dropdown
        placeholder="Select Analyte"
        fluid
        selection
        options={characteristicOptions}
        onChange={handleSelectCharacteristic}
      />
      <Plot
        data={plotData}
        layout={{
          title: characteristicName,
        }}
      />
    </div>
  )
}

export default BoxPlot
