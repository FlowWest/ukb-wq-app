import React, { useState, useEffect } from "react"
import Plot from "react-plotly.js"
import { useStaticQuery, graphql } from "gatsby"

const BoxPlot = ({ selectedCharacteristicName, data, monitoringLocations }) => {
  let allLocationData = {}
  allLocationData = monitoringLocations.reduce(
    (locationObject, currentLocation) => (
      (locationObject[currentLocation] = {
        y: [],
        type: "box",
        name: currentLocation,
      }),
      locationObject
    ),
    {}
  )

  data.results.edges.forEach(edge => {
    if (edge.node.Characteristic_Name === selectedCharacteristicName) {
      allLocationData[edge.node.Monitoring_Location_ID].y.push(
        edge.node.Result_Value
      )
    }
  })

  // array of all monitoriing location data objects
  const allPlotData = Object.values(allLocationData)

  var plotData = allPlotData //TODO manage selection thru state

  return (
    <div>
      <Plot
        data={plotData}
        layout={{
          title: selectedCharacteristicName,
        }}
      />
    </div>
  )
}

export default BoxPlot
