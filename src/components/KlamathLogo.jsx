import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const KlamathLogo = () => (
  <StaticQuery
    query={graphql`
      query {
        file(relativePath: { eq: "klamathtribes1200.png" }) {
          childImageSharp {
            fixed(width: 500) {
              ...GatsbyImageSharpFixed_noBase64
            }
            fluid(maxWidth: 1200) {
              # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
              ...GatsbyImageSharpFluid
              ...GatsbyImageSharpFluidLimitPresentationSize
            }
          }
        }
      }
    `}
    render={(data) => (
      <div style={{ width: 400 }}>
        <Img
          //fixed={data.file.childImageSharp.fixed}
          fluid={data.file.childImageSharp.fluid}
          alt="Klamath Logo"
        />
      </div>
    )}
  />
)

export default KlamathLogo
