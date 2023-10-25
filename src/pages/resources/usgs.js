import React from "react"
import Layout from "../../components/Layout"
import WeeklyUploadTable from "../../components/WeeklyUploadTable"
import { usgsData } from "../../helpers/weeklyResourceCardData"
import { Grid } from "semantic-ui-react"
import BackToLink from "../../components/BackToLink"

const usgs = ({ location }) => {
  return (
    <Layout pageInfo={{ pageName: "usgs" }}>
      <Grid container>
        <Grid.Row className="back-to-link">
          <BackToLink to="/resources" routeLabel={"Resources"} />
        </Grid.Row>
        <Grid.Row>
          <WeeklyUploadTable
            data={usgsData}
            reports={location?.state?.reports}
          />
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default usgs
