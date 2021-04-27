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
  ["Kenny_Knight_Water_Quality_Technician_III_Chlorophll-a_filtering_SRWQL"]: {
    filename:
      "Kenny_Knight_Water_Quality_Technician_III_Chlorophll-a_filtering_SRWQL.jpg",
    altText:
      "Water Quality Technician III, Kenny Knight, labeling Chlorophll-a filtering at the Sprague River Water Quality Lab (SRWQL)",
  },
}

const HomeImageGallery = ({ imagesArray, imagesObject }) => {
  console.log("imagesArray", imagesArray)
  console.log("imagesObject", imagesObject)
  const [galleryImagesArray, setGalleryImagesArray] = useState([])
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "/static/f12509f7514a4f3a179ef72a5584d293/2f1b1/wq_tech_2.jpg",
    },
  ]

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
      console.log(",iga", imageGalleryArray)
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
