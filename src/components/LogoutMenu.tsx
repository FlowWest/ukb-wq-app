import React from "react"
import { Menu, Dimmer, Icon, Loader, Divider } from "semantic-ui-react"
import { useAwsLogout } from "../hooks/useAwsAuth"

const LogoutMenu = ({ user }) => {
  const { loggingOut, handleLogout } = useAwsLogout()
  return (
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
  )
}

export default LogoutMenu
