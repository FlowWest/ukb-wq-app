import React, { useState, useContext, useCallback, useEffect } from "react"
import { UserContext } from "../../gatsby-browser"
import { Button, Dropdown, Grid, Modal } from "semantic-ui-react"
import ReportSearch from "./ReportSearch"
import ReportsGridView from "./ReportsGridView"
import ReportsTable from "./ReportsTable"
import { reportVisibilityFilterOptions } from "../helpers/reportVisibilityFilterMethod"
import { ReportModalContext } from "../hooks/useReportModalContext"
import usePagination from "../hooks/usePagination"
import reportSortingOptions from "../helpers/reportSortingOptions"
import useTabletScreenSize from "../hooks/useTabletScreenSize"
import { formatTextCasing } from "../helpers/utils"

const ReportsPageContent = () => {
  const { user } = useContext(UserContext) || {}
  const { state: reportsState, dispatch: reportsDispatch } =
    useContext(ReportModalContext)
  console.log("🚀 ~ ReportsPageContent ~ reportsState:", reportsState)
  const [sortMethod, setSortMethod] = useState(reportSortingOptions.at(0))

  const [filteredReports, setFilteredReports] = useState(
    reportsState?.allReports?.sort((a, b) => +b.year - +a.year)
  )

  const { isTabletScreenSize, handleResize } = useTabletScreenSize()

  const [currentReportTypeFilters, setCurrentReportTypeFilters] = useState([])
  const [currentSearchFilterString, setCurrentSearchFilterString] = useState("")
  console.log(
    "🚀 ~ ReportsPageContent ~ currentSearchFilterString:",
    currentSearchFilterString
  )

  const [reportTypeOptions, setReportTypeOptions] = useState([])

  const [reportVisibilityFilterMethod, setReportVisibilityFilterMethod] =
    useState(
      user
        ? reportVisibilityFilterOptions.at(0)
        : reportVisibilityFilterOptions.at(1)
    )

  const [layoutState, setLayoutState] = useState("grid")
  const gridLayoutSelected = layoutState === "grid"
  const listLayoutSelected = layoutState === "list"

  const {
    paginatedItems: paginatedReports,
    currentPage,
    handlePaginationPageChange,
    numberOfPages,
    setCurrentPage,
  } = usePagination({ tableData: filteredReports, itemsPerPage: 9, sortMethod })

  const reportTypeChangeHandler = (event, { value }) => {
    setCurrentReportTypeFilters(value)
    reportsDispatch({
      type: "FILTER_REPORTS",
      payload: {
        selectedReportVisibilityFilter: reportVisibilityFilterMethod.value,
        currentSearchFilterString,
        currentReportTypeFilters: value,
      },
    }) //
    setCurrentPage(1)
  }

  const reportVisibilityChangeHandler = (event, { value }) => {
    console.log("🚀 ~ reportVisibilityChangeHandler ~ value:", value)

    const selectedReportVisibilityFilter = reportVisibilityFilterOptions.find(
      (option) => option.value === value
    )
    setReportVisibilityFilterMethod(selectedReportVisibilityFilter)
    reportsDispatch({
      type: "FILTER_REPORTS",
      payload: {
        selectedReportVisibilityFilter: value,
        currentSearchFilterString,
        currentReportTypeFilters,
      },
    }) //
    setCurrentPage(1)
  }

  const searchStringChangeHandler = (value) => {
    setCurrentSearchFilterString(value)
    reportsDispatch({
      type: "FILTER_REPORTS",
      payload: {
        selectedReportVisibilityFilter: reportVisibilityFilterMethod.value,
        currentSearchFilterString: value,
        currentReportTypeFilters,
      },
    }) //
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

  useEffect(() => {
    setFilteredReports(
      reportsState?.allReports.sort((a, b) => +b.year - +a.year)
    )

    const uniqueReportTypes = [
      ...new Set(reportsState?.allReports?.map((item) => item.type)),
    ].sort(function (a, b) {
      return a.toLowerCase().localeCompare(b.toLowerCase())
    })

    const reportTypesArray = uniqueReportTypes.map((reportType, index) => ({
      key: index,
      text: formatTextCasing(reportType),
      value: reportType,
    }))

    setReportTypeOptions(reportTypesArray)
  }, [reportsState?.allReports])

  // useEffect(() => {
  //   setReportVisibilityFilterMethod(
  //     user && Object.keys(user).length
  //       ? reportVisibilityFilterOptions.at(0)
  //       : reportVisibilityFilterOptions.at(1)
  //   )
  // }, [user])
  return (
    <>
      <Grid container>
        <Grid.Column style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            icon="grid layout"
            attached="left"
            content="Grid"
            color="blue"
            basic={!gridLayoutSelected}
            onClick={() => setLayoutState("grid")}
          />
          <Button
            icon="list"
            content="List"
            attached="right"
            color="blue"
            basic={!listLayoutSelected}
            onClick={() => setLayoutState("list")}
          />
        </Grid.Column>
      </Grid>
      <Grid container className="grid-container">
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
            searchStringChangeHandler={searchStringChangeHandler}
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
            options={reportsState?.reportTypeOptions}
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
          <Grid.Column mobile={16} computer={3} tablet={4}>
            <Button
              color="blue"
              icon="upload"
              content={isTabletScreenSize ? null : "Upload"}
              fluid
            />
          </Grid.Column>
        )}
      </Grid>
      {listLayoutSelected && (
        <Grid container>
          <Grid.Row>
            <ReportsTable sortMethod={sortMethod} />
          </Grid.Row>
        </Grid>
      )}
      {gridLayoutSelected && (
        <ReportsGridView
          filteredReports={reportsState?.filteredReports}
          sortMethod={sortMethod}
        />
      )}
    </>
  )
}

export default ReportsPageContent
