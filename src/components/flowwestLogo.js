import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const FlowWestLogo = ({ data }) => {
  return (
      <Img
        fixed={data.file.childImageSharp.fixed}
        alt="FlowWest Logo"
      />
  )
}

export const query = graphql`
  query {
    file(relativePath: { eq: "flowwest-logo.png" }) {
      childImageSharp {
        fixed{
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
export default FlowWestLogo