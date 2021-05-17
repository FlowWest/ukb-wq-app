import React, { useState, useEffect } from "react"
import { Grid, Card, Dropdown } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DataDownload from "../components/dataDownload"
import { graphql } from "gatsby"
import ReportSearch from "../components/reportSearch"
import { formatTextCasing } from "../helpers/utils"

export default ({ data }) => {
  const [searchFilteredReports, setSearchFilteredReports] = useState(
    data.allReportsMetadataCsv.nodes
  )
  const [filteredReports, setFilteredReports] = useState(
    data.allReportsMetadataCsv.nodes
  )
  const [currentReportTypeFilters, setCurrentReportTypeFilters] = useState([])

  const reportTypeOptions = data.allReportsMetadataCsv.distinct.map(
    (reportType, index) => ({
      key: index,
      text: formatTextCasing(reportType),
      value: reportType,
    })
  )

  const reportTypeChangeHandler = (event, { value }) => {
    if (value.length > 0) {
      setFilteredReports(
        searchFilteredReports.filter(report => value.includes(report.type))
      )
    } else {
      setFilteredReports(searchFilteredReports)
    }

    setCurrentReportTypeFilters(value)
  }

  // search query changes
  useEffect(() => {
    if (currentReportTypeFilters.length > 0) {
      setFilteredReports(
        searchFilteredReports.filter(report =>
          currentReportTypeFilters.includes(report.type)
        )
      )
    } else {
      setFilteredReports(searchFilteredReports)
    }
  }, [searchFilteredReports, currentReportTypeFilters])

  return (
    <Layout pageInfo={{ pageName: "reports" }}>
      <SEO title="Water Quality Reports" />
      <Grid container>
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
            setSearchFilteredReports={setSearchFilteredReports}
            allData={data.allReportsMetadataCsv.nodes}
          />
        </Grid.Row>
        <Grid.Row>
          <Card.Group className="reports" itemsPerRow={4}>
            {filteredReports.map((report, index) => (
              <DataDownload reportMetaData={report} key={index} />
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
