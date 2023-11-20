import React from "react"
import { StaticQuery, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const FlowwwestLogo = () => {
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "flowwest-logo.png" }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed_noBase64
          }
        }
      }
    }
  `)

  return <Img fixed={data.file.childImageSharp.fixed} alt="FlowWest Logo" />
}

export default FlowwwestLogo
