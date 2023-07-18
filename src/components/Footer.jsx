import React, { useContext, useState } from "react"
import {
  Segment,
  Grid,
  Icon,
  Divider,
  Button,
  Menu,
  Popup,
  Dimmer,
  Loader,
} from "semantic-ui-react"
import FlowWestLogo from "./FlowwestLogo"
import LoginForm from "./LoginForm"
import { UserContext } from "../../gatsby-browser"

export const Footer = () => {
  const { user, setUser } = useContext(UserContext)
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = () => {
    setLoggingOut(true)
    setTimeout(() => {
      sessionStorage.removeItem("admin-cookie")
      setUser(null)
      setLoggingOut(false)
    }, 1000)
  }

  return (
    <Segment
      attached="bottom"
      textAlign="center"
      style={{
        margin: 0,
        border: "none",
        height: "3rem",
      }}
    >
      <Divider section />
      <Grid centered>
        <footer className="footer">
          <div className="footer-content">
            © The Klamath Tribes {new Date().getFullYear()}, Built by{" "}
            <a href="https://flowwest.com">
              <FlowWestLogo />
            </a>
          </div>
          <div className="admin-menu-icon-wrapper">
            <Popup
              className="admin-menu-popup"
              style={user ? { padding: 0 } : null}
              content={
                user ? (
                  <Menu secondary fluid vertical>
                    <Dimmer active={loggingOut} inverted>
                      <Loader>Logging Out</Loader>
                    </Dimmer>
                    <Menu.Item>
                      <b>Logged in as</b>
                    </Menu.Item>
                    <Menu.Item fitted="vertically">
                      <em>{user.email}</em>
                    </Menu.Item>
                    <Divider />
                    <Menu.Item link onClick={handleLogout}>
                      <Icon.Group className="admin-menu-item-icon">
                        <Icon name="log out" />
                      </Icon.Group>
                      Logout
                    </Menu.Item>
                  </Menu>
                ) : (
                  <LoginForm />
                )
              }
              on="click"
              pinned
              position="top right"
              trigger={
                <Button basic>
                  <Icon name="settings" />
                </Button>
              }
            />
          </div>
        </footer>
      </Grid>
    </Segment>
  )
}

export default Footer
