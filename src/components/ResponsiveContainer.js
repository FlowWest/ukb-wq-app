import React, { useState } from "react"
import { createMedia } from "@artsy/fresnel"
import { Menu, Sidebar, Segment, Container, Icon } from "semantic-ui-react"
import KlamathLogo from "./klamathLogo"
import { Link } from "gatsby"
import Banner from "../components/Banner"
import { formatTextCasing } from "../helpers/utils"

const { Media, MediaContextProvider } = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024,
  },
})

const DesktopContainer = ({ children, pageName }) => {
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
        <Menu.Item position="left">
          <Link to="/data" className="link-no-style">
            Data
          </Link>
        </Menu.Item>
        <Menu.Item position="left">
          <Link to="/reports" className="link-no-style">
            Reports
          </Link>
        </Menu.Item>
        <Menu.Item position="left">
          <Link to="/about" className="link-no-style">
            About
          </Link>
        </Menu.Item>
      </Menu>
      <Banner pageName={pageName} />
      {children}
    </Media>
  )
}

const MobileContainer = ({ children, pageName }) => {
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
          float="left"
        >
          <Menu.Item as="a" active={pageName === "index"}>
            <Link to="/" className="link-no-style">
              Home
            </Link>
          </Menu.Item>
          <Menu.Item active={pageName === "data"}>
            <Link to="/data" className="link-no-style">
              Data
            </Link>
          </Menu.Item>
          <Menu.Item active={pageName === "reports"}>
            <Link to="/reports" className="link-no-style">
              Reports
            </Link>
          </Menu.Item>
          <Menu.Item active={pageName === "about"}>
            <Link to="/about" className="link-no-style">
              About
            </Link>
          </Menu.Item>
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpen}>
          <Segment
            inverted
            textAlign="center"
            style={{ padding: "0" }}
            vertical
          >
            <Container>
              <Menu inverted pointing secondary size="large">
                <Menu.Item onClick={handleToggle}>
                  <Icon name="sidebar" />
                </Menu.Item>
                <Menu.Item>
                  {pageName === "index"
                    ? "The Klamath Tribes WQ Monitoring"
                    : formatTextCasing(pageName)}
                </Menu.Item>
              </Menu>
            </Container>
            <Banner mobile={true} pageName={pageName} />
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  )
}

export default ({ children, pageName }) => {
  return (
    <MediaContextProvider>
      <DesktopContainer pageName={pageName}>{children}</DesktopContainer>
      <MobileContainer pageName={pageName}>{children}</MobileContainer>
    </MediaContextProvider>
  )
}
