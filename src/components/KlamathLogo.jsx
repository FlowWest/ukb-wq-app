import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const KlamathLogo = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "klamathtribes1200-BW.png" }) {
          childImageSharp {
            fixed(width: 500) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    `}
    render={(data) => (
      <Img fixed={data.file.childImageSharp.fixed} alt="Klamath Logo" />
    )}
  />
)

export default KlamathLogo
