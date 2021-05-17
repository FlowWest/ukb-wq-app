import React from "react"
import L from "leaflet"
import marker from "../images/pin.svg"
import { formatTextCasing } from "../helpers/utils"
import "leaflet/dist/leaflet.css"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

export default ({ monitoringLocations }) => {
  const position = [42.44333343664235, -121.41037747833549]

  const markerIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    iconAnchor: null,
    popupAnchor: [-0, -0],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
    iconSize: new L.Point(20, 35),
  })

  return (
    <MapContainer
      center={position}
      zoom={9}
      scrollWheelZoom={false}
      className="map-container"
    >
      <TileLayer
        attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community"
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}"
      />
      {monitoringLocations.map((location, index) => {
        var locationName = formatTextCasing(
          location.node.Monitoring_Location_Name.toLowerCase()
        )

        return (
          <Marker
            position={[location.node.Latitude, location.node.Longitude]}
            icon={markerIcon}
            key={index}
          >
            <Popup>
              {`Monitoring Location ID: ${location.node.Monitoring_Location_ID}`}
              <br />
              {`Monitoring Location Name: ${locationName}`}
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
