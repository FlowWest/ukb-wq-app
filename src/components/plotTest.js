`query {
  allRiverCsv(filter: {Characteristic_Name: {eq: "pH"}}) {
    edges {
      node {
        id
        Activity_Start_Date
        Monitoring_Location_ID
        Characteristic_Name
        Result_Value
        Result_Unit
        Result_Detection_Condition
      }
    }
  }
}`
