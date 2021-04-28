import React from "react"
import { Link } from "gatsby"
import { Grid } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default () => (
  <Layout pageInfo={{ pageName: "data" }}>
    <SEO title="Water Quality Monitoring Data" />
    <Grid.Row>
      <Grid.Column width={10}>
        <p>
          The Klamath Tribes water quality data can be downloaded from the
          National Water Quality Monitoring Council Water Quality Portal.{" "}
        </p>
        <br />
        <p>
          <a href="https://www.waterqualitydata.us/" target="_blank">
            https://www.waterqualitydata.us/
          </a>
        </p>
      </Grid.Column>
      <Grid.Column width={6}>a</Grid.Column>
    </Grid.Row>
  </Layout>
)
