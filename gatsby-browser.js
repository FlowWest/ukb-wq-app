/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import "./src/styles/style.scss"
import "./src/styles/style.css"
import React, { createContext, useState, useEffect } from "react"
import { CognitoUserPool } from "amazon-cognito-identity-js"

export const UserContext = createContext(null)

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const poolData = {
      UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID, // Your user pool id here
      ClientId: process.env.GATSBY_COGNITO_CLIENT_ID, // Your client id here
    }
    const userPool = new CognitoUserPool(poolData)

    const cognitoUser = userPool.getCurrentUser() // Get the current authenticated user stored in local storage

    if (cognitoUser) {
      cognitoUser.getSession((error, session) => {
        if (error) {
          console.log("Error fetching session:", error)
          return
        }

        if (session.isValid()) {
          console.log("User has an active and valid session")
          cognitoUser?.getUserData(async function (err, userData) {
            if (err) {
              alert(err.message || JSON.stringify(err))
              return
            }
            const cognitoUid = userData?.Username
            const cognitoUserEmail =
              cognitoUser.signInUserSession.idToken.payload.email

            setUser({
              username: cognitoUid,
              email: cognitoUserEmail,
              setter: setUser,
            })
          })
          // set user to cognito user
        } else {
          console.log("User has an active session, but it is not valid")
        }
      })
    } else {
      console.log("No user is currently authenticated")
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
export const wrapRootElement = ({ element }) => {
  return <UserContextProvider>{element}</UserContextProvider>
}
