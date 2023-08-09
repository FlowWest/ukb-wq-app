import { yupResolver } from "@hookform/resolvers/yup"
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js"
import * as AWS from "aws-sdk"
import { useContext, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { UserContext } from "../../gatsby-browser"
import { LoginFormSchema } from "../helpers/validationSchemas"

export const useAwsLogin = (watch) => {
  const [invalidCredentialsError, setInvalidCredentialsError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  return { invalidCredentialsError, isSubmitting, handleLoginFormSubmit }
}

export const useAwsLogout = () => {
  const [loggingOut, setLoggingOut] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const handleLogout = () => {
    try {
      const poolData = {
        UserPoolId: process.env.GATSBY_COGNITO_USER_POOL_ID, // Your user pool id here
        ClientId: process.env.GATSBY_COGNITO_CLIENT_ID, // Your client id here
      }
      const userPool = new CognitoUserPool(poolData)
      const userData = {
        Username: user.email,
        Pool: userPool,
      }
      const cognitoUser = new CognitoUser(userData)
      cognitoUser.signOut()
    } catch (error) {
      throw new Error(error.message)
    }
    setLoggingOut(true)
    setTimeout(() => {
      setUser(null)
      setLoggingOut(false)
    }, 1000)
  }

  return { loggingOut, handleLogout }
}
