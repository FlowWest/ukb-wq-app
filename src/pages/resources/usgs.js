import React from "react"
import Layout from "../../components/Layout"
import WeeklyUploadTable from "../../components/WeeklyUploadTable"
import { usgsData } from "."

const usgs = ({ location }) => {
  return (
    <Layout
      pageInfo={{ pageName: "Weekly USGS UKL Water Quality Conditions Map" }}
    >
      <WeeklyUploadTable data={usgsData} reports={location.state.reports} />
    </Layout>
  )
}

export default usgs
