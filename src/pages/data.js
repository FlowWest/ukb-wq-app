import { graphql } from "gatsby"
import Img from "gatsby-image"
import React, { useRef, useState } from "react"
import { Button, Dropdown, Form, Grid } from "semantic-ui-react"
import DataInfoBlock from "../components/DataInfoBlock"
import DataMap from "../components/DataMap"
import DataPageFilters from "../components/DataPageFilters"
import DataPageTable from "../components/DataPageTable"
import Layout from "../components/Layout"
import LineChart from "../components/LineChart"
import SEO from "../components/Seo"
import { calcMapCenter } from "../helpers/utils"

export const DataPage = ({ data }) => {
  const monitoringLocations = data.allMonitoringStationsLocationsCsv.nodes
  const selectedMonitoringLocation = useRef(null)
  const [map, setMap] = useState(null)
  const markerRef = useRef([])

  const onSelectShowMarker = (index) => {
    if (!map) {
      return
    }
    const marker = markerRef.current

    if (index === null) {
      const center = calcMapCenter(monitoringLocations)
      map.closePopup()
      map.flyTo(center, 9)
    } else {
      const markerPosition = [
        marker[index].current._latlng.lat + 0.0068,
        marker[index].current._latlng.lng,
      ]
      marker[index].current.openPopup()
      map.flyTo(markerPosition, 15)
    }
  }

  const friendOptions = [
    {
      key: "Jenny Hess",
      text: "Jenny Hess",
      value: "Jenny Hess",
    },
    {
      key: "Elliot Fu",
      text: "Elliot Fu",
      value: "Elliot Fu",
    },
    {
      key: "Stevie Feliciano",
      text: "Stevie Feliciano",
      value: "Stevie Feliciano",
    },
    {
      key: "Christian",
      text: "Christian",
      value: "Christian",
    },
    {
      key: "Matt",
      text: "Matt",
      value: "Matt",
    },
    {
      key: "Justen Kitsune",
      text: "Justen Kitsune",
      value: "Justen Kitsune",
    },
  ]
  const monitoringLocationOptions = monitoringLocations.map((node, index) => ({
    key: node.monitoring_location_identifier,
    text: node.monitoring_location_identifier,
    value: node.monitoring_location_identifier,
    onClick: () => {
      //setSelectedMonitoringLocation(node)
      selectedMonitoringLocation.current = node
      onSelectShowMarker(index)
    },
  }))

  return (
    <Layout pageInfo={{ pageName: "data" }}>
      <SEO title="Water Quality Monitoring Data" />
      <Grid container style={{ padding: "4em 0" }}>
        <Grid.Row columns={2}>
          <Grid.Column>
            <DataInfoBlock data={data} />
          </Grid.Column>
          <Grid.Column>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 5,
                maxWidth: 250,
                marginLeft: "auto",
              }}
            >
              <Button fluid>Get Updated Data</Button>
              <Button fluid>Download Data</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} style={{ marginBottom: 25, zIndex: 1100 }}>
            <DataPageFilters />
          </Grid.Column>
          <Grid.Column width={6}>
            <DataMap
              data={monitoringLocations}
              selectedMonitoringLocation={selectedMonitoringLocation}
              map={map}
              setMap={setMap}
              markerRef={markerRef}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Grid style={{ height: 600 }}>
              <Grid.Row columns={1}>
                <Grid.Column>
                  <Form.Field>
                    <label>Filter Monitoring Location</label>
                    <Dropdown
                      placeholder="Select Parameter"
                      fluid
                      selection
                      defaultValue="All Locations"
                      options={[
                        {
                          text: "All Locations",
                          value: "All Locations",
                          key: "All Locations",
                          onClick: () => {
                            selectedMonitoringLocation.current = null
                            onSelectShowMarker(null)
                          },
                        },
                        ...monitoringLocationOptions,
                      ]}
                    />
                  </Form.Field>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <LineChart />
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginBottom: 25 }}>
          <DataPageTable data={data.allTruncatedKlamathDataCsv.edges} />
        </Grid.Row>

        <Grid.Row columns={2} divided>
          <Grid.Column width={2}>
            <a
              href="https://www.waterqualitydata.us/"
              target="_blank"
              rel="noreferrer"
            >
              <Img
                fluid={data.file.childImageSharp.fluid}
                objectFit="cover"
                alt="NWQMC Logo"
              />
            </a>
          </Grid.Column>
          <Grid.Column width={10}>
            <p>
              The Klamath Tribes water quality data can be downloaded from the
              National Water Quality Monitoring Council Water Quality Portal.{" "}
            </p>
            <p>
              Search the portal by Organization ID: KLAMATHTRIBES_WQX
              <br />
              <a
                href="https://www.waterqualitydata.us/"
                target="_blank"
                rel="noreferrer"
              >
                https://www.waterqualitydata.us/
              </a>
            </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default DataPage

export const query = graphql`
  query {
    file(relativePath: { eq: "NWQMC_logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 100, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
    allTruncatedKlamathDataCsv {
      edges {
        node {
          organization_identifier
          activity_start_date
          activity_start_time_time
          activity_start_time_time_zone_code
          monitoring_location_identifier
          characteristic_name
          result_sample_fraction_text
          result_measure_value
          result_measure_measure_unit_code
          result_status_identifier
          result_analytical_method_method_name
          provider_name
          monitoring_location_name
          monitoring_location_type_name
          huc_eight_digit_code
          latitude_measure
          longitude_measure
        }
      }
    }
    allMonitoringStationsLocationsCsv {
      nodes {
        monitoring_location_identifier
        huc_eight_digit_code
        latitude_measure
        longitude_measure
        params
        min_date
        max_date
      }
    }
  }
`
