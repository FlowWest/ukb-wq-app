import React from 'react'
import { Header, Table, Grid, Icon } from 'semantic-ui-react'
import { Link } from 'gatsby'

const formatDate = (date) => Intl.DateTimeFormat('en-us', {month: 'long', day: '2-digit', year:'numeric' }).format(date)

const WeeklyUploadTable = ({data}) => {
  return (
    <Grid container>
      <Header as='h1'>{data.header}</Header>
        <Table striped color='blue'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Release Date</Table.HeaderCell>
              <Table.HeaderCell>Download</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.uploads.map(upload => (
              <Table.Row>
                <Table.Cell>{formatDate(upload.uploadDate)}</Table.Cell>
                <Table.Cell>
                  <Link to={upload.link}>
                    <Icon name='download' size='large'/>
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Grid>
  )
}

export default WeeklyUploadTable