import L from "leaflet"
import "leaflet/dist/leaflet.css"
import React, { createRef } from "react"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import { Divider, List } from "semantic-ui-react"
import { calcMapCenter } from "../helpers/utils"

if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png").default,
    iconUrl: require("leaflet/dist/images/marker-icon.png").default,
    shadowUrl: require("leaflet/dist/images/marker-shadow.png").default,
  })
}

const PopupDetail = ({ title, content }) => (
  <div className="leaflet-popup-detail-wrapper">
    <span className="leaflet-popup-detail-title">{title}</span>
    <span className="leaflet-popup-detail-content">{content}</span>
  </div>
)

const DataMap = ({ data, setMap, markerRef }) => {
  const center = calcMapCenter(data)

  return (
    <MapContainer
      style={{ height: "600px" }}
      center={center}
      zoom={9}
      scrollWheelZoom={false}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {data.map((location, index) => {
        const lat = location.latitude_measure
        const lng = location.longitude_measure
        const monitoringLocationId = location.monitoring_location_identifier
        const params = location.params.split(",")

        markerRef.current[index] = createRef()

        return (
          <Marker
            position={[lat, lng]}
            key={monitoringLocationId}
            ref={markerRef.current[index]}
          >
            <Popup>
              <p className="leaflet-popup-title">{monitoringLocationId}</p>
              <Divider />
              <PopupDetail title="Latitude:" content={lat} />
              <PopupDetail title="Latitude:" content={lng} />
              <PopupDetail
                title="Parameters:"
                content={
                  <List bulleted>
                    {params.map((param) => (
                      <List.Item key={param}>{param}</List.Item>
                    ))}
                  </List>
                }
              />
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}

export default DataMap
