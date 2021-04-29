import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "flowwest-logo.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_noBase64
            }
          }
        }
      }
    `}
    render={data => (
      <Img fixed={data.file.childImageSharp.fixed} alt="FlowWest Logo" />
    )}
  />
)
