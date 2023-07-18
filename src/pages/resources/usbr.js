import React from 'react'
import {Header, Table, Icon, Grid } from 'semantic-ui-react'
import { Link } from 'gatsby'
import Layout from '../../components/layout'
import { usbrData } from '.'
import WeeklyUploadTable from '../../components/WeeklyUploadTable'


const usbr = () => {
  return (
    <Layout pageInfo={{ pageName: "Weekly Bureau of Reclamation FASTA slides" }}>
     <WeeklyUploadTable data={usbrData}/>
    </Layout>
  )
}

export default usbr