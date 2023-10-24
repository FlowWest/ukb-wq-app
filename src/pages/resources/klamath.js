import React from "react"
import { Grid } from "semantic-ui-react"
import { klamathData } from "../../helpers/weeklyResourceCardData"
import BackToLink from "../../components/BackToLink"
import Layout from "../../components/Layout"
import WeeklyUploadTable from "../../components/WeeklyUploadTable"

const klamath = ({ location }) => {
  return (
    <Layout
      pageInfo={{
        pageName: "klamath",
      }}
    >
      <Grid container>
        <Grid.Row className="back-to-link">
          <BackToLink to="/resources" routeLabel={"Resources"} />
        </Grid.Row>
        <Grid.Row>
          <WeeklyUploadTable
            data={klamathData}
            reports={location.state.reports}
          />
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default klamath
