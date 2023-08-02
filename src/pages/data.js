import React from "react"
import { Button, Grid, Divider } from "semantic-ui-react"
import Layout from "../components/Layout"
import SEO from "../components/Seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import DataInfoBlock from "../components/DataInfoBlock"
import DataPageTable from "../components/DataPageTable"
import LineChart from "../components/LineChart"
import DataMap from "../components/DataMap"
export default ({ data }) => {
  return (
    <Layout pageInfo={{ pageName: "data" }}>
      <SEO title="Water Quality Monitoring Data" />
      <Grid container style={{ padding: "4em 0" }}>
        {/* <Grid.Row>
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
        </Grid.Row> */}
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
            <DataMap />
          </Grid.Column>
          <Grid.Column width={8}>
            <LineChart />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginBottom: 25 }}>
          <DataPageTable data={data} />
        </Grid.Row>

        <Grid.Row columns={2} divided="horizontally">
          <Grid.Column width={2}>
            <a
              href="https://www.waterqualitydata.us/"
              target="_blank"
              rel="noreferrer"
            >
              <Img
                fluid={data.file.childImageSharp.fluid}
                objectFit="cover"
                alt="NWQMC Logo"
              />
            </a>
          </Grid.Column>
          <Grid.Column width={10}>
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
        fluid(maxWidth: 100, quality: 100) {
          ...GatsbyImageSharpFluid_noBase64
          ...GatsbyImageSharpFluidLimitPresentationSize
        }
      }
    }
  }
`
