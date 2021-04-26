import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { Grid } from "semantic-ui-react"
import Navbar from "./navBar"
import Footer from "./footer"

const Layout = ({ children, pageInfo }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        file(relativePath: { eq: "klamathtribes1200-BW.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <Grid container columns={1}>
        <Navbar pageInfo={pageInfo} data={data} />
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
    )}
  />
)

export default Layout
