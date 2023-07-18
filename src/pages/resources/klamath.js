import React from 'react'
import Layout from '../../components/layout'
import WeeklyUploadTable from '../../components/WeeklyUploadTable'
import { klamathData } from '.'

const klamath = () => {
  return (
    <Layout pageInfo={{ pageName: "Weekly Klamath Tribes Water Reports (Water Rights Regulation" }}>
       <WeeklyUploadTable data={klamathData}/>
    </Layout>
  )
}

export default klamath