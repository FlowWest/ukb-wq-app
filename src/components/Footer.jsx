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
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js"

export const Footer = () => {
  const { user, setUser } = useContext(UserContext)
  console.log("🚀 ~ Footer ~ user:", user)

  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = () => {
    try {
      const poolData = {
        UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID, // Your user pool id here
        ClientId: process.env.GATSBY_COGNITO_CLIENT_ID, // Your client id here
      }
      const userPool = new CognitoUserPool(poolData)
      const userData = {
        Username: user.email,
        Pool: userPool,
      }
      const cognitoUser = new CognitoUser(userData)
      cognitoUser.signOut()
    } catch (error) {
      throw new Error(error.message)
    }
    setLoggingOut(true)
    setTimeout(() => {
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
