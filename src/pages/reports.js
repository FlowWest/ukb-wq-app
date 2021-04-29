import React from "react"
import { Grid, Header, Search, Card } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import DataDownload from "../components/dataDownload"

export default () => (
  <Layout pageInfo={{ pageName: "reports" }}>
    <SEO title="Water Quality Reports" />
    <Grid container>
      <Grid.Row>
        <Header
          as="h1"
          content="Klamath Tribes Water Quality Report Repository"
        />
      </Grid.Row>
      <Grid.Row>
        <Search />
      </Grid.Row>
      <Grid.Row>
        <Card.Group>
          {[
            {
              title:
                "Upper Klamath Lake Tributary Loading: 2009 Data Summary Report",
              type: "technical report",
              authors: "Jacob Kann Ph.D.",
              location: "Upper Klamath Lake Tributaries",
              year: "2009",
            },
            {
              title: "Upper Klamath Lake 2009 Data Summary Report",
              type: "technical report",
              authors: "Jacob Kann Ph.D.",
              location: "Upper Klamath Lake",
              year: "2009",
            },
          ].map(report => (
            <DataDownload reportMetaData={report} />
          ))}
        </Card.Group>
      </Grid.Row>
    </Grid>
  </Layout>
)
