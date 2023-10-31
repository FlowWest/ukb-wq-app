import React from "react"
import { Grid } from "semantic-ui-react"
import Footer from "./Footer"
import ResponsiveContainer from "./ResponsiveContainer"

const Layout = ({ children, pageInfo }) => (
  <ResponsiveContainer pageName={pageInfo?.pageName}>
    <Grid columns={1}>
      <Grid.Column className={pageInfo?.pageName !== "index" ? "mt-5" : ""}>
        <main className="main">{children}</main>
      </Grid.Column>
      <Footer />
    </Grid>
  </ResponsiveContainer>
)

export default Layout
