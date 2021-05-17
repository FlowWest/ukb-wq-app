import React from "react"
import { Grid, Card, Header, Segment } from "semantic-ui-react"
import Layout from "../components/layout"
import HomeImageGallery from "../components/homeImageGallery"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import "semantic-ui-css/semantic.min.css"

export default ({ data }) => {
  const imagesArray = data.allFile.edges
  const imagesObject = {}
  imagesArray.forEach(image => {
    imagesObject[image.node.name] = image.node
  })

  return (
    <div>
      <Layout pageInfo={{ pageName: "index" }} data={data}>
        <SEO
          title="Home"
          keywords={[`The Klamath Tribes`, `Water Quality Monitoring`]}
        />
        <Segment vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={6}>
                <Grid.Row>
                  <Card href="/data" className="page-link-card">
                    <Card.Content header="Download Our Data" />
                    <Img
                      fluid={imagesObject["beaker"].childImageSharp.fluid}
                      alt="black line drawing of half full glass beaker"
                      className="index-icon-image"
                    />
                  </Card>
                </Grid.Row>
                <Grid.Row>
                  <Card href="/reports" className="page-link-card">
                    <Card.Content header="View Water Quality Reports" />
                    <Img
                      fluid={imagesObject["report"].childImageSharp.fluid}
                      alt="black line drawing of report document with pie and bar chart"
                      className="index-icon-image"
                    />
                  </Card>
                </Grid.Row>
              </Grid.Column>
              <Grid.Column width={10}>
                <p>
                  The monitoring program includes sampling water nutrients,
                  water chemistry, algal toxins, and aquatic biota at up to 11
                  lake sites and water nutrients, water chemistry, and stream
                  discharge at up to 20 river and stream sites.
                </p>
                <p>
                  This rich dataset is the foundation for environmental
                  management and restoration of Upper Klamath Basin and is
                  critical to enacting significant water quality change. By
                  providing this data to the restoration and management
                  community and the public the Klamath Tribes are committed to
                  efficient and transparent data sharing and collaborative
                  analysis across all partners committed to improving the future
                  health of the basin. The Klamath Tribes hopes the water
                  quality dataset and this app will support restoration actions
                  that achieve water quality, native fish populations, and other
                  ecosystem goals for the basin.
                </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        <Segment style={{ padding: "8em 8em" }} vertical secondary>
          <Grid stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={6}>
                <Header as="h2">Sprague River Water Quality Lab (SRWQL)</Header>
                <p>
                  Since 2006 the Sprague River Water Quality Lab (SRWQL) has
                  allowed the Klamath Tribes to analyze all water nutrients,
                  water chemistry, and algal toxin samples in-house. The lab
                  worked closely with the U.S. Geological Survey’s National
                  Water Quality Lab to complete a laboratory evaluation project
                  comparing the data split between the two labs. The lab has
                  been accredited through the National Environmental Lab
                  Accreditation Program and Oregon Environmental Lab
                  Accreditation Program. The SRWQL utilizes state-of-the-art
                  automated discrete analyzer technology with the Thermo Fisher
                  Aquakem 250. The lab also uses E-friendly methods that employ
                  chemicals that are less toxic to the environment.
                </p>
              </Grid.Column>
              <Grid.Column width={10}>
                <HomeImageGallery imagesArray={imagesArray} />
              </Grid.Column>
            </Grid.Row>
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
            "wq_tech_1.jpg"
            "ben_desk_1.jpg"
            "IMG_0780.jpg"
            "IMG_0781.jpg"
            "IMG_0790.jpg"
            "Charles_Jackson_SRWQL.jpg"
            "Kenny_Knight_Water_Quality_Technician_III_Chlorophll-a_filtering_SRWQL.jpg"
            "beaker.png"
            "report.png"
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
