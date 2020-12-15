/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from "react"
import { StaticQuery, graphql } from "gatsby"

import { Container, Row, Col } from "react-bootstrap"

import Header from "./header"
import Navbar from "./navBar"

const Layout = ({ children, pageInfo }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        file(relativePath: { eq: "klamathtribes1200-BW.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
    render={data => (
      <>
        <Container fluid className="px-0 main">
          <Navbar pageInfo={pageInfo} data={data} />
          <Row noGutters>
            <Col>
              <Container
                className={pageInfo.pageName !== "index" ? "mt-5" : ""}
              >
                <main>{children}</main>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container fluid className="px-0">
          <Row noGutters>
            <Col className="footer-col">
              <footer>
                <span>
                  © The Klamath Tribes {new Date().getFullYear()}, Built by{" "}
                  <a href="https://flowwest.com">FlowWest</a>
                </span>
              </footer>
            </Col>
          </Row>
        </Container>
      </>
    )}
  />
)

export default Layout
