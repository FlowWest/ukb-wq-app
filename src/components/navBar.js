import React from "react"
import { Link } from "gatsby"
import KlamathLogo from "../components/klamathLogo"
import { Navbar, Nav } from "react-bootstrap"
import { Menu } from "semantic-ui-react"

const CustomNavbar = ({ pageInfo, data }) => {
  console.log("pi", pageInfo)
  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        fixed="top"
        id={pageInfo.pageName === "index" ? "index-navbar" : "site-navbar"}
      >
        {/* <Container> */}
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">
            <div className="logo-container">
              <KlamathLogo data={data} />
            </div>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto" activeKey={pageInfo && pageInfo.pageName}>
            <Link to="/dashboard" className="link-no-style">
              <Nav.Link as="span" eventKey="dashboard">
                dashboard
              </Nav.Link>
            </Link>
            <Link to="/data-repository" className="link-no-style">
              <Nav.Link as="span" eventKey="data-repository">
                downloads
              </Nav.Link>
            </Link>
            <Link to="/reports" className="link-no-style">
              <Nav.Link as="span" eventKey="reports">
                reports
              </Nav.Link>
            </Link>
            <Link to="/reports" className="link-no-style">
              <Nav.Link as="span" eventKey="reports">
                about
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
        {/* </Container> */}
      </Navbar>
    </>
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "klamathtribes1200-BW.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

export default CustomNavbar
