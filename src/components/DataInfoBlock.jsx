import React from "react"
import { Header } from "semantic-ui-react"

const InfoDetail = ({ header, content }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 15 }}>
    <Header sub style={{ width: 150 }}>
      {header}
    </Header>
    <p>{content}</p>
  </div>
)

const DataInfoBlock = ({ data }) => {
  return (
    <>
      <InfoDetail
        header={"Dataset Data Range:"}
        content={"01/23/1990 - 12/13/2018"}
      />
      {/* <InfoDetail
        header={"Metadata A:"}
        content={new Date("6-25-2023").toLocaleDateString()}
      />
      <InfoDetail
        header={"MetaData B:"}
        content={new Date("6-30-2023").toLocaleDateString()}
      /> */}
    </>
  )
}

export default DataInfoBlock
