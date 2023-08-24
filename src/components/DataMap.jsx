import React, { useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { calcMapCenter } from "../helpers/utils"

if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
    iconUrl: require("leaflet/dist/images/marker-icon.png").default,
    shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
  })
}

const DataMap = ({ data }) => {
  const center = calcMapCenter(data)
  return (
    <MapContainer
      style={{ height: "400px" }}
      center={center}
      zoom={10}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((activity, index) => {
        const lat = activity.node.latitude_measure
        const lng = activity.node.longitude_measure
        const monitoringLocationName = activity.node.monitoring_location_name
        const timeStamp = `${activity.node.activity_start_date} ${activity.node.activity_start_time_time}${activity.node.activity_start_time_time_zone_code}`
        const id = activity.node.monitoring_location_identifier

        return (
          <Marker position={[lat, lng]} key={id + index}>
            <Popup>
              {monitoringLocationName} <br /> {timeStamp}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default DataMap
