import React from "react"
import { Card, Button } from "semantic-ui-react"
import { formatTextCasing } from "../helpers/utils"

const ResourceDownload = () => {
  return (
    <a
      href={'#'}
      target="_blank"
      rel="noreferrer"
    >
      <Card  color="blue" link fluid className="report-card"  >
      {/* <Card className="report-card" color="blue" link > */}
        <Card.Content>
          <Card.Header as="h6" className="report-card-header">
            Sample Header
          </Card.Header>
          <Card.Meta className="report-card-subheader">{formatTextCasing('resource type')}</Card.Meta>
          <Card.Description>
            <strong>Author(s)</strong>: John Doe <br />
            <strong>Location</strong>: Miami, FL <br />
            <strong>Year</strong>: 2023{" "}
            <br />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button fluid color="blue" inverted>View</Button>
        </Card.Content>
      </Card>
    </a>
  )
}

export default ResourceDownload
