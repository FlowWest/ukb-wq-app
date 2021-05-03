import React, { useState } from "react"
import { Grid, Header, Card, Dropdown } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DataDownload from "../components/dataDownload"
import { graphql } from "gatsby"
import ReportSearch from "../components/reportSearch"

export default ({ data }) => {
  const [filteredReports, setFilteredReports] = useState(
    data.allReportsMetadataCsv.nodes
  )

  const formatTextCasing = str => {
    var splitStr = str.split(" ")
    for (var i = 0; i < splitStr.length; i++) {
      // You do not need to check if i is larger than splitStr length, as your for does that for you
      // Assign it back to the array
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    // Directly return the joined string
    return splitStr.join(" ")
  }

  const reportTypeOptions = data.allReportsMetadataCsv.distinct.map(
    (reportType, index) => ({
      key: index,
      text: formatTextCasing(reportType),
      value: reportType,
    })
  )

  // dropdown: location, report type
  // year slider
  const reportTypeChangeHandler = (event, { value }) => {
    if (value.length > 0) {
      setFilteredReports(
        data.allReportsMetadataCsv.nodes.filter(report =>
          value.includes(report.type)
        )
      )
    } else {
      setFilteredReports(data.allReportsMetadataCsv.nodes)
    }
  }

  return (
    <Layout pageInfo={{ pageName: "reports" }}>
      <SEO title="Water Quality Reports" />
      <Grid container>
        <Grid.Row>
          <Header
            as="h1"
            content="Klamath Tribes Water Quality Report Repository"
          />
        </Grid.Row>
        <Grid.Row>
          <Dropdown
            placeholder="Report Type"
            search
            selection
            multiple
            onChange={reportTypeChangeHandler}
            options={reportTypeOptions}
          />
          <ReportSearch
            source={data.allReportsMetadataCsv.nodes}
            setFilteredReports={setFilteredReports}
          />
        </Grid.Row>
        <Grid.Row>
          <Card.Group>
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
