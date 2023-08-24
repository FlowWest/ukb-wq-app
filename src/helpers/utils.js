import { useCallback } from "react"
import { sum } from "lodash"

export const formatTextCasing = (str) => {
  var splitStr = str?.split(" ") || []
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(" ")
}

export const calcMapCenter = (monitoringLocations) => {
  const latValues = []
  const longValues = []

  monitoringLocations.forEach((location) => {
    latValues.push(+location.node.latitude_measure)
    longValues.push(+location.node.longitude_measure)
  })

  const avgLat = sum(latValues) / monitoringLocations.length
  const avgLong = sum(longValues) / monitoringLocations.length

  const center = [avgLat, avgLong]

  return center
}
