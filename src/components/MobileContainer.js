import React, { useState } from "react"
import { createMedia } from "@artsy/fresnel"
import { Menu, Sidebar, Segment, Container, Icon } from "semantic-ui-react"
import HomeBanner from "../components/homeBanner"

export default ({ children }) => {
  const [sidebarOpen, setSideBarOpen] = useState(false)

  const handleSidebarHide = () => {
    setSideBarOpen(false)
  }
  const handleToggle = () => {
    setSideBarOpen(true)
  }

  const { Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
  })

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
          <Menu.Item as="a">Data</Menu.Item>
          <Menu.Item as="a">Reports</Menu.Item>
          <Menu.Item as="a">About</Menu.Item>
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
            <HomeBanner mobile />
          </Segment>

          {children}
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </Media>
  )
}
