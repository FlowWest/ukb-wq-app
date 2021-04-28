import React from "react"
import { createMedia } from "@artsy/fresnel"
import DesktopContainer from "./DesktopContainer"
// import MobileContainer from "./MobileContainer"

export default ({ children }) => {
  const { MediaContextProvider } = createMedia({
    breakpoints: {
      mobile: 0,
      tablet: 768,
      computer: 1024,
    },
  })

  return (
    <MediaContextProvider>
      <DesktopContainer>{children}</DesktopContainer>
      {/* <MobileContainer>{children}</MobileContainer> */}
    </MediaContextProvider>
  )
}
