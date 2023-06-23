import React from 'react'
import Layout from '../../components/layout'
import WeeklyUploadTable from '../../components/WeeklyUploadTable'
import { usgsData } from '.'

const usgs = () => {
  return (
    <Layout pageInfo={{ pageName: "Weekly USGS UKL Water Quality Conditions Map" }}>
      <WeeklyUploadTable data={usgsData}/>
    </Layout>
  )
}

export default usgs