import React from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'
import { Grid, Header, Dropdown, Search, Card, Button, List, Divider } from 'semantic-ui-react'
import { Link } from 'gatsby'
import WeeklyUploadCard from '../components/WeeklyUploadCard'


const ResourceUpload = ({title, description, link}) => (
    <Grid.Column className='resource-upload-container'>
      <Header className='resource-upload-header'>{title}</Header>
        <p>{description}</p>
        <Link to={link.to}>{link.label}</Link>
    </Grid.Column>
)

const usbr = {
  header: 'Weekly Bureau of Reclamation FASTA slides',
  description: 'Public reporting burden for this collection of information is estimated to average 1 hour per response, including the time for reviewing instructions, searching existing data sources, gathering and maintaining the data needed, and completing and reviewing this collection of information.',
  path: '/resources/usbr',
  uploads: [
    {
      uploadDate: new Date(2023,5,30),
      link: 'usbr/1'
    },
    {
      uploadDate: new Date(2023,5,23),
      link: 'usbr/2'
    },
    {
      uploadDate: new Date(2023,5,16),
      link: 'usbr/3'
    },
    {
      uploadDate: new Date(2023,5,9),
      link: 'usbr/4'
    },
    {
      uploadDate: new Date(2023,5,2),
      link: 'usbr/5'
    },
    {
      uploadDate: new Date(2023,4,26),
      link: 'usbr/6'
    },
  ]
}
const usgs = {
  header: 'Weekly USGS UKL Water Quality Conditions Map',
  description: 'Public reporting burden for this collection of information is estimated to average 1 hour per response, including the time for reviewing instructions, searching existing data sources, gathering and maintaining the data needed, and completing and reviewing this collection of information.',
  path: '/resources/usgs',
  uploads: [
    {
      uploadDate: new Date(2023,5,27),
      link: 'usgs/1'
    },
    {
      uploadDate: new Date(2023,5,20),
      link: 'usgs/2'
    },
    {
      uploadDate: new Date(2023,5,13),
      link: 'usgs/3'
    },
    {
      uploadDate: new Date(2023,5,5),
      link: 'usgs/4'
    },
    {
      uploadDate: new Date(2023,4,29),
      link: 'usgs/5'
    },
    {
      uploadDate: new Date(2023,4,22),
      link: 'usgs/6'
    },
  ]
}
const klamath = {
  header: 'Weekly Klamath Tribes Water Reports (Water Rights Regulation)',
  description: 'Public reporting burden for this collection of information is estimated to average 1 hour per response, including the time for reviewing instructions, searching existing data sources, gathering and maintaining the data needed, and completing and reviewing this collection of information.',
  path: '/resources/klamath',
  uploads: [
    {
      uploadDate: new Date(2023,6,12),
      link: 'klamath/1'
    },
    {
      uploadDate: new Date(2023,6,5),
      link: 'klamath/2'
    },
    {
      uploadDate: new Date(2023,5,28),
      link: 'klamath/3'
    },
    {
      uploadDate: new Date(2023,5,22),
      link: 'klamath/4'
    },
    {
      uploadDate: new Date(2023,5,14),
      link: 'klamath/5'
    },
    {
      uploadDate: new Date(2023,5,7),
      link: 'klamath/6'
    },
  ]
}

const Resources = ({data}) => {
  return (
    <Layout pageInfo={{ pageName: "resources" }}>
       <SEO title="Water Quality Resources" />
      <Grid container divided='vertically' columns={4} doubling stackable className='remove-negative-margin'>
          <Grid.Row>
            <Header as='h1'>Quick Links</Header>
          </Grid.Row>
          <ResourceUpload title='Bureau of Reclamation Tea Cup' description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nobis soluta non sequi doloremque nesciunt expedita minus ipsa. ' link={{to: '#', label: 'Link to Bureau of Reclamation Tea Cup'}}/>
          <ResourceUpload title='USGS Upper Klamath Lake Elevations' description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nobis soluta non sequi doloremque nesciunt expedita minus ipsa. ' link={{to: '#', label: 'Link to USGS Upper Klamath Lake Elevations'}}/>
          <ResourceUpload title='USGS Sprague River Flow and Water Quality' description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nobis soluta non sequi doloremque nesciunt expedita minus ipsa. ' link={{to: '#', label: 'Link to USGS Sprague River Flow and Water Quality'}}/>
          <ResourceUpload title='USGS Williamson River Flow and Water Quality' description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo nobis soluta non sequi doloremque nesciunt expedita minus ipsa. ' link={{to: '#', label: 'Link to USGS Williamson River Flow and Water Quality'}}/>
      </Grid>
      <Divider section/>
        <Grid container stackable doubling className='remove-negative-margin'>
            <Grid.Row>
              <Header as='h1'>Weekly Reports</Header>
            </Grid.Row>
          <Grid.Row columns={3}>
            <WeeklyUploadCard data={usbr}/>
            <WeeklyUploadCard data={usgs}/>
            <WeeklyUploadCard data={klamath}/>
          </Grid.Row>
        </Grid>
    </Layout>
  )
}

export default Resources