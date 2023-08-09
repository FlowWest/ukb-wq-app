import React, { useState, useContext, useEffect } from "react"
import { Form, Icon, Input } from "semantic-ui-react"
import { Controller, useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { LoginFormSchema } from "../helpers/validationSchemas"
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js"
import * as AWS from "aws-sdk"
import { UserContext } from "../../gatsby-browser"

const LoginForm = () => {
  const [invalidCredentialsError, setInvalidCredentialsError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: { username: "", password: "" },
    resolver: yupResolver(LoginFormSchema),
  })

  const { user, setUser } = useContext(UserContext)
  const watchUsername = watch("username")
  const watchPassword = watch("password")

  useEffect(() => {
    if (invalidCredentialsError) setInvalidCredentialsError(null)
  }, [watchUsername, watchPassword])

  const handleLoginFormSubmit = async (data) => {
    setInvalidCredentialsError(null)
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
          UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID, // Your user pool id here
          ClientId: process.env.GATSBY_COGNITO_CLIENT_ID, // Your client id here
        }
        const userPool = new CognitoUserPool(poolData)
        const userData = {
          Username: values.email,
          Pool: userPool,
        }
        const cognitoUser = new CognitoUser(userData)

        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            //POTENTIAL: Region needs to be set if not already set previously elsewhere.
            AWS.config.region = "us-west-1"

            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
              IdentityPoolId: process.env.GATSBY_COGNITO_IDENTITY_POOL_ID, // your identity pool id here
              Logins: {
                // Change the key below according to the specific region your user pool is in.
                [`cognito-idp.us-west-1.amazonaws.com/${process.env.GATSBY_COGNITO_USER_POOL_ID}`]:
                  result.getIdToken().getJwtToken(),
              },
            })

            const cognitoUserEmail =
              cognitoUser.signInUserSession.idToken.payload.email
            const loggedUser = { ...cognitoUser, email: cognitoUserEmail }
            setUser(loggedUser)
            //call refresh method in order to authenticate user and get new temp credentials
            AWS.config.credentials.refresh(async (error) => {
              if (error) {
                console.error(error)
              } else {
                console.log("Successfully logged!")
              }
            })
            setIsSubmitting(false)
          },

          onFailure: function (err) {
            const error = new Error(err)
            console.log(error.message)
            setInvalidCredentialsError(error.message.split(":")[1])
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
            {errors?.username && (
              <p className="form-error-message">{errors.username.message}</p>
            )}
          </>
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <>
            <Form.Input
              {...field}
              id="form-input-control-password"
              label="Password"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              icon="key"
              iconPosition="left"
            />
            <p
              className="form-show-password"
              onClick={() => setShowPassword((prevState) => !prevState)}
            >
              {showPassword ? "Hide" : "Show"} Password
            </p>
            {errors?.password && (
              <p className="form-error-message">{errors.password.message}</p>
            )}
          </>
        )}
      />

      {invalidCredentialsError && (
        <p className="form-error-message">{invalidCredentialsError}</p>
      )}

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
