import React from "react"
import { Grid } from "semantic-ui-react"
import Footer from "./footer"
import ResponsiveContainer from "./ResponsiveContainer"

export default ({ children, pageInfo }) => (
  <ResponsiveContainer pageName={pageInfo.pageName}>
    <Grid style={{ height: "100vh" }}>
      <Grid.Column className={pageInfo.pageName !== "index" ? "mt-5" : ""}>
        <main>{children}</main>
      </Grid.Column>
      <Footer />
    </Grid>
  </ResponsiveContainer>
)
