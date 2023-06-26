import React, { useState } from "react"
import { createMedia } from "@artsy/fresnel"
import { Menu, Sidebar, Segment, Icon, Grid } from "semantic-ui-react"
import KlamathLogo from "./KlamathLogo"
import { Link } from "gatsby"
import Banner from "./Banner"
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
        <Menu.Item position="left">
          <Link to="/resources" className="link-no-style">
            Resources
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
          <Link to="/" className="link-no-style">
            <Menu.Item active={pageName === "index"}>Home</Menu.Item>
          </Link>
          <Link to="/data" className="link-no-style">
            <Menu.Item active={pageName === "data"}>Data</Menu.Item>
          </Link>
          <Link to="/reports" className="link-no-style">
            <Menu.Item active={pageName === "reports"}>Reports</Menu.Item>
          </Link>
          <Link to="/about" className="link-no-style">
            <Menu.Item active={pageName === "about"}>About</Menu.Item>
          </Link>
          <Link to="/resources" className="link-no-style">
            <Menu.Item active={pageName === "resources"}>Resources</Menu.Item>
          </Link>
        </Sidebar>
        <Sidebar.Pusher dimmed={sidebarOpen}>
          <Segment
            inverted
            textAlign="center"
            style={{ padding: "0" }}
            vertical
          >
            <Grid style={{ height: "6rem" }} verticalAlign="middle">
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
            </Grid>
            <Banner mobile={true} pageName={pageName} />
          </Segment>
          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  )
}

const ResponsiveContainer = ({ children, pageName }) => {
  return (
    <MediaContextProvider>
      <DesktopContainer pageName={pageName}>{children}</DesktopContainer>
      <MobileContainer pageName={pageName}>{children}</MobileContainer>
    </MediaContextProvider>
  )
}

export default ResponsiveContainer
