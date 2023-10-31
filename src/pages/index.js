import React from "react"
import { Grid, Card, Header, Segment } from "semantic-ui-react"
import Layout from "../components/Layout"
import HomeImageGallery from "../components/HomeImageGallery"
import SEO from "../components/Seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import "semantic-ui-css/semantic.min.css"

const IndexPage = ({ data }) => {
  const imagesArray = data.allFile.edges
  const imagesObject = {}
  imagesArray.forEach((image) => {
    imagesObject[image.node.name] = image.node
  })

  return (
    <div>
      <Layout pageInfo={{ pageName: "index" }} data={data}>
        <SEO
          title="Home"
          keywords={[`Klamath Tribes`, `Water Resources Repository`]}
        />
        <Segment
          style={{ border: "none", boxShadow: "none", margin: "3rem 0rem" }}
        >
          <Grid container columns={2} centered>
            <Grid.Column computer={6} mobile={16}>
              <Card href="/data/">
                <Card.Content header="Download Our Data" />
                <Img
                  fluid={imagesObject["beaker"].childImageSharp.fluid}
                  alt="black line drawing of half full glass beaker"
                  className="index-icon-image"
                />
              </Card>
              <Card href="/reports/">
                <Card.Content header="View Water Quality Reports" />
                <Img
                  fluid={imagesObject["report"].childImageSharp.fluid}
                  alt="black line drawing of report document with pie and bar chart"
                  className="index-icon-image"
                />
              </Card>
            </Grid.Column>
            <Grid.Column computer={10} mobile={16}>
              <p>
                The monitoring program includes sampling water nutrients, water
                chemistry, algal toxins, and aquatic biota at up to 11 lake
                sites and water nutrients, water chemistry, and stream discharge
                at up to 20 river and stream sites.
              </p>
              <p>
                This rich dataset is the foundation for environmental management
                and restoration of Upper Klamath Basin and is critical to
                enacting significant water quality change. By providing this
                data to the restoration and management community and the public
                the Klamath Tribes are committed to efficient and transparent
                data sharing and collaborative analysis across all partners
                committed to improving the future health of the basin. The
                Klamath Tribes hopes the water quality dataset and this app will
                support restoration actions that achieve water quality, native
                fish populations, and other ecosystem goals for the basin.
              </p>
            </Grid.Column>
          </Grid>
        </Segment>
        <Segment style={{ padding: "4em 1em", border: "none" }} secondary>
          <Grid container columns={2} centered>
            <Grid.Column computer={6} mobile={16}>
              <Header as="h2">Sprague River Water Quality Lab (SRWQL)</Header>
              <p>
                Since 2006 the Sprague River Water Quality Lab (SRWQL) has
                allowed the Klamath Tribes to analyze all water nutrients, water
                chemistry, and algal toxin samples in-house. The lab worked
                closely with the U.S. Geological Survey&apos;s National Water
                Quality Lab to complete a laboratory evaluation project
                comparing the data split between the two labs. The lab has been
                accredited through the National Environmental Lab Accreditation
                Program and Oregon Environmental Lab Accreditation Program. The
                SRWQL utilizes state-of-the-art automated discrete analyzer
                technology with the Thermo Fisher Aquakem 250. The lab also uses
                E-friendly methods that employ chemicals that are less toxic to
                the environment.
              </p>
            </Grid.Column>
            <Grid.Column computer={10} mobile={16}>
              <HomeImageGallery imagesArray={imagesArray} />
            </Grid.Column>
          </Grid>
        </Segment>
      </Layout>
    </div>
  )
}

export const query = graphql`
  query artImages {
    allFile(
      filter: {
        relativePath: {
          regex: "images/"
          in: [
            "beaker.png"
            "report.png"
            "slider-image-1.JPG"
            "slider-image-2.JPG"
            "slider-image-3.JPG"
            "slider-image-4.JPG"
            "slider-image-5.JPG"
            "slider-image-6.JPG"
            "slider-image-7.JPG"
            "slider-image-8.JPG"
            "slider-image-9.JPG"
          ]
        }
      }
    ) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    }
  }
`

export default IndexPage
