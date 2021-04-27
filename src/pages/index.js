import React from "react"
import { Grid, Card, Header } from "semantic-ui-react"
import Layout from "../components/layout"
import HomeBanner from "../components/homeBanner"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import "semantic-ui-css/semantic.min.css"

const IndexPage = ({ data }) => {
  console.log("data", data.allFile.edges)
  const imagesArray = data.allFile.edges
  const imagesObject = {}

  imagesArray.forEach(image => {
    imagesObject[image.node.name] = image.node
  })

  return (
    <div>
      <HomeBanner suckerPhotoNode={imagesObject["sucker_photo"]} />
      <Layout pageInfo={{ pageName: "index" }} data={data}>
        <SEO
          title="Home"
          keywords={[`The Klamath Tribes`, `Water Quality Monitoring`]}
        />
        <Grid container>
          <Grid.Row>
            <Grid.Column width={6}>
              <Grid.Row>
                <Card href="#">
                  <Card.Content header="Download Our Data" />
                  <Img
                    fluid={imagesObject["beaker"].childImageSharp.fluid}
                    alt="black line drawing of half full glass beaker"
                    className="index-icon-image"
                  />
                </Card>
              </Grid.Row>
              <Grid.Row>
                <Card href="#">
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
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={6}>
              <Header as="h3">Sprague River Water Quality Lab (SRWQL)</Header>
              <p>
                Since 2006 the Sprague River Water Quality Lab (SRWQL) has
                allowed the Klamath Tribes to analyze all water nutrients, water
                chemistry, and algal toxin samples in-house. The lab worked
                closely with the U.S. Geological Survey’s National Water Quality
                Lab to complete a laboratory evaluation project comparing the
                data split between the two labs. The lab has been accredited
                through the National Environmental Lab Accreditation Program and
                Oregon Environmental Lab Accreditation Program. The SRWQL
                utilizes state-of-the-art automated discrete analyzer technology
                with the Thermo Fisher Aquakem 250. The lab also uses E-friendly
                methods that employ chemicals that are less toxic to the
                environment.
              </p>
            </Grid.Column>
            <Grid.Column width={10}></Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    </div>
  )
}

export const query = graphql`
  query artImages {
    allFile(filter: { relativePath: { regex: ".png/" } }) {
      edges {
        node {
          relativePath
          name
          childImageSharp {
            fluid(quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default IndexPage
