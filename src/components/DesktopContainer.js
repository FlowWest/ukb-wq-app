import React, { useState } from "react"
import { createMedia } from "@artsy/fresnel"
import { Menu, Visibility, Segment, Container } from "semantic-ui-react"
import KlamathLogo from "./klamathLogo"
import { Link } from "gatsby"
import HomeBanner from "../components/homeBanner"

export default ({ children }) => {
  const [fixed, setFixed] = useState(false)
  const hideFixedMenu = () => {
    setFixed(false)
  }
  const showFixedMenu = () => {
    setFixed(true)
  }
  const { Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
  })

  return (
    <Media greaterThan="mobile">
      <Visibility
        once={false}
        onBottomPassed={showFixedMenu}
        onBottomPassedReverse={hideFixedMenu}
      >
        <Link to="/" className="link-no-style">
          <Menu.Item>
            <KlamathLogo />
          </Menu.Item>
        </Link>
        <Menu
          fixed={fixed ? "top" : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size="large"
          floated="right"
        >
          <Container>
            <Link to="/data" className="link-no-style">
              <Menu.Item as="a">Data</Menu.Item>
            </Link>
            <Link to="/reports" className="link-no-style">
              <Menu.Item as="a">Reports</Menu.Item>
            </Link>
            <Link to="/about" className="link-no-style">
              <Menu.Item as="a">About</Menu.Item>
            </Link>
          </Container>
        </Menu>
      </Visibility>
      {children}
    </Media>
  )
}
