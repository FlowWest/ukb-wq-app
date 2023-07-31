import React from "react"
import { Grid } from "semantic-ui-react"
import Layout from "../components/layout"
import SEO from "../components/Seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default ({ data }) => (
  <Layout pageInfo={{ pageName: "data" }}>
    <SEO title="Water Quality Monitoring Data" />
    <Grid container style={{ padding: "4em 0" }}>
      <Grid.Row columns={2}>
        <Grid.Column computer={4} mobile={8}>
          <a
            href="https://www.waterqualitydata.us/"
            target="_blank"
            rel="noreferrer"
          >
            <Img fluid={data.file.childImageSharp.fluid} alt="NWQMC Logo" />
          </a>
          <br />
        </Grid.Column>
        <Grid.Column computer={8} mobile={16}>
          <p>
            The Klamath Tribes water quality data can be downloaded from the
            National Water Quality Monitoring Council Water Quality Portal.{" "}
          </p>
          <p>
            Search the portal by Organization ID: KLAMATHTRIBES_WQX
            <br />
            <a
              href="https://www.waterqualitydata.us/"
              target="_blank"
              rel="noreferrer"
            >
              https://www.waterqualitydata.us/
            </a>
          </p>
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
