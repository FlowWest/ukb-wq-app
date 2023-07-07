import React, { useContext, useEffect } from "react"
import {
  Segment,
  Grid,
  Icon,
  Dropdown,
  Divider,
  Button,
  Menu,
  Popup,
  Item,
} from "semantic-ui-react"
import { Link } from "gatsby"
import FlowWestLogo from "./FlowwestLogo"
import LoginForm from "./LoginForm"
import { UserContext } from "../../gatsby-browser"

export const Footer = () => {
  const { user, setUser } = useContext(UserContext)

  const handleLogout = () => {
    sessionStorage.removeItem("admin-cookie")
    setUser(null)
    window.location.reload()
  }

  useEffect(() => {
    console.log("user", user)
  }, [user])
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
                    <Menu.Item>
                      <b>
                        <em>Logged in as Admin</em>
                      </b>
                    </Menu.Item>
                    <Menu.Item link>Upload Report</Menu.Item>
                    <Menu.Item link>Upload Resource</Menu.Item>
                    <Menu.Item link onClick={handleLogout}>
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
