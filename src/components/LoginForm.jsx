import React, { useState, useContext } from "react"
import { Form, Message } from "semantic-ui-react"
import { Controller, useForm } from "react-hook-form"
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js"
import * as AWS from "aws-sdk"
// import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { UserContext } from "../../gatsby-browser"

const LoginForm = () => {
  const [loginError, setLoginError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { handleSubmit, control } = useForm({
    defaultValues: { username: "", password: "" },
  })

  const { user, setUser } = useContext(UserContext)

  const handleLoginFormSubmit = async (data) => {
    setLoginError(null)
    setIsSubmitting(true)
    const { username, password } = data

    await awsEmailLogin({
      email: username,
      password,
    })

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
                "cognito-idp.us-west-1.amazonaws.com/us-west-1_Nls27cjWb":
                  result.getIdToken().getJwtToken(),
              },
            })

            setUser(cognitoUser)

            //call refresh method in order to authenticate user and get new temp credentials
            AWS.config.credentials.refresh(async (error) => {
              if (error) {
                console.error(error)
              } else {
                // const client = new S3Client(AWS.config)

                // const command = new PutObjectCommand({
                //   Bucket: "klamath-water-quality-app",
                //   Key: "hello-s3.txt",
                //   Body: "Hello S3!",
                // })
                // try {
                //   const response = await client.send(command)
                //   console.log(response)
                // } catch (err) {
                //   console.error(err)
                // }
                console.log("Successfully logged!")
              }
            })
            setIsSubmitting(false)
          },

          onFailure: function (err) {
            const error = new Error(err)
            console.log(error.message)
            setLoginError(error.message.split(":")[1])
            setIsSubmitting(false)
          },

          // newPasswordRequired: function (userAttributes, requiredAttributes) {
          //   // User was signed up by an admin and must provide new
          //   // password and required attributes, if any, to complete
          //   // authentication.

          //   // the api doesn't accept this field back
          //   delete userAttributes.email_verified

          //   // store userAttributes on global variable
          //   const sessionUserAttributes = userAttributes
          //   cognitoUser.completeNewPasswordChallenge(
          //     "Klamath123!",
          //     sessionUserAttributes
          //   )
          // },
        })
      } catch (error) {
        console.log("error", error)
      }
    }
  }
  return (
    <Form onSubmit={handleSubmit(handleLoginFormSubmit)}>
      <Controller
        name="username"
        control={control}
        render={({ field }) => (
          <>
            <Form.Input
              {...field}
              id="form-input-control-username"
              label="Username"
              placeholder="Username"
              icon="user"
              iconPosition="left"
            />
          </>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Form.Input
            {...field}
            id="form-input-control-password"
            label="Password"
            placeholder="Password"
            type="password"
            icon="key"
            iconPosition="left"
          />
        )}
      />
      {loginError && <p className="form-error-message">{loginError}</p>}

      <Form.Button
        color="vk"
        fluid
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        Login
      </Form.Button>
    </Form>
  )
}

export default LoginForm
