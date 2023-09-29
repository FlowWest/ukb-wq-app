import React from "react"

const DatePickerContainer = ({ children }) => (
  <div className="custom-datepicker-container">
    <div style={{ position: "relative" }}>{children}</div>
  </div>
)

export default DatePickerContainer
