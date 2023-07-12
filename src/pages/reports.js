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
import Papa from "papaparse"
import { filter, escapeRegExp, orderBy } from "lodash"

const ReportsPage = () => {
  const { user } = useContext(UserContext)
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
            setAllReports(reportsData)
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
      user
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
  }

  const reportVisibilityChangeHandler = (event, { value }) => {
    const selectedReportVisibilityFilter = reportVisibilityFilterOptions.find(
      (option) => option.value === value
    )
    setReportVisibilityFilterMethod(selectedReportVisibilityFilter)
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
          <ReportSearch
            className="filter-input-field"
            setCurrentSearchFilterString={setCurrentSearchFilterString}
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
