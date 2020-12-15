import React from "react"
import BackgroundImage from "gatsby-background-image"

const Header = ({ suckerPhotoNode }) => {
  console.log("daddddta", suckerPhotoNode)
  const backgroundImage = [
    `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`,
    suckerPhotoNode.childImageSharp.fluid,
  ]
  return (
    <div className="header-image-container">
      <BackgroundImage
        className="header-background-image"
        fluid={backgroundImage}
        style={{
          height: "100%",
          width: "100%",
          backgroundSize: "cover",
          backgroundImage: "linear-gradient(rgba(0,0,0,.5), rgba(0,0,0,.5))",
        }}
      >
        <div className="header-text-container">
          <h2 className="header-title">The Klamath Tribes Water Quality App</h2>
          <div className="header-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed quis
            mattis mauris. Nunc sit amet tristique orci. Quisque orci elit,
            tristique id ante non, rhoncus auctor neque.
          </div>
        </div>
      </BackgroundImage>
    </div>
  )
}

export default Header
