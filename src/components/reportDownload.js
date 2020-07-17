import React from "react"
import { Card, Button } from "react-bootstrap"

const ReportDownload = () => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Report Title</Card.Title>
        <Card.Subtitle>Report Type</Card.Subtitle>
        <Card.Text>Report description</Card.Text>
        <Button variant="primary" href="#">Download</Button>
      </Card.Body>
    </Card>
  )
}

export default ReportDownload
