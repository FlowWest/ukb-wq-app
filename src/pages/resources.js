import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Grid, Header, Dropdown, Search, Card, Button, List } from 'semantic-ui-react'
import { Link } from 'gatsby'
import ResourceDownload from '../components/ResourceDownload'


const ResourceUpload = ({title, description, link}) => (
    <Grid.Column className='resource-upload-container'>
      <Header className='resource-upload-header'>{title}</Header>
        <p>{description}</p>
        <Link to={link.to}>{link.label}</Link>
    </Grid.Column>
)

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

const Resources = ({data}) => {
  return (
    <Layout pageInfo={{ pageName: "resources" }}>
       <SEO title="Water Quality Resources" />
      <Grid container divided='vertically' columns={4} doubling stackable>
          <Grid.Row>
            <Header as='h1'>Quick Links</Header>
          </Grid.Row>
          <ResourceUpload title='Bureau of Reclamation Tea Cup' description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nobis soluta non sequi doloremque nesciunt expedita minus ipsa. ' link={{to: '#', label: 'Link to Bureau of Reclamation Tea Cup'}}/>
          <ResourceUpload title='USGS Upper Klamath Lake Elevations' description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nobis soluta non sequi doloremque nesciunt expedita minus ipsa. ' link={{to: '#', label: 'Link to USGS Upper Klamath Lake Elevations'}}/>
          <ResourceUpload title='USGS Sprague River Flow and Water Quality' description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nobis soluta non sequi doloremque nesciunt expedita minus ipsa. ' link={{to: '#', label: 'Link to USGS Sprague River Flow and Water Quality'}}/>
          <ResourceUpload title='USGS Williamson River Flow and Water Quality' description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nobis soluta non sequi doloremque nesciunt expedita minus ipsa. ' link={{to: '#', label: 'Link to USGS Williamson River Flow and Water Quality'}}/>
       
        <Grid.Row columns={3}>
         <WeeklyUploadCard />
         <WeeklyUploadCard />
         <WeeklyUploadCard />
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default Resources