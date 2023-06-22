import React from "react"
import { Card, Button, Grid, List } from "semantic-ui-react"
import { Link } from "gatsby"

const ResourcePhoto = () => (
  <div className='resource-photo-container'>
    <div className='resource-placeholder'>Placeholder</div>
  </div>
)

const WeeklyUploadCard = () => (
   <Grid.Column>
    <Card fluid>
      <Card.Content>
      <ResourcePhoto />
      <Card.Header>Weekly Bureau of Reclamation FASTA slides</Card.Header>
      <Card.Meta>Last Updated: July 4, 2023</Card.Meta>
      <Card.Description>Public reporting burden for this collection of information is estimated to average 1 hour per response, including the time for reviewing instructions, searching existing data sources, gathering and maintaining the data needed, and completing and reviewing this collection of information.
      </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Button fluid>View Most Recent Upload</Button>
      </Card.Content>
      <Card.Content extra>
      <List size='medium'>
      <List.Item as='a'>June 28</List.Item>
      <List.Item as='a'>June 21</List.Item>
      <List.Item as='a'>June 14</List.Item>
      <List.Item as='a'>June 7</List.Item>
      <List.Item as='a'>May 30</List.Item>
      <List.Item as='a'>May 23</List.Item>
      <List.Item as='a'>May 16</List.Item>
      <List.Item as='a'>May 9</List.Item>
      <List.Item as='a'>May 2</List.Item>
      <List.Item as='a'>April 25</List.Item>
      </List>
      <Link to='#'>View All</Link>
      </Card.Content>
    </Card>
  </Grid.Column>
)

export default WeeklyUploadCard
