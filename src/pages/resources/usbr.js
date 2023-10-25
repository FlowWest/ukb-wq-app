import React from "react"
import { Header, Table, Icon, Grid } from "semantic-ui-react"
import { Link } from "gatsby"
import Layout from "../../components/Layout"
import { usbrData } from "../../helpers/weeklyResourceCardData"
import WeeklyUploadTable from "../../components/WeeklyUploadTable"
import BackToLink from "../../components/BackToLink"

const usbr = ({ location }) => {
  return (
    <Layout
      pageInfo={{ pageName: "usbr" }}
      // pageInfo={{ pageName: "Weekly Bureau of Reclamation FASTA slides" }}
    >
      <Grid container>
        <Grid.Row className="back-to-link">
          <BackToLink to="/resources" routeLabel={"Resources"} />
        </Grid.Row>
        <Grid.Row>
          <WeeklyUploadTable
            data={usbrData}
            reports={location?.state?.reports}
          />
        </Grid.Row>
      </Grid>
    </Layout>
  )
}

export default usbr
