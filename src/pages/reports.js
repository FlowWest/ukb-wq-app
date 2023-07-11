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
import * as AWS from "aws-sdk"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const ReportsPage = ({ data }) => {
  const { user } = useContext(UserContext)
  const [uploadReportModalOpen, setUploadReportModalOpen] = useState(false)

  const [isTabletScreenSize, setIsTabletScreenSize] = useState(false)

  useEffect(() => {
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

  const [sortMethod, setSortMethod] = useState(reportSortingOptions.at(0))

  const reportVisibilityFilterOptions = [
    {
      key: "all",
      value: "All Reports",
      text: "All Reports",
      filter: function (reports) {
        return reports
      },
    },
    {
      key: "active",
      value: "Active Reports",
      text: "Active Reports",
      filter: function (reports) {
        return reports.filter((report) => +report.year % 2 === 1)
      },
    },
    {
      key: "hidden",
      value: "Hidden Reports",
      text: "Hidden Reports",
      filter: function (reports) {
        return reports.filter((report) => +report.year % 2 === 0)
      },
    },
  ]

  const [reportVisibilityFilterMethod, setReportVisibilityFilterMethod] =
    useState(
      user
        ? reportVisibilityFilterOptions.at(0)
        : reportVisibilityFilterOptions.at(1)
    )

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

  const reportVisibilityChangeHandler = (event, { value }) => {
    switch (value) {
      case "All Reports":
        setFilteredReports(sortMethod.sort(searchFilteredReports))
        break
      case "Active Reports":
        setFilteredReports(
          sortMethod
            .sort(searchFilteredReports)
            .filter((report) => +report.year % 2 === 1)
        )
        break
      case "Hidden Reports":
        setFilteredReports(
          sortMethod
            .sort(searchFilteredReports)
            .filter((report) => +report.year % 2 === 0)
        )
        break
    }
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
      user
        ? setFilteredReports(sortMethod.sort(searchFilteredReports))
        : setFilteredReports(
            sortMethod
              .sort(searchFilteredReports)
              .filter((report) => report.year % 2 === 1)
          )
    }
  }, [searchFilteredReports, currentReportTypeFilters, user])

  const testUpload = async () => {
    AWS
    const client = new S3Client({ ...AWS.config, region: "us-west-2" })

    const command = new PutObjectCommand({
      Bucket: "klamath-water-quality-app",
      Key: "hello-s3-2.txt",
      Body: "Hello S3!",
    })
    try {
      const response = await client.send(command)
      console.log(response)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Layout pageInfo={{ pageName: "reports" }}>
      <SEO title="Water Quality Reports" />
      <Grid container>
        {user && (
          <Grid.Column computer={3}>
            <Dropdown
              fluid
              placeholder="All Reports"
              selection
              onChange={reportVisibilityChangeHandler}
              options={reportVisibilityFilterOptions}
              className="filter-input-field"
            />
          </Grid.Column>
        )}
        <Grid.Column mobile={16} tablet={user ? 6 : 8} computer={user ? 4 : 8}>
          {/* <Grid.Column mobile={16} tablet={user ? 6 : 8} computer={user ? 7 : 8}> */}
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
      {/* <Button
        mobile={2}
        computer={2}
        tablet={2}
        color="blue"
        icon="upload"
        content={isTabletScreenSize ? null : "test"}
        onClick={testUpload}
      /> */}
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
