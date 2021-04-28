import React, { useState } from "react"
import { createMedia } from "@artsy/fresnel"
import { Menu, Visibility, Segment, Container, Grid } from "semantic-ui-react"
import KlamathLogo from "./klamathLogo"
import { Link } from "gatsby"
import HomeBanner from "../components/homeBanner"

export default ({ children }) => {
  const { Media } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
  })

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
        <Menu.Item position="right">
          <Link to="/data" className="link-no-style">
            Data
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/reports" className="link-no-style">
            Reports
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/about" className="link-no-style">
            About
          </Link>
        </Menu.Item>
      </Menu>
      {children}
    </Media>
  )
}
