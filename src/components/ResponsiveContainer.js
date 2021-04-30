import React, { useState } from "react"
import { createMedia } from "@artsy/fresnel"
import { Menu, Sidebar, Segment, Container, Icon } from "semantic-ui-react"
import KlamathLogo from "./klamathLogo"
import { Link } from "gatsby"
import Banner from "../components/Banner"

const { Media, MediaContextProvider } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const DesktopContainer = ({ children }) => {
  return (
    <Media greaterThan="mobile">
      <Menu
        pointing={true}
        secondary={true}
        size="large"
        className="menu-container"
        borderless={true}
      >
        <Menu.Item position="left">
          <Link to="/" className="link-no-style">
            <KlamathLogo />
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/data" className="link-no-style">
            Data
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/reports" className="link-no-style">
            Reports
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/about" className="link-no-style">
            About
          </Link>
        </Menu.Item>
      </Menu>
      <Banner />
      {children}
    </Media>
  )
}

const MobileContainer = ({ children }) => {
  const [sidebarOpen, setSideBarOpen] = useState(false)

  const handleSidebarHide = () => {
    setSideBarOpen(false)
  }
  const handleToggle = () => {
    setSideBarOpen(true)
  }

  return (
    <Media as={Sidebar.Pushable} at="mobile">
      <Sidebar.Pushable>
        <Sidebar
          as={Menu}
          animation="overlay"
          inverted
          onHide={handleSidebarHide}
          vertical
          visible={sidebarOpen}
        >
          <Menu.Item as="a" active>
            Home
          </Menu.Item>
          <Menu.Item>
            <Link to="/data" className="link-no-style">
              Data
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/reports" className="link-no-style">
              Reports
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/about" className="link-no-style">
              About
            </Link>
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpen}>
          <Segment
            inverted
            textAlign="center"
            style={{ minHeight: 350, padding: "1em 0em" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
              </Menu>
            </Container>
            <Banner />
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  )
}

export default ({ children }) => {
  return (
    <MediaContextProvider>
      <DesktopContainer>{children}</DesktopContainer>
      <MobileContainer>{children}</MobileContainer>
    </MediaContextProvider>
  )
}
