import React from "react"
import { Link } from "gatsby"
import { Grid, Header } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { GoogleMap, LoadScript } from "@react-google-maps/api"

const containerStyle = {
  width: "400px",
  height: "400px",
  display: "inlineBlock",
  margin: "1rem",
  float: "right",
}

const center = {
  lat: -3.745,
  lng: -38.523,
}

export default () => {
  return (
    <div className="about-map">
      <LoadScript googleMapsApiKey={process.env.GATSBY_GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {/* Child components, such as markers, info windows, etc. */}
          <></>
        </GoogleMap>
      </LoadScript>
    </div>
  )
}
