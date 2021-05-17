import React, { useState, useEffect } from "react"
import ImageGallery from "react-image-gallery"

const imageInfo = {
  wq_tech_1: {
    filename: "wq_tech_1.jpg",
    altText:
      "Water Quality Technician II, Charles Jackson, at Sprague River Water Quality Lab (SRWQL)",
  },
  ben_desk_1: {
    filename: "ben_desk_1.jpg",
    altText: "Chemist Ben Harris at Sprague River Water Quality Lab (SRWQL)",
  },
  IMG_0780: {
    filename: "IMG_0780.jpg",
    altText:
      "Faryn Case (aquatic biologist) filtering water samples in the lab",
  },
  IMG_0781: {
    filename: "IMG_0781.jpg",
    altText: "Ben Harris (Chemist) processing water samplesl in the SRWQL",
  },
  IMG_0790: {
    filename: "IMG_0790.jpg",
    altText: "Faryn Case (aquatic biologist) processing samples in the lab",
  },
  Charles_Jackson_SRWQL: {
    filename: "Charles_Jackson_SRWQL.jpg",
    altText:
      "Charles Jackson working in the Sprague River Water Quality Lab (SRWQL)",
  },
  "Kenny_Knight_Water_Quality_Technician_III_Chlorophll-a_filtering_SRWQL": {
    filename:
      "Kenny_Knight_Water_Quality_Technician_III_Chlorophll-a_filtering_SRWQL.jpg",
    altText:
      "Water Quality Technician III, Kenny Knight, labeling Chlorophll-a filtering at the Sprague River Water Quality Lab (SRWQL)",
  },
}

const HomeImageGallery = ({ imagesArray }) => {
  const [galleryImagesArray, setGalleryImagesArray] = useState([])

  useEffect(() => {
    if (imagesArray) {
      const imageGalleryArray = []
      imagesArray.forEach(image => {
        if (imageInfo[image.node.name]) {
          imageGalleryArray.push({
            original: image.node.childImageSharp.fluid.src,
            altText: imageInfo[image.node.name].altText,
          })
        }
      })
      setGalleryImagesArray(imageGalleryArray)
    }
  }, [imagesArray])

  return (
    <ImageGallery
      items={galleryImagesArray}
      showFullscreenButton={false}
      showPlayButton={false}
      showThumbnails={false}
      autoPlay
    />
  )
}

export default HomeImageGallery
