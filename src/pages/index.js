import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import { Grid } from "semantic-ui-react"
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
            <Grid.Column width={6}></Grid.Column>
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
        </Grid>
        {/* <Img
          fluid={imagesObject["beaker"].childImageSharp.fluid}
          alt="FlowWest Logo"
          className="index-icon-image"
        /> */}
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
