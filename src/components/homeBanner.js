import React from "react"
import BackgroundImage from "gatsby-background-image"
import { Header, Container } from "semantic-ui-react"

export default ({ mobile }) => {
  // console.log("daddddta", suckerPhotoNode)
  // const backgroundImage = [
  //   `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`,
  //   suckerPhotoNode.childImageSharp.fluid,
  // ]
  return (
    <Container>
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
  )
}

// return (
//   <div className="header-image-container">
//     <BackgroundImage
//       className="header-background-image"
//       fluid={backgroundImage}
//       style={{
//         height: "100%",
//         width: "100%",
//         backgroundSize: "cover",
//         backgroundImage: "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5))",
//       }}
//     >
//       <div className="header-text-container">
//         <Header
//           as="h1"
//           inverted
//           content="The Klamath Tribes Water Quality Monitoring"
//         />
//         <Header
//           as="h2"
//           inverted
//           content="The largest water quality data collection entity in the Upper
//           Klamath Basin, monitoring water quality conditions in Upper Klamath
//           Lake since 1990 and major tributaries including the Sprague,
//           Williamson, and Wood Rivers since 2001."
//         />
//       </div>
//     </BackgroundImage>
//   </div>
// )
