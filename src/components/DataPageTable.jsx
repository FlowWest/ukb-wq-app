import React, { useState } from "react"
import { Grid, Header, Icon, Pagination, Table } from "semantic-ui-react"
import usePagination from "../hooks/usePagination"

const TableDetail = ({ title, description }) => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <b>
      <span>{title}</span>
    </b>
    <span>{description}</span>
  </div>
)

const DataPageTable = ({ data }) => {
  const {
    currentPage,
    handlePaginationPageChange,
    numberOfPages,
    paginatedItems,
  } = usePagination({ tableData: data, itemsPerPage: 20 })

  const generateKey = (monitoringLocationIdentifier, index) =>
    `${monitoringLocationIdentifier}${Math.ceil(Math.random() + index)}`

  const [expandedRow, setExpandedRow] = useState(null)

  const handleRowExpansion = (key) =>
    expandedRow === key ? setExpandedRow(null) : setExpandedRow(key)

  return (
    <>
      <Table
        striped
        stackable
        color="blue"
        fixed={!!paginatedItems.length}
        singleLine={!!paginatedItems.length}
      >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Monitoring Location ID</Table.HeaderCell>
            <Table.HeaderCell>Monitoring Location Name</Table.HeaderCell>
            <Table.HeaderCell>Activity Date</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Characteristic</Table.HeaderCell>
            <Table.HeaderCell>Result</Table.HeaderCell>
            <Table.HeaderCell>Latitude</Table.HeaderCell>
            <Table.HeaderCell>Longitude</Table.HeaderCell>
            <Table.HeaderCell>Huc Code</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {!!data.length ? (
          <Table.Body>
            {paginatedItems.map((node, index) => {
              const {
                organization_identifier,
                activity_start_date,
                activity_start_time_time,
                activity_start_time_time_zone_code,
                monitoring_location_identifier,
                characteristic_name,
                result_sample_fraction_text,
                result_measure_value,
                result_measure_measure_unit_code,
                result_status_identifier,
                result_analytical_method_method_name,
                provider_name,
                monitoring_location_name,
                monitoring_location_type_name,
                huc_eight_digit_code,
                latitude_measure,
                longitude_measure,
              } = node
              const key = generateKey(monitoring_location_identifier, index)
              return (
                <React.Fragment key={key}>
                  <Table.Row>
                    <Table.Cell>{monitoring_location_identifier}</Table.Cell>
                    <Table.Cell>
                      <a
                        onClick={() => handleRowExpansion(key)}
                        style={{ cursor: "pointer" }}
                      >
                        {monitoring_location_name}
                      </a>
                    </Table.Cell>
                    <Table.Cell>{activity_start_date}</Table.Cell>
                    <Table.Cell>N/A</Table.Cell>
                    <Table.Cell>{characteristic_name}</Table.Cell>
                    <Table.Cell>{result_measure_value}</Table.Cell>
                    <Table.Cell>{longitude_measure}</Table.Cell>
                    <Table.Cell>{latitude_measure}</Table.Cell>
                    <Table.Cell>{huc_eight_digit_code}</Table.Cell>
                  </Table.Row>
                </React.Fragment>
              )
            })}
          </Table.Body>
        ) : (
          <Table.Body>
            <Table.Row>
              <Table.Cell colSpan="16">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 300,
                  }}
                >
                  <span style={{ fontSize: 20 }}>
                    Set filter to view tabular data
                  </span>
                </div>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        )}
      </Table>
      {numberOfPages > 0 && (
        <Pagination
          totalPages={numberOfPages}
          onPageChange={handlePaginationPageChange}
          defaultActivePage={currentPage}
          style={{ margin: "auto" }}
        />
      )}
    </>
  )
}

export default DataPageTable
