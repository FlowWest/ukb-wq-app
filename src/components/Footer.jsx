import React, { useContext, useState } from "react"
import { Segment, Grid, Icon, Divider, Button, Popup } from "semantic-ui-react"
import FlowWestLogo from "./FlowwestLogo"
import LoginForm from "./LoginForm"
import { UserContext } from "../../gatsby-browser"
import LogoutMenu from "./LogoutMenu"

export const Footer = () => {
  const { user, setUser } = useContext(UserContext) || {}

  return (
    <>
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
              style={user && Object.keys(user).length ? { padding: 0 } : null}
              content={
                user && Object.keys(user).length ? (
                  <LogoutMenu user={user} />
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
    </>
  )
}

export default Footer
