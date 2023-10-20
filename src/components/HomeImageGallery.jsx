import React, { useState, useEffect } from "react"
import ImageGallery from "react-image-gallery"

const imageInfo = {
  "slider-image-1": {
    filename: "slider-image-1.jpg",
    altText:
      "[Position], [Personnel], at Sprague River Water Quality Lab (SRWQL)",
  },
  "slider-image-2": {
    filename: "slider-image-2.jpg",
    altText:
      "[Position], [Personnel], at Sprague River Water Quality Lab (SRWQL)",
  },
  "slider-image-3": {
    filename: "slider-image-3.jpg",
    altText:
      "[Position], [Personnel], at Sprague River Water Quality Lab (SRWQL)",
  },
  "slider-image-4": {
    filename: "slider-image-4.jpg",
    altText:
      "[Position], [Personnel], at Sprague River Water Quality Lab (SRWQL)",
  },
  "slider-image-5": {
    filename: "slider-image-5.jpg",
    altText:
      "[Position], [Personnel], at Sprague River Water Quality Lab (SRWQL)",
  },
  "slider-image-6": {
    filename: "slider-image-6.jpg",
    altText:
      "[Position], [Personnel], at Sprague River Water Quality Lab (SRWQL)",
  },
  "slider-image-7": {
    filename: "slider-image-7.jpg",
    altText:
      "[Position], [Personnel], at Sprague River Water Quality Lab (SRWQL)",
  },
  "slider-image-8": {
    filename: "slider-image-8.jpg",
    altText:
      "[Position], [Personnel], at Sprague River Water Quality Lab (SRWQL)",
  },
  "slider-image-9": {
    filename: "slider-image-9.jpg",
    altText:
      "[Position], [Personnel], at Sprague River Water Quality Lab (SRWQL)",
  },
}

const HomeImageGallery = ({ imagesArray }) => {
  const [galleryImagesArray, setGalleryImagesArray] = useState([])

  useEffect(() => {
    if (imagesArray) {
      const imageGalleryArray = []
      imagesArray.forEach((image) => {
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
