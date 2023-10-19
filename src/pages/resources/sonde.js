import React from "react"
import { Header, Table, Icon, Grid } from "semantic-ui-react"
import { Link } from "gatsby"
import Layout from "../../components/Layout"
import { sondeData } from "."
import WeeklyUploadTable from "../../components/WeeklyUploadTable"

const sonde = ({ location }) => {
  return (
    <Layout pageInfo={{ pageName: "Weekly Sonde Data Report" }}>
      <WeeklyUploadTable data={sondeData} reports={location.state.reports} />
    </Layout>
  )
}

export default sonde
