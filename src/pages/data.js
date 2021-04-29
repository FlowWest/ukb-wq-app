import React from "react"
import { Grid } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => (
  <Layout pageInfo={{ pageName: "data" }}>
    <SEO title="Water Quality Monitoring Data" />
    <Grid container>
      <Grid.Row columns={2}>
        <Grid.Column width={12}>
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
        <Grid.Column width={4}>
          <a href="https://www.waterqualitydata.us/" target="_blank">
            <Img fluid={data.file.childImageSharp.fluid} alt="NWQMC Logo" />
          </a>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Layout>
)

export const query = graphql`
  query {
    file(relativePath: { eq: "NWQMC_logo.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid_noBase64
        }
      }
    }
  }
`
