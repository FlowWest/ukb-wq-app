import React from "react"
import Layout from "../../components/Layout"
import WeeklyUploadTable from "../../components/WeeklyUploadTable"
import { klamathData } from "."

const klamath = ({ location }) => {
  return (
    <Layout
      pageInfo={{
        pageName:
          "Weekly Klamath Tribes Water Reports (Water Rights Regulation",
      }}
    >
      <WeeklyUploadTable data={klamathData} reports={location.state.reports} />
    </Layout>
  )
}

export default klamath
