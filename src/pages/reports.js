import React, { useState, useEffect } from "react"
import { Grid, Header, Card, Dropdown } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DataDownload from "../components/dataDownload"
import { graphql } from "gatsby"
import ReportSearch from "../components/reportSearch"
import { formatTextCasing } from "../helpers/utils"

export default ({ data }) => {
  const [filteredReports, setFilteredReports] = useState(
    data.allReportsMetadataCsv.nodes
  )
  const [currentReportTypeFilters, setCurrentReportTypeFilters] = useState([])

  useEffect(() => {}, [filteredReports])

  const reportTypeOptions = data.allReportsMetadataCsv.distinct.map(
    (reportType, index) => ({
      key: index,
      text: formatTextCasing(reportType),
      value: reportType,
    })
  )

  // dropdown: location, report type
  // year slider
  const reportTypeChangeHandler = (event, { value, allData }) => {
    console.log("adad", allData)
    if (allData && value.length) {
      console.log("hello", value)
      setFilteredReports(allData.filter(report => value.includes(report.type)))
    } else if (value.length > 0) {
      setFilteredReports(
        filteredReports.filter(report => value.includes(report.type))
      )
    } else {
      setFilteredReports(data.allReportsMetadataCsv.nodes)
    }

    setCurrentReportTypeFilters(value)
  }

  return (
    <Layout pageInfo={{ pageName: "reports" }}>
      <SEO title="Water Quality Reports" />
      <Grid container>
        {/* <Grid.Row>
          <Header
            as="h1"
            content="Klamath Tribes Water Quality Report Repository"
          />
        </Grid.Row> */}
        <Grid.Row className="report-filters-container">
          <Dropdown
            placeholder="Report Type"
            search
            selection
            multiple
            onChange={reportTypeChangeHandler}
            options={reportTypeOptions}
          />
          <ReportSearch
            source={filteredReports}
            setFilteredReports={setFilteredReports}
            reportTypeChangeHandler={reportTypeChangeHandler}
            currentReportTypeFilters={currentReportTypeFilters}
            allData={data.allReportsMetadataCsv.nodes}
          />
        </Grid.Row>
        <Grid.Row>
          <Card.Group className="reports" itemsPerRow={4}>
            {filteredReports.map(report => (
              <DataDownload reportMetaData={report} />
            ))}
          </Card.Group>
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export const query = graphql`
  query {
    allReportsMetadataCsv {
      distinct(field: type)
      nodes {
        authors
        year
        endyear
        filename
        location
        organization
        title
        type
      }
    }
  }
`
