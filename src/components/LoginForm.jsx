import React, { useState } from "react"
import { Form, Message } from "semantic-ui-react"
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js"
import * as AWS from "aws-sdk"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

const LoginForm = () => {
  const [usernameValue, setUsernameValue] = useState("")

  const [passwordValue, setPasswordValue] = useState("")
  const [formError, setFormError] = useState(null)

  const handleUsernameChange = (event) => setUsernameValue(event.target.value)
  const handlePasswordChange = (event) => setPasswordValue(event.target.value)

  const handleSubmit = async (event) => {
    const enteredUsername = event.target[0].value
    const enteredPassword = event.target[1].value

    await awsEmailLogin({
      email: enteredUsername,
      password: enteredPassword,
    })

    // if (enteredUsername !== "admin" || enteredPassword !== "FishFood123!") {
    //   setFormError("Invalid username or password")
    // } else {
    //   setFormError(null)
    //   sessionStorage.setItem("admin-cookie", "example-cookie")
    //   window.location.reload()
    // }
  }

  async function awsEmailLogin(values) {
    try {
      const authenticationData = {
        Username: values.email,
        Password: values.password,
      }
      const authenticationDetails = new AuthenticationDetails(
        authenticationData
      )
      const poolData = {
        UserPoolId: "us-west-1_Nls27cjWb", // Your user pool id here
        ClientId: "2vmqo3efbr8jhlar14bar3jjhb", // Your client id here
      }
      const userPool = new CognitoUserPool(poolData)
      const userData = {
        Username: values.email,
        Pool: userPool,
      }
      const cognitoUser = new CognitoUser(userData)
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          sessionStorage.setItem("admin-cookie", "example-cookie")

          //POTENTIAL: Region needs to be set if not already set previously elsewhere.
          AWS.config.region = "us-west-1"

          AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: "us-west-1:9f54e56a-e04e-48b0-a11c-8d7ff4158e6f", // your identity pool id here
            Logins: {
              // Change the key below according to the specific region your user pool is in.
              "cognito-idp.us-west-1.amazonaws.com/us-west-1_Nls27cjWb": result
                .getIdToken()
                .getJwtToken(),
            },
          })

          // window.location.reload()

          //call refresh method in order to authenticate user and get new temp credentials
          AWS.config.credentials.refresh(async (error) => {
            if (error) {
              console.error(error)
            } else {
              console.log("idk", AWS.config.credentials)

              const client = new S3Client(AWS.config)
              console.log("client", client)

              const command = new PutObjectCommand({
                Bucket: "klamath-water-quality-app",
                Key: "hello-s3.txt",
                Body: "Hello S3!",
              })
              try {
                console.log("command", command)
                const response = await client.send(command)
                console.log(response)
              } catch (err) {
                console.error(err)
              }
              console.log("Successfully logged!")
            }
          })
        },

        onFailure: function (err) {
          console.log(err)
        },

        newPasswordRequired: function (userAttributes, requiredAttributes) {
          // User was signed up by an admin and must provide new
          // password and required attributes, if any, to complete
          // authentication.

          // the api doesn't accept this field back
          delete userAttributes.email_verified

          // store userAttributes on global variable
          const sessionUserAttributes = userAttributes
          cognitoUser.completeNewPasswordChallenge(
            "Klamath123!",
            sessionUserAttributes
          )
        },
      })
    } catch (error) {
      console.log("error", error)
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
