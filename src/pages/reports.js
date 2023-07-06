import React, { useState, useEffect, useCallback, useContext } from "react"
import {
  Button,
  Grid,
  Dropdown,
  Pagination,
  Modal,
  Form,
} from "semantic-ui-react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import DataDownloadCard from "../components/DataDownloadCard"
import { graphql } from "gatsby"
import ReportSearch from "../components/ReportSearch"
import { formatTextCasing } from "../helpers/utils"
import { UserContext } from "../../gatsby-browser"
import UploadReportForm from "../components/UploadReportForm"

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

const ReportsPage = ({ data }) => {
  const { user, setUser } = useContext(UserContext)

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

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1)
  const reportsPerPage = 9
  const lastIndex = currentPage * reportsPerPage
  const firstIndex = lastIndex - reportsPerPage
  const paginatedReports = sortMethod
    .sort(filteredReports)
    .slice(firstIndex, lastIndex)
  const numberOfPages = Math.ceil(filteredReports.length / reportsPerPage)

  const handlePaginationPageChange = (e, { activePage }) => {
    setCurrentPage(activePage)
  }

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
      <Grid container>
        <Grid.Column mobile={16} tablet={user ? 6 : 8} computer={user ? 7 : 8}>
          <ReportSearch
            sortMethod={sortMethod}
            setSearchFilteredReports={setSearchFilteredReports}
            allData={data.allReportsMetadataCsv.nodes}
            className="filter-input-field"
          />
        </Grid.Column>
        <Grid.Column mobile={16} tablet={4} computer={user ? 3 : 4}>
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
        <Grid.Column mobile={16} tablet={4} computer={user ? 3 : 4}>
          <Dropdown
            placeholder="Sort by"
            fluid
            selection
            onChange={sortMethodChangeHandler}
            options={sortingOptions}
            className="filter-input-field"
          />
        </Grid.Column>
        {user && (
          <Modal
            closeIcon
            trigger={
              <Grid.Column only="mobile computer" mobile={16} computer={3}>
                <Button color="blue" icon="upload" content="Upload" fluid />
              </Grid.Column>
              // <Grid.Column only="tablet" tablet={2}>
              //   <Button color="blue" icon="upload" fluid />
              // </Grid.Column>
            }
          >
            <Modal.Header>Upload Report</Modal.Header>
            <Modal.Content>
              <UploadReportForm />
            </Modal.Content>
          </Modal>
        )}
      </Grid>
      <Grid
        container
        columns={3}
        doubling
        stackable
        className="mobile-grid-container"
      >
        {paginatedReports.map((report, index) => (
          <Grid.Column key={index}>
            <DataDownloadCard reportMetaData={report} />
          </Grid.Column>
        ))}
      </Grid>
      <Grid container>
        <Pagination
          defaultActivePage={currentPage}
          totalPages={numberOfPages}
          onPageChange={handlePaginationPageChange}
        />
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

export default ReportsPage
