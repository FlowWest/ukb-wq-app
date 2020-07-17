import React from "react"
import { Card, DropdownButton, Dropdown } from "react-bootstrap"

const DataDownload = () => {
  return (
    <Card>
      <Card.Header as="h5">Dataset Name</Card.Header>
      <Card.Body>
        <Card.Text>Parameter descriptions</Card.Text>
        <DropdownButton id="dropdown-basic-button" title="Download">
          <Dropdown.Item href="#">csv</Dropdown.Item>
          <Dropdown.Item href="#">excel</Dropdown.Item>
          <Dropdown.Item href="#">json</Dropdown.Item>
        </DropdownButton>
      </Card.Body>
    </Card>
  )
}

export default DataDownload
