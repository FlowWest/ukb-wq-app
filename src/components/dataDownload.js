import React from "react"
import { Card, DropdownButton, Dropdown } from "react-bootstrap"

const DataDownload = props => {
  return (
    <Card>
      <Card.Header as="h5">{props.datasetName}</Card.Header>
      <Card.Body>
        <Card.Text>Geographic Extent: {props.geographicExtent}</Card.Text>
        <Card.Text>
          Temporal Coverage: {props.startYear}-{props.endYear}
        </Card.Text>
        <Card.Text>
          Analytes Description: {props.description}
        </Card.Text>
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
