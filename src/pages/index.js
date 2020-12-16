import React from "react"
import { Row, Col, Container } from "react-bootstrap"
import Layout from "../components/layout"
import Header from "../components/header"
import SEO from "../components/seo"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import 'semantic-ui-css/semantic.min.css'

const IndexPage = ({ data }) => {
  console.log("data", data.allFile.edges)
  const imagesArray = data.allFile.edges
  const imagesObject = {}

  imagesArray.forEach(image => {
    imagesObject[image.node.name] = image.node
  })

  return (
    <div>
      <Header suckerPhotoNode={imagesObject["sucker_photo"]} />
      <Layout pageInfo={{ pageName: "index" }} data={data}>
        <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
        <Container fluid>
          <div className="row-container">
            <Row>
              <Col xs={12} md={4}>
                <Img
                  fluid={imagesObject["boxplot"].childImageSharp.fluid}
                  alt="FlowWest Logo"
                  className="index-icon-image"
                />
                <h6>Water Quality Interactive Plots</h6>
                <div>
                  {" "}
                  Nulla interdum nec purus at blandit. Mauris cursus augue et
                  lacus iaculis mollis. Mauris id venenatis tellus, dapibus
                  fermentum diam.
                </div>
              </Col>
              <Col xs={12} md={4}>
                <Img
                  fluid={imagesObject["report"].childImageSharp.fluid}
                  alt="FlowWest Logo"
                  className="index-icon-image"
                />
                <h6>
                  Upper Klamath Lake and Tributaries Water Quality Reports
                </h6>
                <div>
                  {" "}
                  Nulla interdum nec purus at blandit. Mauris cursus augue et
                  lacus iaculis mollis. Mauris id venenatis tellus, dapibus
                  fermentum diam.
                </div>
              </Col>
              <Col xs={12} md={4}>
                <Img
                  fluid={imagesObject["beaker"].childImageSharp.fluid}
                  alt="FlowWest Logo"
                  className="index-icon-image"
                />
                <h6>Water Quality Data Downloads</h6>
                <div>
                  {" "}
                  Nulla interdum nec purus at blandit. Mauris cursus augue et
                  lacus iaculis mollis. Mauris id venenatis tellus, dapibus
                  fermentum diam.
                </div>
              </Col>
            </Row>
          </div>
          <Row>
            <Col xs={12} md={6}>
              <h1>Welcome!</h1>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
                suscipit justo lectus, eu imperdiet leo lacinia volutpat. Aenean
                eu lectus sodales, aliquam velit non, porta massa. Fusce quis
                quam ac risus rhoncus facilisis. Aenean vitae sodales neque, id
                venenatis sapien. Interdum et malesuada fames ac ante ipsum
                primis in faucibus. Aliquam eget fermentum mi. Pellentesque id
                dolor sapien. Nulla enim turpis, consequat dapibus blandit at,
                rutrum in metus. Vivamus molestie posuere porttitor. Vivamus
                mollis magna justo, in hendrerit nibh porttitor vel. Vestibulum
                sed libero purus. Vestibulum feugiat bibendum mi, vitae eleifend
                lectus rutrum vitae. Curabitur elementum congue nulla, ac
                accumsan massa imperdiet id. Praesent vitae sapien sit amet
                nulla aliquet placerat vitae quis ipsum. Donec mattis justo sit
                amet dignissim dictum.
              </p>
              <p>
                Vivamus sed est posuere, aliquam nunc vel, suscipit nibh. Sed
                purus tellus, accumsan vitae felis ut, semper porta magna.
                Mauris vestibulum sed ligula nec porttitor. Nam justo ipsum,
                vulputate quis ante eu, gravida tincidunt dolor. Vivamus
                suscipit, orci ut accumsan mollis, urna massa bibendum erat, nec
                vestibulum sem velit a sapien. Phasellus a consequat velit. Sed
                imperdiet maximus libero, blandit mollis dui consequat ut.
                Aenean finibus, metus id porta placerat, orci nibh placerat
                arcu, in luctus neque massa in ante.
              </p>
            </Col>
            <Col xs={12} md={6}>
              <p>
                Integer et eleifend libero. Ut in malesuada nisl. Sed et est eu
                lorem congue dapibus. Nulla facilisi. Etiam nisi erat, euismod
                sed maximus sed, cursus vel elit. Nam scelerisque congue mi, at
                commodo sem volutpat tempor. Cras nisl neque, efficitur in
                suscipit sed, vulputate id tellus. Vivamus cursus ut libero eu
                suscipit. Nulla congue velit ut elit gravida feugiat. Vivamus
                fringilla nunc nec mollis condimentum. Phasellus ultrices
                consequat nulla, sit amet hendrerit nisl mollis ac. Quisque
                euismod vestibulum semper. Morbi egestas a diam at euismod.
              </p>
            </Col>
          </Row>
        </Container>
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
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default IndexPage
