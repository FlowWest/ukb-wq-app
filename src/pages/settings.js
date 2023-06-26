import React from "react"
import { navigate, Link } from "gatsby"
import { Button } from "semantic-ui-react"

const settings = () => {
  const adminCookie = sessionStorage.getItem("admin-cookie")
  console.log("🚀 ~ settings ~ adminCookie:", adminCookie)

  if (!adminCookie) {
    navigate("/login")
  }

  const handleLogout = () => {
    sessionStorage.removeItem("admin-cookie")
    navigate("/")
  }

  return (
    <div>
      <h1>Admin Settings</h1>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  )
}

export default settings
