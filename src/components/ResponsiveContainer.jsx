import React, { useState, useContext } from "react"
import { UserContext } from "../../gatsby-browser"
import { createMedia } from "@artsy/fresnel"
import {
  Accordion,
  Container,
  Menu,
  Sidebar,
  Segment,
  Icon,
  Grid,
} from "semantic-ui-react"
import KlamathLogo from "./KlamathLogo"
import { Link } from "gatsby"
import Banner from "./Banner"
import { formatTextCasing } from "../helpers/utils"
import LoginForm from "./LoginForm"
import LogoutMenu from "./LogoutMenu"

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
        <Container>
          <Menu.Item className="menu-item">
            <Link to="/" className="link-no-style">
              <KlamathLogo />
            </Link>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <Link to="/data" className="link-no-style">
              Data
            </Link>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <Link to="/reports" className="link-no-style">
              Reports
            </Link>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <Link to="/resources" className="link-no-style">
              Resources
            </Link>
          </Menu.Item>
          <Menu.Item className="menu-item">
            <Link to="/about" className="link-no-style">
              About
            </Link>
          </Menu.Item>
        </Container>
      </Menu>
      <Banner pageName={pageName} />
      {children}
    </Media>
  )
}

const MobileContainer = ({ children, pageName }) => {
  const [sidebarOpen, setSideBarOpen] = useState(false)
  const [accordionExpanded, setAccordionExpanded] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const { user } = useContext(UserContext)
  const handleSidebarHide = () => {
    setSideBarOpen(false)
  }
  const handleSidebarShow = () => {
    setSideBarOpen(true)
  }

  const handleAccordionToggle = () => {
    if (activeIndex === -1) {
      setActiveIndex(0)
      console.log("opened")
    } else {
      setActiveIndex(-1)
      console.log("closed")
    }
  }
  // setAccordionExpanded((prevState) => !prevState)

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
          <Link to="/resources" className="link-no-style">
            <Menu.Item active={pageName === "resources"}>Resources</Menu.Item>
          </Link>
          <Link to="/about" className="link-no-style">
            <Menu.Item active={pageName === "about"}>About</Menu.Item>
          </Link>
          <Accordion>
            <Accordion.Title active={activeIndex === 0} index={0}>
              <Menu.Item
                className="responsive-admin-menu-accordion"
                onClick={handleAccordionToggle}
              >
                <Icon name="dropdown" />
                {user ? "Logout" : "Login"}
              </Menu.Item>
            </Accordion.Title>
            <Accordion.Content
              active={activeIndex === 0}
              className={`responsive-admin-menu-wrapper ${
                user ? "logout-menu" : "login-form"
              }`}
            >
              {user ? <LogoutMenu user={user} /> : <LoginForm />}
            </Accordion.Content>
          </Accordion>
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
                <Menu.Item onClick={handleSidebarShow}>
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
