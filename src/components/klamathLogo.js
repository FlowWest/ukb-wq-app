import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

const KlamathLogo = ({ data }) => {
  return <Img fluid={data.file.childImageSharp.fluid} alt="Klamath Logo" />
}

export const query = graphql`
  query {
    file(relativePath: { eq: "klamathtribes1200-BW.png" }) {
      childImageSharp {
        fixed {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
export default KlamathLogo
