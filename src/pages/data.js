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
import { saveAs } from "file-saver"

export const DataPage = ({ data }) => {
  const monitoringLocations = data.allMonitoringStationsLocationsCsv.nodes
  const [allKlamathData, setAllKlamathData] = useState([])
  const [filteredKlamathData, setFilteredKlamathData] = useState(allKlamathData)
  const [selectedFilters, setSelectedFilters] = useState({
    monitoringLocation: null,
    characteristicName: "",
    startYear: "",
    endYear: "",
  })

  const [map, setMap] = useState(null)
  const markerRef = useRef([])

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

  const downloadData = (dataset, allData) => {
    const csvContent = Papa.unparse(JSON.stringify(dataset))
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    })
    saveAs(
      blob,
      allData
        ? `all_klamath_wqx_data.csv`
        : `klamath_wqx_data_${selectedFilters.monitoringLocation}_${selectedFilters.characteristicName}.csv`
    )
  }

  return (
    <Layout pageInfo={{ pageName: "data" }}>
      <SEO title="Water Quality Monitoring Data" />
      <Grid container className="grid-container">
        <Grid.Row
          style={{
            justifyContent: "flex-start",
            padding: "0 1rem",
            color: "hsla(0, 0%, 0%, .7)",
          }}
        >
          <p>
            <i>Current Dataset Range: 01/23/1990 - 12/13/2018</i>
          </p>
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
          <Grid.Column only="tablet computer" tablet={16} computer={6}>
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
            tablet={16}
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
          <Grid.Row style={{ marginLeft: "auto" }}>
            <Button
              style={{ marginLeft: "auto", marginRight: "15px" }}
              onClick={() => {
                downloadData(filteredKlamathData, false)
              }}
            >
              <Icon name="download" />
              Download Filtered Data
            </Button>
            <Button
              style={{ marginLeft: "auto" }}
              onClick={() => {
                downloadData(allKlamathData, true)
              }}
            >
              <Icon name="download" />
              Download All Data
            </Button>
          </Grid.Row>
          <DataPageTable
            data={
              selectedFilters.monitoringLocation
                ? filteredKlamathData
                : allKlamathData
            }
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
