import React from "react"
import { Segment, Grid } from "semantic-ui-react"
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
      <Grid centered>
        <footer id="footer">
          <div className="footer-content">
            © The Klamath Tribes {new Date().getFullYear()}, Built by{" "}
            <a href="https://flowwest.com">
              <FlowWestLogo />
            </a>
          </div>
        </footer>
      </Grid>
    </Segment>
  )
}

export default Footer
