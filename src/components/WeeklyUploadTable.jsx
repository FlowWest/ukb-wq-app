import React from "react"
import { Header, Table, Grid, Icon } from "semantic-ui-react"
import { Link } from "gatsby"
import { formatDate } from "../helpers/utils"

const WeeklyUploadTable = ({ data, reports }) => {
  const bucketLink =
    "https://klamath-water-quality-app.s3-us-west-2.amazonaws.com"
  return (
    <Grid container className="weekly-upload-table">
      <Header as="h1">{data.header}</Header>
      <Table striped color="blue">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={10}>Report Date</Table.HeaderCell>
            <Table.HeaderCell>View Report</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {reports.map((upload) => (
            <Table.Row key={upload.date}>
              <Table.Cell>{formatDate(upload.date)}</Table.Cell>
              <Table.Cell>
                <a
                  href={`${bucketLink}/${upload.filename}`}
                  fluid
                  target="_blank"
                  rel="noreferrer"
                >
                  <Icon name="external" size="large" />
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Grid>
  )
}

export default WeeklyUploadTable
