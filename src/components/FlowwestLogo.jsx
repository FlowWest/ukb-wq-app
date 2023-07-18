import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const FlowwwestLogo = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "flowwest-logo.png" }) {
          childImageSharp {
            fixed(width: 100) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    `}
    render={(data) => (
      <Img fixed={data.file.childImageSharp.fixed} alt="FlowWest Logo" />
    )}
  />
)

export default FlowwwestLogo
