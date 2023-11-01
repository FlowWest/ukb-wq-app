import { graphql } from "gatsby"
import Img from "gatsby-image"
import React, { useRef, useState, useEffect } from "react"
import {
  Button,
  Dropdown,
  Form,
  Grid,
  IconGroup,
  Icon,
} from "semantic-ui-react"
import DataInfoBlock from "../components/DataInfoBlock"
import DataMap from "../components/DataMap"
import DataPageFilters from "../components/DataPageFilters"
import DataPageTable from "../components/DataPageTable"
import Layout from "../components/Layout"
import LineChart from "../components/LineChart"
import SEO from "../components/Seo"
import axios from "axios"
import Papa from "papaparse"

export const DataPage = ({ data }) => {
  const monitoringLocations = data.allMonitoringStationsLocationsCsv.nodes
  const [allKlamathData, setAllKlamathData] = useState([])
  const [filteredKlamathData, setFilteredKlamathData] = useState(allKlamathData)

  useEffect(() => {
    ;(async () => {
      try {
        const fetchData = async () => {
          const fileEdges = data.allFile.edges

          const dataPromises = fileEdges.map(async ({ node }) => {
            try {
              const response = await axios.get(node.publicURL)
              const csvData = await response.data
              return csvData
            } catch (error) {
              console.error(error)
            }
          })

          Promise.all(dataPromises)
            .then((results) => {
              const combined = results.flatMap((csvData) => {
                // Process and combine data from CSV files here as needed
                const parseResults = Papa.parse(csvData, {
                  /* CSV parsing options */
                  header: true,
                })
                return parseResults.data
              })
              setAllKlamathData(combined)
            })
            .catch((error) => {
              console.error("Error fetching or processing CSV data:", error)
            })
        }
        await fetchData()
      } catch (error) {
        console.error(error)
      }
    })()
  }, [data])

  useState(null)
  const [selectedFilters, setSelectedFilters] = useState({
    monitoringLocation: null,
    characteristicName: "",
    startYear: "",
    endYear: "",
  })

  const [map, setMap] = useState(null)
  const markerRef = useRef([])

  return (
    <Layout pageInfo={{ pageName: "data" }}>
      <SEO title="Water Quality Monitoring Data" />
      <Grid container style={{ padding: "4em 0" }} className="grid-container">
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
              {/* <Button fluid>Get Updated Data</Button> */}
              {/* <Button fluid>Download Data</Button> */}
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={16} style={{ marginBottom: 25, zIndex: 1100 }}>
            <DataPageFilters
              monitoringLocations={monitoringLocations}
              setSelectedFilters={setSelectedFilters}
              allKlamathData={allKlamathData}
              setFilteredKlamathData={setFilteredKlamathData}
              map={map}
              markerRef={markerRef}
            />
          </Grid.Column>
          <Grid.Column only="tablet computer" tablet={6} computer={6}>
            <DataMap
              data={monitoringLocations}
              selectedMonitoringLocation={selectedFilters.monitoringLocation}
              map={map}
              setMap={setMap}
              markerRef={markerRef}
            />
          </Grid.Column>
          <Grid.Column
            mobile={16}
            tablet={10}
            computer={10}
            style={{ height: 600, position: "relative" }}
          >
            <LineChart
              selectedFilters={selectedFilters}
              data={filteredKlamathData}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ flexDirection: "column" }}>
          <Button style={{ marginLeft: "auto" }}>
            <Icon name="refresh" />
            Get Updated Data
          </Button>
          <DataPageTable
            data={selectedFilters.monitoringLocation ? filteredKlamathData : []}
          />
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
    allFile(filter: { name: { regex: "/^klamathData/" } }) {
      edges {
        node {
          name
          publicURL
        }
      }
    }
    file(relativePath: { eq: "NWQMC_logo.png" }) {
      childImageSharp {
        fluid(maxWidth: 100, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
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
