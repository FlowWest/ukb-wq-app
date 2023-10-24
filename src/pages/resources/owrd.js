import React from "react"
import { Grid } from "semantic-ui-react"
import { owrdData } from "../../helpers/weeklyResourceCardData"
import BackToLink from "../../components/BackToLink"
import Layout from "../../components/Layout"
import WeeklyUploadTable from "../../components/WeeklyUploadTable"

const owrd = ({ location }) => {
  return (
    <Layout pageInfo={{ pageName: "owrd" }}>
      <Grid container>
        <Grid.Row className="back-to-link">
          <BackToLink to="/resources" routeLabel={"Resources"} />
        </Grid.Row>

        <Grid.Row>
          <WeeklyUploadTable data={owrdData} reports={location.state.reports} />
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default owrd
