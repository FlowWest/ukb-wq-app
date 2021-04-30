import React from "react"
import { Card, Button } from "semantic-ui-react"

const DataDownload = ({ reportMetaData }) => {
  return (
    <Card>
      <Card.Content>
        <Card.Header as="h5">{reportMetaData.title}</Card.Header>
        <Card.Meta>{reportMetaData.type}</Card.Meta>
        <Card.Description>
          <strong>Author(s)</strong>: {reportMetaData.authors} <br />
          <strong>Location</strong>: {reportMetaData.location} <br />
          <strong>Year</strong>: {reportMetaData.year}{" "}
          {reportMetaData.endyear !== "NA"
            ? ` - ${reportMetaData.endyear}`
            : null}
          <br />
        </Card.Description>
        <Button primary>Download</Button>
      </Card.Content>
    </Card>
  )
}

export default DataDownload
