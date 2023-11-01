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
  } = usePagination({ tableData: data, itemsPerPage: 9 })

  const generateKey = (monitoringLocationIdentifier, index) =>
    `${monitoringLocationIdentifier}${Math.ceil(Math.random() + index)}`

  const [expandedRow, setExpandedRow] = useState(null)

  const handleRowExpansion = (key) =>
    expandedRow === key ? setExpandedRow(null) : setExpandedRow(key)

  return (
    <>
      <Table striped stackable color="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell width={8}>Name</Table.HeaderCell>
            <Table.HeaderCell>Date Created</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
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
                    <Table.Cell>
                      <Icon
                        name={
                          expandedRow === key ? "caret down" : "caret right"
                        }
                        onClick={() => handleRowExpansion(key)}
                        style={{ cursor: "pointer" }}
                      />
                    </Table.Cell>
                  </Table.Row>
                  <Table.Row
                    style={{
                      display: expandedRow === key ? "table-row" : "none",
                    }}
                  >
                    <Table.Cell colSpan="16">
                      <Grid>
                        <Grid.Row columns={1}>
                          <Grid.Column>
                            <p>Activity Summary</p>
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                          <Grid.Column>
                            <TableDetail
                              title="Name"
                              description={monitoring_location_name}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <TableDetail
                              title="Latitude"
                              description={latitude_measure}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <TableDetail
                              title="Longitude"
                              description={longitude_measure}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                          <Grid.Column>
                            <TableDetail
                              title="Start Date"
                              description={activity_start_date}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <TableDetail
                              title="Monitoring Location Type"
                              description={monitoring_location_type_name}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <TableDetail
                              title="Characteristic Name"
                              description={characteristic_name}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                          <Grid.Column>
                            <TableDetail
                              title="Provider Name"
                              description={provider_name}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <TableDetail
                              title="Result Measure"
                              description={`${result_measure_value}${result_measure_measure_unit_code}`}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <TableDetail
                              title="HUC Code"
                              description={huc_eight_digit_code}
                            />
                          </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={3}>
                          <Grid.Column>
                            <TableDetail
                              title="Result Analytical Method"
                              description={result_analytical_method_method_name}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <TableDetail
                              title="Result Sample Fraction"
                              description={result_sample_fraction_text}
                            />
                          </Grid.Column>
                          <Grid.Column>
                            <TableDetail
                              title="Result Status Identifier"
                              description={result_status_identifier}
                            />
                          </Grid.Column>
                        </Grid.Row>
                      </Grid>
                    </Table.Cell>
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
                  <h3>Set filter to view tabular data</h3>
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
