/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import "./src/styles/style.scss"
import "./src/styles/style.css"
import React, { createContext, useState } from "react"

export const UserContext = createContext({})

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
export const wrapRootElement = ({ element }) => {
  return <UserContextProvider>{element}</UserContextProvider>
}
