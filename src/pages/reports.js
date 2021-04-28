import React from "react"
import { Link } from "gatsby"
import { Grid, Header, Search } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"

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
    </Grid>
  </Layout>
)
