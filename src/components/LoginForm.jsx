import React, { useState } from "react"
import { Form, Message } from "semantic-ui-react"

const LoginForm = () => {
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
      window.location.reload()
    }
  }

  return (
    <Form onSubmit={handleSubmit} error={true}>
      <Form.Input
        id="form-input-control-username"
        label="Username"
        placeholder="Username"
        value={usernameValue}
        onChange={(e) => handleUsernameChange(e)}
        icon="user"
        iconPosition="left"
      />
      <Form.Input
        id="form-input-control-password"
        label="Password"
        placeholder="Password"
        type="password"
        value={passwordValue}
        onChange={(e) => handlePasswordChange(e)}
        icon="key"
        iconPosition="left"
      />
      <Message error size="mini" content={formError} />

      <Form.Button color="vk" fluid>
        Login
      </Form.Button>
    </Form>
  )
}

export default LoginForm
