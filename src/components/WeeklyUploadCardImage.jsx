import React from "react"

const WeeklyUploadCardImage = ({ src, alt }) => {
  return (
    <div className="resource-photo-container">
      <img src={src} alt={alt} className="weekly-upload-card-image" />
    </div>
  )
}

export default WeeklyUploadCardImage
