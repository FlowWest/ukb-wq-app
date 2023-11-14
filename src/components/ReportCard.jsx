import React, { useContext, useState, useCallback } from "react"
import { Card, Button, Dropdown, Modal } from "semantic-ui-react"
import { formatTextCasing } from "../helpers/utils"
import { UserContext } from "../../gatsby-browser"
import UploadReportForm from "./forms/UploadReportForm"
import { ReportModalContext } from "../hooks/useReportModalContext"
import * as AWS from "aws-sdk"

const ReportCard = ({ reportMetaData }) => {
  const { dispatch: reportsModalDispatch } = useContext(ReportModalContext)

  const reportIsActive = reportMetaData.active === "TRUE"
  const { user } = useContext(UserContext) || {}
  const authorsArray = reportMetaData.authors?.split(",")

  const generateAuthorsString = (authors) => {
    if (authors?.length <= 3) return authors?.join(",")

    const firstThreeAuthors = authors?.slice(0, 3)
    const remainingAuthors = authors?.slice(3)

    return `${firstThreeAuthors?.join(",")}, and ${remainingAuthors?.length} ${
      remainingAuthors?.length === 1 ? "other" : "others"
    }`
  }

  return (
    <>
      <Card
        color="blue"
        link
        fluid
        className={`report-card ${reportIsActive ? "" : "report-card-hidden"}`}
      >
        <Card.Content>
          <Card.Header as="h6" className="report-card-header">
            {reportMetaData.title}
          </Card.Header>
          <Card.Meta className="report-card-subheader">
            {formatTextCasing(reportMetaData.type)}
          </Card.Meta>
          <Card.Description>
            <strong>Author(s)</strong>: {generateAuthorsString(authorsArray)}{" "}
            <br />
            <strong>Location</strong>: {reportMetaData.location} <br />
            <strong>Year</strong>: {reportMetaData.year}{" "}
            {reportMetaData.endyear !== "NA"
              ? ` - ${reportMetaData.endyear}`
              : null}
            <br />
          </Card.Description>
        </Card.Content>
        <Card.Content extra className="card-action-buttons">
          <Button
            as="a"
            href={`https://klamath-water-quality-app.s3-us-west-2.amazonaws.com/${reportMetaData.filename}`}
            target="_blank"
            rel="noreferrer"
            basic
            className="report-cta"
          >
            View
          </Button>
          {user && Object.keys(user).length > 0 && (
            <Dropdown
              button
              basic
              className="button icon"
              direction="left"
              floating
              icon="vertical ellipsis"
              text=" "
              upward
              options={[
                {
                  key: "edit report",
                  value: "edit report",
                  text: (
                    <Dropdown.Item
                      onClick={() =>
                        reportsModalDispatch({
                          type: "EDIT_REPORT",
                          payload: { selectedReport: reportMetaData },
                        })
                      }
                    >
                      Edit Report Details
                    </Dropdown.Item>
                  ),
                },
                {
                  key: "toggle visibility",
                  value: "toggle visibility",
                  text: (
                    <Modal
                      size="tiny"
                      trigger={
                        <Dropdown.Item>
                          Mark as {reportIsActive ? "Hidden" : "Visible"}
                        </Dropdown.Item>
                      }
                      header={`Toggle Report Visibility (${
                        reportIsActive ? "Hidden" : "Visible"
                      })`}
                      content={`${
                        reportIsActive
                          ? "Setting the report visibility status to hidden will only allow users with administrator access to view the content of the report."
                          : "Setting the report visibility status to visible will allow visitors to view the content of the report."
                      } Do you wish to proceed?`}
                      actions={[
                        "Cancel",
                        {
                          key: "proceed",
                          content: "Proceed",
                          negative: reportIsActive,
                          positive: !reportIsActive,
                          onClick: () =>
                            reportsModalDispatch({
                              type: "TOGGLE_REPORT_VISIBILITY",
                              payload: { selectedReport: reportMetaData },
                            }),
                        },
                      ]}
                    />
                  ),
                },
              ]}
            />
          )}
        </Card.Content>
      </Card>
    </>
  )
}

export default ReportCard
