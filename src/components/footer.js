import React from "react"
import { Segment } from "semantic-ui-react"

export default () => {
  return (
    <Segment
      color="green"
      inverted
      tertiary
      attached="bottom"
      textAlign="center"
    >
      <footer>
        <span>
          © The Klamath Tribes {new Date().getFullYear()}, Built by{" "}
          <a href="https://flowwest.com">FlowWest</a>
        </span>
      </footer>
    </Segment>
  )
}
