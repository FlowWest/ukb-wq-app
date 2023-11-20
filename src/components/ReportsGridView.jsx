import React from "react"
import { Grid, Pagination } from "semantic-ui-react"
import ReportCard from "./ReportCard"
import usePagination from "../hooks/usePagination"

const ReportsGridView = ({ filteredReports, sortMethod }) => {
  const {
    paginatedItems: paginatedReports,
    currentPage,
    handlePaginationPageChange,
    numberOfPages,
    setCurrentPage,
  } = usePagination({ tableData: filteredReports, itemsPerPage: 9, sortMethod })

  return (
    <>
      <Grid
        container
        columns={3}
        doubling
        stackable
        className="mobile-grid-container grid-container report-cards-wrapper"
      >
        {paginatedReports?.length > 0 ? (
          <>
            {paginatedReports?.map((report) => (
              <Grid.Column key={report.report_uuid}>
                <ReportCard reportMetaData={report} />
              </Grid.Column>
            ))}
            <Grid.Row centered>
              <Pagination
                activePage={currentPage}
                totalPages={numberOfPages}
                onPageChange={handlePaginationPageChange}
              />
            </Grid.Row>
          </>
        ) : (
          <Grid.Row style={{ height: 100 }}>
            <p style={{ fontSize: 20, margin: "auto" }}>
              No results matched your search criteria
            </p>
          </Grid.Row>
        )}
      </Grid>
    </>
  )
}

export default ReportsGridView
