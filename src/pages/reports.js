import React, { useState, useEffect, useCallback } from "react"
import { Grid, Card, Dropdown } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DataDownload from "../components/dataDownload"
import { graphql } from "gatsby"
import ReportSearch from "../components/reportSearch"
import { formatTextCasing } from "../helpers/utils"

const sortingOptions = [
  {
    key: "Year - Descending",
    value: "Year - Descending",
    text: "Year - Descending",
    sort: function (reports) {
      return reports.sort((a, b) => +b.year - +a.year)
    },
  },
  {
    key: "Year - Ascending",
    value: "Year - Ascending",
    text: "Year - Ascending",
    sort: function (reports) {
      return reports.sort((a, b) => +a.year - +b.year)
    },
  },
  {
    key: "Alphabetically - A-Z",
    value: "Alphabetically - A-Z",
    text: "Alphabetically - A-Z",
    sort: function (reports) {
      return reports.sort((a, b) => (a.title > b.title ? 1 : -1))
    },
  },
  {
    key: "Alphabetically - Z-A",
    value: "Alphabetically - Z-A",
    text: "Alphabetically - Z-A",
    sort: function (reports) {
      return reports.sort((a, b) => (a.title < b.title ? 1 : -1))
    },
  },
]

export default ({ data }) => {
  const [searchFilteredReports, setSearchFilteredReports] = useState(
    data.allReportsMetadataCsv.nodes
  )
  const [filteredReports, setFilteredReports] = useState(
    data.allReportsMetadataCsv.nodes.sort((a, b) => +b.year - +a.year)
  )
  const [currentReportTypeFilters, setCurrentReportTypeFilters] = useState([])

  const reportTypeOptions = data.allReportsMetadataCsv.distinct.map(
    (reportType, index) => ({
      key: index,
      text: formatTextCasing(reportType),
      value: reportType,
    })
  )

  const [sortMethod, setSortMethod] = useState(sortingOptions.at(0))

  const reportTypeChangeHandler = (event, { value }) => {
    const searchFilteredReportsCopy = sortMethod.sort([
      ...searchFilteredReports,
    ])
    if (value.length > 0) {
      setFilteredReports(
        searchFilteredReportsCopy.filter((report) =>
          value.includes(report.type)
        )
      )
    } else {
      setFilteredReports(searchFilteredReportsCopy)
    }

    setCurrentReportTypeFilters(value)
  }

  const sortMethodChangeHandler = useCallback(
    (event, { value }) => {
      const selectedSortMethod = sortingOptions.find(
        (option) => option.value === value
      )

      setSortMethod(selectedSortMethod)

      switch (selectedSortMethod.value) {
        case "Year - Descending":
          setFilteredReports((prevFilteredReports) =>
            selectedSortMethod.sort(prevFilteredReports)
          )

          return
        case "Year - Ascending":
          setFilteredReports((prevFilteredReports) =>
            selectedSortMethod.sort(prevFilteredReports)
          )

          return
        case "Alphabetically - A-Z":
          setFilteredReports((prevFilteredReports) =>
            selectedSortMethod.sort(prevFilteredReports)
          )
          return
        case "Alphabetically - Z-A":
          setFilteredReports((prevFilteredReports) =>
            selectedSortMethod.sort(prevFilteredReports)
          )
          return

        default:
          return
      }
    },
    [sortingOptions]
  )

  // search query changes
  useEffect(() => {
    if (currentReportTypeFilters.length > 0) {
      setFilteredReports(
        searchFilteredReports.filter((report) =>
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
      <Grid container columns={3} doubling stackable>
        <Grid.Row>
          <Grid.Column>
            <ReportSearch
              sortMethod={sortMethod}
              setSearchFilteredReports={setSearchFilteredReports}
              allData={data.allReportsMetadataCsv.nodes}
              className="filter-input-field"
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              fluid
              placeholder="Report Type"
              search
              selection
              multiple
              onChange={reportTypeChangeHandler}
              options={reportTypeOptions}
              className="filter-input-field"
            />
          </Grid.Column>
          <Grid.Column>
            <Dropdown
              placeholder="Sort by"
              fluid
              selection
              onChange={sortMethodChangeHandler}
              options={sortingOptions}
              className="filter-input-field"
            />
          </Grid.Column>
        </Grid.Row>
        {filteredReports.map((report, index) => (
          <Grid.Column>
            <DataDownload reportMetaData={report} key={index} />
          </Grid.Column>
        ))}
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
