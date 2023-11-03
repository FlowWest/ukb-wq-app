import React, { useState } from "react"
import { Icon, Pagination, Table } from "semantic-ui-react"
import { removeNameFromString } from "../helpers/utils"
import usePagination from "../hooks/usePagination"

const ReportsTable = ({ reportsObject }) => {
  const authorsArray = Object.entries(reportsObject)
  const {
    paginatedItems,
    currentPage,
    handlePaginationPageChange,
    numberOfPages,
  } = usePagination({
    tableData: authorsArray,
    itemsPerPage: 10,
  })

  const [expandedRows, setExpandedRows] = useState([])
  const handleExpandRows = (author) => {
    if (expandedRows.includes(author)) {
      const updatedExpandedRows = [...expandedRows].filter(
        (row) => row !== author
      )

      return setExpandedRows(updatedExpandedRows)
    }

    setExpandedRows((prevRows) => [...prevRows, author])
  }

  return (
    <>
      <Table celled padded>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={12}>Author</Table.HeaderCell>
            <Table.HeaderCell textAlign="right">
              Publication Count
            </Table.HeaderCell>
            <Table.HeaderCell>Expand</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {paginatedItems.map(([author, { id, reports }], index) => {
            const backgroundColor = index % 2 === 0 ? "#fff" : "#fafafa"
            return (
              <React.Fragment key={id}>
                <Table.Row style={{ backgroundColor }}>
                  <Table.Cell>{author}</Table.Cell>
                  <Table.Cell textAlign="right">{reports.length}</Table.Cell>
                  <Table.Cell textAlign="right">
                    <Icon
                      onClick={() => handleExpandRows(author)}
                      name={
                        expandedRows.includes(author)
                          ? "caret down"
                          : "caret right"
                      }
                    />
                  </Table.Cell>
                </Table.Row>
                {expandedRows.includes(author) && (
                  <Table.Row style={{ backgroundColor }}>
                    <Table.Cell colSpan="16">
                      <Table>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Title</Table.HeaderCell>
                            <Table.HeaderCell>Year</Table.HeaderCell>
                            <Table.HeaderCell>Location</Table.HeaderCell>
                            <Table.HeaderCell>Co-Authors</Table.HeaderCell>
                            <Table.HeaderCell>Category</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {!reports.length && (
                            <Table.Row>
                              <Table.Cell colSpan="16">
                                This author does not have any publications
                              </Table.Cell>
                            </Table.Row>
                          )}
                          {reports.map(
                            ({
                              title,
                              year,
                              location,
                              type,
                              report_uuid,
                              authors,
                            }) => (
                              <Table.Row key={report_uuid}>
                                <Table.Cell> {title}</Table.Cell>
                                <Table.Cell>{year}</Table.Cell>
                                <Table.Cell>{location}</Table.Cell>
                                <Table.Cell>
                                  {removeNameFromString(author, authors)}
                                </Table.Cell>
                                <Table.Cell>{type}</Table.Cell>
                              </Table.Row>
                            )
                          )}
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                  </Table.Row>
                )}
              </React.Fragment>
            )
          })}
        </Table.Body>
      </Table>

      <Pagination
        activePage={currentPage}
        totalPages={numberOfPages}
        onPageChange={(e, { activePage }) => {
          handlePaginationPageChange(e, { activePage: activePage })
          setExpandedRows([])
        }}
      />
    </>
  )
}

export default ReportsTable
