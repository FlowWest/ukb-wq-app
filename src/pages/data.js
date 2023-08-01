import React from "react"
import { Button, Grid } from "semantic-ui-react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import DataInfoBlock from "../components/DataInfoBlock"
import DataPageTable from "../components/DataPageTable"

export default ({ data }) => {
  return (
    <Layout pageInfo={{ pageName: "data" }}>
      <SEO title="Water Quality Monitoring Data" />
      <Grid container style={{ padding: "4em 0" }}>
        <Grid.Row columns={2}>
          <Grid.Column>
            <DataInfoBlock data={data} />
          </Grid.Column>
          <Grid.Column>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: 5,
                maxWidth: 250,
                marginLeft: "auto",
              }}
            >
              <Button fluid>Get Updated Data</Button>
              <Button fluid>Download Data</Button>
            </div>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={8}>
            <img
              src="https://i.stack.imgur.com/Bxlnz.jpg"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <img
              src="https://images.ctfassets.net/jicu8fwm4fvs/5JQnLJtyGxPyqv6XCA43Ye/e166d09f1001f00add56abce5108b91d/blog-watch-demo-video-payment-plan-updates.png"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <DataPageTable data={data} />
        </Grid.Row>
        {/* <Grid.Row columns={2}>
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
      </Grid.Row> */}
      </Grid>
    </Layout>
  )
}

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
