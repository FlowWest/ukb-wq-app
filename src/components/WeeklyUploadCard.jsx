import React from "react"
import { Card, Button, Grid, List } from "semantic-ui-react"
import { Link } from "gatsby"

const ResourcePhoto = () => (
  <div className="resource-photo-container">
    <div className="resource-placeholder">Placeholder</div>
  </div>
)

const formatDate = (date) =>
  Intl.DateTimeFormat("en-us", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  }).format(date)

const WeeklyUploadCard = ({ data }) => {
  const { header, path, description, uploads } = data
  const [mostRecent, ...remainingUploads] = uploads
  return (
    <Card fluid>
      <Card.Content>
        <ResourcePhoto />
        <Card.Header className="weekly-upload-card-header">
          {header}
        </Card.Header>
        <Card.Meta>Last Updated: {formatDate(mostRecent.uploadDate)}</Card.Meta>
        <Card.Description className="weekly-upload-card-description">
          {description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link to={mostRecent.link}>
          <Button fluid>View Most Recent Upload</Button>
        </Link>
      </Card.Content>
      <Card.Content extra>
        <List size="medium">
          <List.Header className="previous-report-weekly-header">
            Previous Reports
          </List.Header>
          {remainingUploads.slice(0, 5).map((upload) => (
            <List.Item key={upload.uploadDate}>
              <Link to={upload.link}>{formatDate(upload.uploadDate)}</Link>
            </List.Item>
          ))}
        </List>
        <Link to={path}>
          <b>View All</b>
        </Link>
      </Card.Content>
    </Card>
  )
}

export default WeeklyUploadCard
