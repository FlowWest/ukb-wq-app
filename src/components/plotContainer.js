import React, { useState } from "react"
// import Plot from "react-plotly.js"
// import LinePlot from "./linePlot"
import BoxPlot from "./boxPlot"
import { useStaticQuery, graphql } from "gatsby"
import { Dropdown } from "semantic-ui-react"

const PlotContainer = () => {
  const [selectedCharacteristicName, setSelectedCharacteristicName] = useState(
    "pH"
  )
  const [locationName, setLocationName] = useState("SR0040")
  // const [monitoringLocations, setMonitoringLocations] = useState([])

  const handleSelectCharacteristic = (e, data) =>
    setSelectedCharacteristicName(data.value)

  const handleSelectLocation = (e, data) => setLocationName(data.value)

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

  const locationOptions = monitoringLocations.map(location => {
    let option = {}
    option.key = location
    option.value = location
    option.text = location
    return option
  })

  return (
    <div>
      <Dropdown
        placeholder="Select Analyte"
        fluid
        selection
        options={characteristicOptions}
        onChange={handleSelectCharacteristic}
        value={selectedCharacteristicName}
      />
      <Dropdown
        placeholder="Select Location"
        fluid
        selection
        options={locationOptions}
        onChange={handleSelectLocation}
        value={locationName}
      />
      <BoxPlot
        selectedCharacteristicName={selectedCharacteristicName}
        data={data}
        monitoringLocations={monitoringLocations}
      />
    </div>
  )
}

export default PlotContainer
