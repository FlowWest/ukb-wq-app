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
import reportSortingOptions from "../helpers/reportSortingOptions"
import Papa from "papaparse"
import { orderBy } from "lodash"

const ReportsPage = ({ data }) => {
  const { user } = useContext(UserContext)
  const [uploadReportModalOpen, setUploadReportModalOpen] = useState(false)
  const [isTabletScreenSize, setIsTabletScreenSize] = useState(false)
  const [allData, setAllData] = useState([])
  const [searchFilteredReports, setSearchFilteredReports] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [currentReportTypeFilters, setCurrentReportTypeFilters] = useState([])
  const [reportTypeOptions, setReportTypeOptions] = useState([])

  useEffect(() => {
    ;(async () => {
      try {
        fetch(
          "https://klamath-water-quality-app.s3.us-west-2.amazonaws.com/reportsMetadata.csv"
        )
          .then((response) => response.text())
          .then((value) => {
            const { data } = Papa.parse(value)
            const headers = data.shift()

            const reportsData = orderBy(
              data.map((row) => {
                const obj = {}

                row.forEach((value, index) => {
                  obj[headers[index]] = value
                })

                return obj
              }),
              ["startYear"],
              ["desc"]
            )
            console.log("reportsdata", reportsData)
            setAllData(reportsData)
          })
      } catch (error) {
        console.error(error)
      }
    })()
    const handleResize = (e) => {
      const { innerWidth } = e.target
      if (innerWidth >= 768 && innerWidth <= 991) setIsTabletScreenSize(true)

      if (innerWidth < 768 || innerWidth > 991) setIsTabletScreenSize(false)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    setSearchFilteredReports(allData)
    setFilteredReports(allData.sort((a, b) => +b.year - +a.year))

    const uniqueReportTypes = [
      ...new Set(allData.map((item) => item.type)),
    ].sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    })

    const reportTypesArray = uniqueReportTypes.map((reportType, index) => ({
      key: index,
      text: formatTextCasing(reportType),
      value: reportType,
    }))

    setReportTypeOptions(reportTypesArray)
  }, [allData])

  const [sortMethod, setSortMethod] = useState(reportSortingOptions.at(0))

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
      const selectedSortMethod = reportSortingOptions.find(
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
    [reportSortingOptions]
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
            allData={allData}
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
            options={reportSortingOptions}
            className="filter-input-field"
          />
        </Grid.Column>
        {user && (
          <Modal
            closeIcon
            open={uploadReportModalOpen}
            onOpen={() => setUploadReportModalOpen(true)}
            onClose={() => setUploadReportModalOpen(false)}
            trigger={
              <Grid.Column mobile={16} computer={3} tablet={2}>
                <Button
                  color="blue"
                  icon="upload"
                  content={isTabletScreenSize ? null : "Upload"}
                  fluid
                />
              </Grid.Column>
            }
          >
            <Modal.Header>Upload Report</Modal.Header>
            <Modal.Content>
              <UploadReportForm
                onClose={() => setUploadReportModalOpen(false)}
              />
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
