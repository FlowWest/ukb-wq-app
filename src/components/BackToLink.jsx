import React from "react"
import { Link } from "gatsby"
import { Icon, Container } from "semantic-ui-react"

export default function BackToLink({ to, routeLabel }) {
  return (
    <Link to={to}>
      <Icon name="long arrow alternate left" /> Back to {`${routeLabel}`}
    </Link>
  )
}
