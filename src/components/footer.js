import React from "react"
import { Segment } from "semantic-ui-react"
import FlowWestLogo from "./flowwestLogo"

export default () => {
  return (
    <Segment
      attached="bottom"
      textAlign="center"
      style={{
        // padding: "1em 0em",
        // height: "10em",
        margin: 0,
        border: "none",
      }}
    >
      <footer id="footer">
        <div className="footer-content">
          © The Klamath Tribes {new Date().getFullYear()}, Built by{" "}
          <a href="https://flowwest.com">
            <FlowWestLogo />
          </a>
        </div>
      </footer>
    </Segment>
  )
}
