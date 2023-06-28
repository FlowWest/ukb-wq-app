import React from "react"
import { Segment, Grid, Icon, Dropdown, Divider } from "semantic-ui-react"
import { Link } from "gatsby"
import FlowWestLogo from "./FlowwestLogo"

export const Footer = () => {
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
            <Dropdown
              basic
              fluid
              button
              direction="left"
              className="button icon"
              trigger={<Icon name="settings" className="admin-menu-icon" />}
            >
              <Dropdown.Menu>
                <Dropdown.Item>
                  <Link to="/settings">Admin Settings</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </footer>
      </Grid>
    </Segment>
  )
}

export default Footer
