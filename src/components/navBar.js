import React from "react"
import { Link } from "gatsby"
import KlamathLogo from "../components/klamathLogo"
import { Navbar, Nav } from "react-bootstrap"

const CustomNavbar = ({ pageInfo, data }) => {
  console.log("pi", pageInfo)
  console.log("data", data)
  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
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
          <Nav className="mr-auto" activeKey={pageInfo && pageInfo.pageName}>
            <Link to="/dashboard" className="link-no-style">
              <Nav.Link as="span" eventKey="dashboard">
                Dashboard
              </Nav.Link>
            </Link>
            <Link to="/data-repository" className="link-no-style">
              <Nav.Link as="span" eventKey="data-repository">
                Data Repository
              </Nav.Link>
            </Link>
            <Link to="/reports" className="link-no-style">
              <Nav.Link as="span" eventKey="reports">
                Reports
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
