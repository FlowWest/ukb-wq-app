import React, { useState, useEffect, useCallback, useContext } from "react"
import { Button, Grid, Dropdown, Pagination, Modal } from "semantic-ui-react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import DataDownloadCard from "../components/DataDownloadCard"
import ReportSearch from "../components/ReportSearch"
import { formatTextCasing } from "../helpers/utils"
import { UserContext } from "../../gatsby-browser"
import UploadReportForm from "../components/UploadReportForm"
import reportSortingOptions from "../helpers/reportSortingOptions"
import { filter, escapeRegExp, orderBy } from "lodash"
import * as AWS from "aws-sdk"

const ReportsPage = () => {
  const { user } = useContext(UserContext) || {}
  const [uploadReportModalOpen, setUploadReportModalOpen] = useState(false)
  const [isTabletScreenSize, setIsTabletScreenSize] = useState(false)
  const [sortMethod, setSortMethod] = useState(reportSortingOptions.at(0))
  const [allReports, setAllReports] = useState([])
  const [filteredReports, setFilteredReports] = useState(
    allReports.sort((a, b) => +b.year - +a.year)
  )
  const [currentReportTypeFilters, setCurrentReportTypeFilters] = useState([])
  const [currentSearchFilterString, setCurrentSearchFilterString] = useState("")
  const [reportTypeOptions, setReportTypeOptions] = useState([])
  const [getReportsError, setGetReportsError] = useState(false)

  useEffect(() => {
    ;(async () => {
      try {
        await getAllReports()
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
    setFilteredReports(allReports.sort((a, b) => +b.year - +a.year))

    const uniqueReportTypes = [
      ...new Set(allReports.map((item) => item.type)),
    ].sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    })

    const reportTypesArray = uniqueReportTypes.map((reportType, index) => ({
      key: index,
      text: formatTextCasing(reportType),
      value: reportType,
    }))

    setReportTypeOptions(reportTypesArray)
  }, [allReports])

  const reportVisibilityFilterOptions = [
    {
      key: "all",
      value: "All Reports",
      text: "All Reports",
    },
    {
      key: "active",
      value: "Active Reports",
      text: "Active Reports",
    },
    {
      key: "hidden",
      value: "Hidden Reports",
      text: "Hidden Reports",
    },
  ]

  useEffect(() => {
    setReportVisibilityFilterMethod(
      user && Object.keys(user).length
        ? reportVisibilityFilterOptions.at(0)
        : reportVisibilityFilterOptions.at(1)
    )
  }, [user])

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
    setCurrentReportTypeFilters(value)
    setCurrentPage(1)
  }

  const reportVisibilityChangeHandler = (event, { value }) => {
    const selectedReportVisibilityFilter = reportVisibilityFilterOptions.find(
      (option) => option.value === value
    )
    setReportVisibilityFilterMethod(selectedReportVisibilityFilter)
    setCurrentPage(1)
  }

  const sortMethodChangeHandler = useCallback(
    (event, { value }) => {
      const selectedSortMethod = reportSortingOptions.find(
        (option) => option.value === value
      )

      setSortMethod(selectedSortMethod)
    },
    [reportSortingOptions]
  )

  // search query changes
  // report type filter changes
  // visibility filter changes

  // filter on all data
  useEffect(() => {
    let filteredReportsArray = allReports

    if (reportVisibilityFilterMethod) {
      switch (reportVisibilityFilterMethod.key) {
        case "all":
          filteredReportsArray = allReports
          break
        case "active":
          filteredReportsArray = allReports.filter(
            (report) => report.active === "TRUE"
          )
          break
        case "hidden":
          filteredReportsArray = allReports.filter(
            (report) => report.active === "FALSE"
          )
          break
      }
    }

    if (currentSearchFilterString) {
      const re = new RegExp(escapeRegExp(currentSearchFilterString), "i")
      const isMatch = (result) => re.test(`${result.title} ${result.authors}`)

      filteredReportsArray = filter(filteredReportsArray, isMatch)
    }

    if (currentReportTypeFilters.length > 0) {
      filteredReportsArray = filteredReportsArray.filter((report) =>
        currentReportTypeFilters.includes(report.type)
      )
    }

    setFilteredReports(filteredReportsArray)
  }, [
    reportVisibilityFilterMethod,
    currentSearchFilterString,
    currentReportTypeFilters,
    allReports,
  ])

  const getAllReports = async () => {
    try {
      if (!AWS.config.credentials) {
        AWS.config.region = "us-west-1"
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID, // your identity pool id here
        })
      }
      // Create a DynamoDB DocumentClient
      const docClient = new AWS.DynamoDB.DocumentClient()

      // Specify the table name
      const tableName = "reports_metadata"
      const params = {
        TableName: tableName,
      }
      const result = await docClient.scan(params).promise()
      const items = result.Items

      const reportsData = orderBy(items, ["year"], ["desc"])
      setAllReports(reportsData)
      setGetReportsError(false)
    } catch (error) {
      setGetReportsError(true)
      // throw error
    }
  }

  return (
    <Layout pageInfo={{ pageName: "reports" }}>
      <SEO title="Water Quality Reports" />
      {getReportsError ? (
        <Grid container className="error-message">
          Error retrieving reports. Please refresh the page to try again.
        </Grid>
      ) : (
        <>
          <Grid container>
            {user && Object.keys(user).length > 0 && (
              <Grid.Column mobile={16} tablet={4} computer={3}>
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
            <Grid.Column
              mobile={16}
              tablet={user && Object.keys(user).length ? 12 : 8}
              computer={user && Object.keys(user).length ? 4 : 8}
            >
              <ReportSearch
                className="filter-input-field"
                setCurrentSearchFilterString={setCurrentSearchFilterString}
                setCurrentPage={setCurrentPage}
              />
            </Grid.Column>
            <Grid.Column
              mobile={16}
              tablet={user && Object.keys(user).length ? 6 : 4}
              computer={user && Object.keys(user).length ? 3 : 4}
            >
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
            <Grid.Column
              mobile={16}
              tablet={user && Object.keys(user).length ? 6 : 4}
              computer={user && Object.keys(user).length ? 3 : 4}
            >
              <Dropdown
                placeholder="Sort by"
                fluid
                selection
                onChange={sortMethodChangeHandler}
                options={reportSortingOptions}
                className="filter-input-field"
              />
            </Grid.Column>
            {user && Object.keys(user).length > 0 && (
              <Modal
                closeIcon
                open={uploadReportModalOpen}
                onOpen={() => setUploadReportModalOpen(true)}
                onClose={() => setUploadReportModalOpen(false)}
                trigger={
                  <Grid.Column mobile={16} computer={3} tablet={4}>
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
                    allReports={allReports}
                    getAllReports={getAllReports}
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
            {paginatedReports.map((report) => (
              <Grid.Column key={report.report_uuid}>
                <DataDownloadCard
                  allReports={allReports}
                  getAllReports={getAllReports}
                  reportMetaData={report}
                />
              </Grid.Column>
            ))}
          </Grid>
          <Grid container>
            <Pagination
              activePage={currentPage}
              defaultActivePage={1}
              totalPages={numberOfPages}
              onPageChange={handlePaginationPageChange}
            />
          </Grid>
        </>
      )}
    </Layout>
  )
}

// export const query = graphql`
//   query {
//     allReportsMetadataCsv {
//       distinct(field: type)
//       nodes {
//         authors
//         year
//         endyear
//         filename
//         location
//         organization
//         title
//         type
//         active
//       }
//     }
//   }
// `

export default ReportsPage
