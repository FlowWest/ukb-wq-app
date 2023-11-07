import React from "react"
import { Grid, Pagination } from "semantic-ui-react"
import DataDownloadCard from "./DataDownloadCard"
import usePagination from "../hooks/usePagination"

const ReportsGridView = ({
  filteredReports,
  user,
  allReports,
  getAllReports,
  sortMethod,
}) => {
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
        {paginatedReports.map((report) => (
          <Grid.Column key={report.report_uuid}>
            <DataDownloadCard
              allReports={allReports}
              getAllReports={getAllReports}
              reportMetaData={report}
            />
          </Grid.Column>
        ))}
        <Grid.Row centered>
          <Pagination
            activePage={currentPage}
            totalPages={numberOfPages}
            onPageChange={handlePaginationPageChange}
          />
        </Grid.Row>
      </Grid>
    </>
  )
}

export default ReportsGridView
