import React from "react"
import BackgroundImage from "gatsby-background-image"
import { Header, Container, Segment } from "semantic-ui-react"
import { StaticQuery, graphql } from "gatsby"

export default ({ mobile }) => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "sucker_photo.jpg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => (
      <Segment style={{ padding: "1em 0em" }}>
        <BackgroundImage
          className="header-background-image"
          fluid={data.file.childImageSharp.fluid}
          style={{
            height: "100%",
            width: "100%",
            backgroundImage: "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5))",
          }}
        >
          <Container textAlign="center">
            <Header
              as="h1"
              inverted
              content="The Klamath Tribes Water Quality Monitoring"
              style={{
                fontSize: mobile ? "2em" : "4em",
                fontWeight: "normal",
                marginBottom: 0,
                marginTop: mobile ? "1.5em" : "3em",
              }}
            />
            <Header
              as="h2"
              inverted
              content="The largest water quality data collection entity in the Upper
            Klamath Basin, monitoring water quality conditions in Upper Klamath
            Lake since 1990 and major tributaries including the Sprague,
            Williamson, and Wood Rivers since 2001."
              style={{
                fontSize: mobile ? "1.5em" : "1.7em",
                fontWeight: "normal",
                marginTop: mobile ? "0.5em" : "1.5em",
              }}
            />
          </Container>
        </BackgroundImage>
      </Segment>
    )}
  />
)
