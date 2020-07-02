import React from "react"
import { Row, Col, Container, ListGroup } from "react-bootstrap"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"
import { graphql } from "gatsby"

const IndexPage = ({ data }) => (
  <Layout pageInfo={{ pageName: "index" }}>
    <SEO title="Home" keywords={[`gatsby`, `react`, `bootstrap`]} />
    <Container fluid>
      <Row>
        <Col>
          <Img
            fluid={data.file.childImageSharp.fluid}
            alt="The Klamath Tribes (Klamath-Modoc-Yahooskin) Logo"
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1>Welcome!</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
            suscipit justo lectus, eu imperdiet leo lacinia volutpat. Aenean eu
            lectus sodales, aliquam velit non, porta massa. Fusce quis quam ac
            risus rhoncus facilisis. Aenean vitae sodales neque, id venenatis
            sapien. Interdum et malesuada fames ac ante ipsum primis in
            faucibus. Aliquam eget fermentum mi. Pellentesque id dolor sapien.
            Nulla enim turpis, consequat dapibus blandit at, rutrum in metus.
            Vivamus molestie posuere porttitor. Vivamus mollis magna justo, in
            hendrerit nibh porttitor vel. Vestibulum sed libero purus.
            Vestibulum feugiat bibendum mi, vitae eleifend lectus rutrum vitae.
            Curabitur elementum congue nulla, ac accumsan massa imperdiet id.
            Praesent vitae sapien sit amet nulla aliquet placerat vitae quis
            ipsum. Donec mattis justo sit amet dignissim dictum.
          </p>
          <p>
            Vivamus sed est posuere, aliquam nunc vel, suscipit nibh. Sed purus
            tellus, accumsan vitae felis ut, semper porta magna. Mauris
            vestibulum sed ligula nec porttitor. Nam justo ipsum, vulputate quis
            ante eu, gravida tincidunt dolor. Vivamus suscipit, orci ut accumsan
            mollis, urna massa bibendum erat, nec vestibulum sem velit a sapien.
            Phasellus a consequat velit. Sed imperdiet maximus libero, blandit
            mollis dui consequat ut. Aenean finibus, metus id porta placerat,
            orci nibh placerat arcu, in luctus neque massa in ante.
          </p>
        </Col>
        <Col>
          <p>
            Integer et eleifend libero. Ut in malesuada nisl. Sed et est eu
            lorem congue dapibus. Nulla facilisi. Etiam nisi erat, euismod sed
            maximus sed, cursus vel elit. Nam scelerisque congue mi, at commodo
            sem volutpat tempor. Cras nisl neque, efficitur in suscipit sed,
            vulputate id tellus. Vivamus cursus ut libero eu suscipit. Nulla
            congue velit ut elit gravida feugiat. Vivamus fringilla nunc nec
            mollis condimentum. Phasellus ultrices consequat nulla, sit amet
            hendrerit nisl mollis ac. Quisque euismod vestibulum semper. Morbi
            egestas a diam at euismod.
          </p>
        </Col>
      </Row>
    </Container>
  </Layout>
)

export default IndexPage

export const query = graphql`
  query {
    file(relativePath: { eq: "klamathtribes1200.png" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
