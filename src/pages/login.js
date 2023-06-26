import React, { useState } from "react"
import { Button, Form, Input, Message } from "semantic-ui-react"
import { Link, navigate } from "gatsby"

const Login = () => {
  const [usernameValue, setUsernameValue] = useState("")

  const [passwordValue, setPasswordValue] = useState("")
  const [formError, setFormError] = useState(null)

  const handleUsernameChange = (event) => setUsernameValue(event.target.value)
  const handlePasswordChange = (event) => setPasswordValue(event.target.value)

  const handleSubmit = async (event) => {
    const enteredUsername = event.target[0].value
    const enteredPassword = event.target[1].value

    if (enteredUsername !== "admin" || enteredPassword !== "FishFood123!") {
      setFormError("Invalid username or password")
    } else {
      setFormError(null)
      sessionStorage.setItem("admin-cookie", "example-cookie")
      navigate("/settings")
    }
  }

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: ".5rem",
      }}
    >
      <h1>Login Page</h1>
      <Form onSubmit={handleSubmit} error={true}>
        <Form.Input
          id="form-input-control-username"
          label="Username"
          placeholder="Username"
          value={usernameValue}
          onChange={(e) => handleUsernameChange(e)}
        />
        <Form.Input
          id="form-input-control-password"
          label="Password"
          placeholder="Password"
          type="password"
          value={passwordValue}
          onChange={(e) => handlePasswordChange(e)}
        />
        <Message error size="mini" content={formError} />
        <Form.Group>
          <Form.Button>Submit</Form.Button>
          <Link to="/">
            <Form.Button>Return Home</Form.Button>
          </Link>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Login
