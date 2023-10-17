import React from "react"
import { Header, Table, Icon, Grid } from "semantic-ui-react"
import { Link } from "gatsby"
import Layout from "../../components/Layout"
import { owrdData } from "."
import WeeklyUploadTable from "../../components/WeeklyUploadTable"

const owrd = ({ location }) => {
  return (
    <Layout pageInfo={{ pageName: "Weekly OWRD Hydrology Report" }}>
      <WeeklyUploadTable data={owrdData} reports={location.state.reports} />
    </Layout>
  )
}

export default owrd
