import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Grid, Header, Dropdown, Search, Card, Button, List } from 'semantic-ui-react'
import { Link } from 'gatsby'
import WeeklyUploadCard from '../components/WeeklyUploadCard'


const ResourceUpload = ({title, description, link}) => (
    <Grid.Column className='resource-upload-container'>
      <Header className='resource-upload-header'>{title}</Header>
        <p>{description}</p>
        <Link to={link.to}>{link.label}</Link>
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