import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Grid } from "semantic-ui-react"
import Footer from "./footer"
import ResponsiveContainer from "./ResponsiveContainer"

const Layout = ({ children, pageInfo }) => (
  <ResponsiveContainer>
    <Grid container columns={1}>
      <Grid.Row
        columns={1}
        className={pageInfo.pageName !== "index" ? "mt-5" : ""}
      >
        <main>{children}</main>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Footer />
      </Grid.Row>
    </Grid>
  </ResponsiveContainer>
)

export default Layout
